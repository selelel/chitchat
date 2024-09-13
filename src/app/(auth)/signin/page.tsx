'use client';

import { SigninUserCredentialForm } from '@/components/pages/signin/signinUserCredentialForm';
import { Metadata } from 'next';
import { GhostPatternBackground } from '@/styles/emotion/ghost_bg';
import { useState } from 'react';
import { UserSignInContext } from '@/components/pages/signin/signinContext';
import { SinginUserInfoForm } from '@/components/pages/signin/singinUserInfoForm';
import { user_credential_type } from '@/lib/schemas/signin.form.dto';
import { ChitChatLogo } from '@/components/commons/commons';

export default function IndexPage() {
  const [userInfoValues , setUserDataValues ] = useState<user_credential_type | null>(null);

  const setUserValues = (data: user_credential_type) => setUserDataValues(data)

  return (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-11">
      <GhostPatternBackground className='col-span-0 sm:col-span-2 lg:col-span-4' />
      <div className="flex h-screen items-center col-span-1 w-full lg:w-7/12 sm:col-span-2 lg:col-span-7 p-5">
        <div className="space-y-5 w-full">
          <ChitChatLogo className="text-3xl pt-3" />
          <UserSignInContext.Provider value={{setUserValues, userInfoValues }}>
              {!userInfoValues ? <SigninUserCredentialForm /> : <SinginUserInfoForm /> }
          </UserSignInContext.Provider>
        </div>
      </div>
    </div>
  );
}

export const pageMetadata: Metadata = {
  title: 'ChitChat - Sign Up to Connect',
};