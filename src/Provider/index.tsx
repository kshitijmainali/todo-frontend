import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '@src/theme';
import Fonts from '@src/theme/global';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider
          theme={theme}
          toastOptions={{
            defaultOptions: {
              position: 'top',
              duration: 3000,
              isClosable: true,
            },
          }}
        >
          <Fonts />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
        </ChakraProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
