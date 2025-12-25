import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

type ColorMode = "light" | "dark";

interface ColorModeContextType {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined
);

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    const stored = localStorage.getItem("chakra-ui-color-mode");
    const initialMode = (stored as ColorMode) || "light";

    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(initialMode);
    }

    return initialMode;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(colorMode);
    root.style.colorScheme = colorMode;
    localStorage.setItem("chakra-ui-color-mode", colorMode);
  }, [colorMode]);

  const toggleColorMode = () => {
    setColorModeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
  };

  return (
    <ColorModeContext.Provider
      value={{ colorMode, toggleColorMode, setColorMode }}
    >
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? light : dark;
}