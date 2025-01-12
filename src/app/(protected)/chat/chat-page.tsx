'use client'
import Layout from '@/components/layout/layout'
import ChatInput from './_component/chat-input'
import ChatConversation from './_component/chat-conversation'
import { Container } from '@/components/commons/commons'
import { io, Socket } from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'
import { LOCALSTORAGE } from '@/constants/localstorage'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { CHAT_EVENT } from '@/constants/socket'
import { Message } from '@/lib/graphql/graphqlTypes'
import useSocket from '@/utils/socket/socketHook'
import { env } from '@/config/env'

function ChatPage() {
    const chatId = '66b0afe1ae5bab67d0637688'
    const socket = useSocket(env.CHAT_SOCKET_URL, {
        auth: {
            authorization: `Bearer ${localStorageGetItem(LOCALSTORAGE['ACCESSTOKEN'])}`,
        },
        query: {
            chatid: chatId,
        },
        transports: ['websocket'],
    })

    const [newChat, setNewChat] = useState<Message[]>([])

    useEffect(() => {
        ;(() => {
            if (!socket) return
            socket.on('connect', () => {
                console.log('Connected to chat:', socket.id)
            })

            socket.on(CHAT_EVENT['ON_LISTENING'], (messages: Message) => {
                setNewChat((prev) => [messages, ...prev])
            })
        })()
    }, [socket])

    const handleSendMessage = ({ message }: { message: string }) => {
        if (socket && socket.connected) {
            socket.emit(CHAT_EVENT['SENT_MESSAGES'], {
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
