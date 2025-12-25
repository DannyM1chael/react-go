import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        bg: {
          DEFAULT: { value: "{colors.white}" },
          _dark: { value: "{colors.gray.950}" }
        },
        text: {
          DEFAULT: { value: "{colors.gray.900}" },
          _dark: { value: "{colors.gray.100}" }
        }
      }
    }
  }
})