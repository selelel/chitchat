'use client'
import { user_credential_type } from '@/lib/schemas/signin.form.dto'
import { createContext } from 'react'

interface UserSignUpContextType {
    userInfoValues: user_credential_type | null
    setUserValues: (d: user_credential_type) => void
}

export const UserSignUpContext = createContext<
    UserSignUpContextType | undefined
>(undefined)
