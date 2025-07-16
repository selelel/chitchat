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
import { useChatContext } from '../_context/chatContext'
import { io, Socket } from 'socket.io-client'

// TODO: instead of this approach try to create a dynamic page where in it will get the chat id in the url and then walahhh

function ChatWindow({ chatId }: { chatId: string }) {
    const { selectedChat } = useChatContext()
    const [socket, setSocket] = useState<Socket>(
        io(env.CHAT_SOCKET_URL, {
            auth: {
                authorization: `Bearer ${localStorageGetItem(LOCALSTORAGE['ACCESSTOKEN'])}`,
            },
            query: {
                chatid: selectedChat,
            },
            transports: ['websocket'],
        })
    )

    useEffect(() => {
        setSocket(
            io(env.CHAT_SOCKET_URL, {
                auth: {
                    authorization: `Bearer ${localStorageGetItem(LOCALSTORAGE['ACCESSTOKEN'])}`,
                },
                query: {
                    chatid: selectedChat,
                },
                transports: ['websocket'],
            })
        )
    }, [selectedChat])

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket is Connected')
        })

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error)
        })

        return () => {
            socket.disconnect()
        }
    }, [socket])

    return (
        <Container className="h-full flex flex-col gap-2 items-between">
            <ChatConversation socket={socket} />
            <ChatInput socket={socket} />
        </Container>
    )
}

export default ChatWindow
