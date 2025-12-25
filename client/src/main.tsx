import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from '@/components/ui/color-mode'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { system } from '@/theme'
import App from '@/App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <ChakraProvider value={system}>
            <ColorModeProvider>
              <App />
            </ColorModeProvider>
          </ChakraProvider>
      </QueryClientProvider>
  </StrictMode>,
)
