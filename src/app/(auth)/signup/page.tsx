import { Metadata } from 'next'
import SignUpPage from './_component/signup-page'

export default function IndexPage() {
    return <SignUpPage />
}

export const pageMetadata: Metadata = {
    title: 'ChitChat - Sign Up to Connect',
}
