import { Container } from '@/components/commons/commons'
import React, { useEffect, useState } from 'react'
import ChatConversation from './chat-conversation'
import ChatInput from './chat-input'
import { LOCALSTORAGE } from '@/constants/localstorage'
import { CHAT_EVENT } from '@/constants/socket'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import useSocket from '@/utils/socket/socketHook'
import { Message } from '@/lib/graphql/graphqlTypes'
import { env } from '@/config/env'

// TODO: instead of this approach try to create a dynamic page where in it will get the chat id in the url and then walahhh

function ChatWindow({ chatId }: { chatId: string }) {
    const [newChatId, setNewChatId] = useState<string>(chatId)
    const socket = useSocket(env.CHAT_SOCKET_URL, {
        auth: {
            authorization: `Bearer ${localStorageGetItem(LOCALSTORAGE['ACCESSTOKEN'])}`,
        },
        query: {
            chatid: newChatId,
        },
        transports: ['websocket'],
    })

    const [newChat, setNewChat] = useState<Message[]>([])

    useEffect(() => {
        setNewChatId(chatId)
        setNewChat([])
    }, [chatId])

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

        return () => {
            if (socket) {
                socket.off(CHAT_EVENT['ON_LISTENING'])
                socket.off('connect')
            }
        }
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
        <Container className="h-full flex flex-col gap-2 items-between">
            <ChatConversation chatId={chatId} newChat={newChat} />
            <ChatInput onSubmit={handleSendMessage} />
        </Container>
    )
}

export default ChatWindow
