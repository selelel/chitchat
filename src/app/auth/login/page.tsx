import { LoginFormComponent } from '@/components/pages/login/loginFormComponent'
import { Metadata } from 'next';
import React from 'react'

export default function IndexPage() {
  return (
      <LoginFormComponent />
  )
}

export const metadata: Metadata = {
  title: 'ChitChat - Sign In to Connect',
};