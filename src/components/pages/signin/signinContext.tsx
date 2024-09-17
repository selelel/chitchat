'use client';
import { user_credential_type } from '@/lib/schemas/signin.form.dto';
import { createContext } from 'react';

interface UserSignInContextType {
  userInfoValues: user_credential_type | null;
  setUserValues: (d: user_credential_type) => void
}

export const UserSignInContext = createContext<UserSignInContextType | undefined>(undefined);
