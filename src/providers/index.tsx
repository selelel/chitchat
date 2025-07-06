'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from './storeProvider'
import { RefreshWrapper } from '@/utils/auth/token'
import { SetNewUserLocalStorageWrapper } from '@/utils/auth/set-new-user-localstorage'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <RefreshWrapper>
                <ChakraProvider>
                    <SetNewUserLocalStorageWrapper>
                        {children}
                    </SetNewUserLocalStorageWrapper>
                </ChakraProvider>
            </RefreshWrapper>
        </StoreProvider>
    )
}
