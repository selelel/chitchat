"use client";
import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from './storeProvider';
import { RefreshWrapper } from '@/utils/auth/token';

export default function Providers({ children }: { children: React.ReactNode }) {
  
  return (
    <StoreProvider>
      <ChakraProvider>
        <RefreshWrapper>
          {children}
        </RefreshWrapper>
      </ChakraProvider>
    </StoreProvider>
  );
}
