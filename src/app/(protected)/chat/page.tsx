import type { Metadata } from 'next'
import ChatPage from './_component/chat-page'
import { ChatProvider } from './_context/chatContext'

export default function IndexPage() {
    return (
        <ChatProvider>
            <ChatPage />
        </ChatProvider>
    )
}

export const metadata: Metadata = {
    title: 'ChitChat',
}
