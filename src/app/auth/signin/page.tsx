import { SignInForm } from '@/components/pages/signin/signinForm';
import { ChitChatLogo } from '@/layouts/logo';
import { Metadata } from 'next';
import { GhostPatternBackground } from '@/styles/emotion/ghost_bg';

export default function IndexPage() {
  return (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-11">
      <GhostPatternBackground className='col-span-0 sm:col-span-2 lg:col-span-4' />
      
      <div className="flex h-screen items-center col-span-1 w-full lg:w-7/12 sm:col-span-2 lg:col-span-7 p-5">
        <div className="space-y-5 w-full">
          <ChitChatLogo className="text-3xl pt-3" />
          <SignInForm />
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'ChitChat - Sign Up to Connect',
};
