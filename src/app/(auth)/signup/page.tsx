import SignUpPage from '@/app/(auth)/signup/_component/singup-page'
import { Metadata } from 'next'

export default function IndexPage() {
    return <SignUpPage />
}

export const pageMetadata: Metadata = {
    title: 'ChitChat - Sign Up to Connect',
}
