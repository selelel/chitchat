import type { Metadata } from 'next'
import ChatPage from './_component/chat-page'

export default function IndexPage() {
    return <ChatPage />
}

export const metadata: Metadata = {
    title: 'ChitChat',
}
