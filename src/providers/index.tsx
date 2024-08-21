"use client";
import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from './storeProvider';
import { InvokedRefreshPerRender } from '@/helper/auth_helper/token';

export default function Providers({ children }: { children: React.ReactNode }) {
  
  return (
    <StoreProvider>
      <ChakraProvider>
        <InvokedRefreshPerRender>
        {children}
        </InvokedRefreshPerRender>
      </ChakraProvider>
    </StoreProvider>
  );
}
