import { LoginForm } from '@/components/pages/login/loginFormComponent';
import { ChitChatLogo } from '@/layouts/logo';
import { Metadata } from 'next';
import React from 'react';
import { AlienMonsterPatternBackground } from '../../../styles/emotion/alien_monster_bg';

export default function IndexPage() {
  return (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-11">
      <div className="w-full h-screen col-span-1 sm:col-span-2 lg:col-span-4 p-5 flex flex-col space-y-5 justify-center">
        <ChitChatLogo className="text-3xl pt-3" />
        <LoginForm/>
      </div>

      <AlienMonsterPatternBackground className='col-span-0 sm:col-span-2 lg:col-span-7 md:block'/>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'ChitChat - Sign In to Connect',
};
