'use client'
import Layout from '@/components/layout/layout'
import ChatInput from './_component/chat-input'
import ChatConversation from './_component/chat-conversation'
import { Container } from '@/components/commons/commons'
import { io, Socket } from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'
import { LOCALSTORAGE } from '@/constants/localstorage'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { CHAT_EVENT } from '@/constants/chat'
import { Message } from '@/lib/graphql/graphqlTypes'

function ChatPage() {
    const socketRef = useRef<Socket | null>(null)
    const chatId = '66b0afe1ae5bab67d0637688'
    const [newChat, setNewChat] = useState<Message[]>([])

    useEffect(() => {
        socketRef.current = io('http://localhost:8585', {
            auth: {
                authorization: `Bearer ${localStorageGetItem(LOCALSTORAGE['ACCESSTOKEN'])}`,
                chatid: chatId,
            },
            extraHeaders: {
                authorization: `Bearer ${localStorageGetItem(LOCALSTORAGE['ACCESSTOKEN'])}`,
                chatid: chatId,
            },
            transports: ['websocket'],
        })

        socketRef.current.on('connect', () => {
            console.log('Connected to chat:', socketRef.current?.id)
        })

        // Listen for message history
        socketRef.current.on(
            CHAT_EVENT['ON_LISTENING'],
            (messages: Message) => {
                setNewChat((prev) => [messages, ...prev])
            }
        )

        socketRef.current.on('connect_error', (error) => {
            console.error('Connection error:', error)
        })

        return () => {
            socketRef.current?.disconnect()
        }
    }, [])

    const handleSendMessage = ({ message }: { message: string }) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit(CHAT_EVENT['SENT_MESSAGES'], {
                text: message,
            })
        } else {
            console.error('Socket not connected')
        }
    }

    return (
        <Layout>
            <Container className="h-full flex flex-col gap-2 items-between">
                <ChatConversation chatId={chatId} newChat={newChat} />
                <ChatInput onSubmit={handleSendMessage} />
            </Container>
        </Layout>
    )
}

export default ChatPage
