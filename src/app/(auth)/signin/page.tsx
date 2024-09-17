import SignInPage from '@/components/pages/signin/singinPage';
import { Metadata } from 'next';

export default function IndexPage() {
  return <SignInPage/>
}

export const pageMetadata: Metadata = {
  title: 'ChitChat - Sign Up to Connect',
};