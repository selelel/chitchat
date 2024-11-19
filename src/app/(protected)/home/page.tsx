import HomePage from '@/app/(protected)/home/_component/home-page'
import type { Metadata } from 'next'

export default function IndexPage() {
    return <HomePage />
}

export const metadata: Metadata = {
    title: 'ChitChat',
}
