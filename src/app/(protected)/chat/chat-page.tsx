'use client'
import Layout from '@/components/layout/layout'
import ChatInput from './_component/chat-input'
import ChatConversation from './_component/chat-conversation'
import { Container } from '@/components/commons/commons'

function ChatPage() {
    return (
        <Layout>
            <Container className="h-full flex flex-col gap-2 items-between">
                <ChatConversation chatId="66b0afe1ae5bab67d0637688" />
                <ChatInput />
            </Container>
        </Layout>
    )
}

export default ChatPage
