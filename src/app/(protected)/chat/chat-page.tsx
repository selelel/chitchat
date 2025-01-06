'use client'
import Layout from '@/components/layout/layout'
import ChatInput from './_component/chat-input'
import ChatMessagesList from './_component/chat-massages-list'
import { Container } from '@/components/commons/commons'

function ChatPage() {
    return (
        <Layout>
            <Container className="h-full flex flex-col gap-2 items-between">
                <ChatMessagesList />
                <ChatInput />
            </Container>
        </Layout>
    )
}

export default ChatPage
