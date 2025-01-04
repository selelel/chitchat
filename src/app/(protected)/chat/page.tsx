import type { Metadata } from 'next'
import ChatPage from './chat-page'

export default function IndexPage() {
    return <ChatPage />
}

export const metadata: Metadata = {
    title: 'ChitChat',
}
