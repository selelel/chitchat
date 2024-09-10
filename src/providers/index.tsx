"use client";
import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from './storeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  
  return (
    <StoreProvider>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </StoreProvider>
  );
}
