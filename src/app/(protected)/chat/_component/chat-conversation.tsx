import React, { CSSProperties, useEffect, useState } from 'react'
import SingleChatComponent from './chat-single-message'
import { useGetConversationMutation } from '@/lib/features/chat/chatApi'
import { Message } from '@/lib/graphql/graphqlTypes'
import { CHAT_EVENT } from '@/constants/socket'
import { useChatContext } from '../_context/chatContext'
import { Socket } from 'socket.io-client'

function ChatConversation({ socket }: { socket: Socket }) {
    const { selectedChat } = useChatContext()
    const [newChat, setNewChat] = useState<Message[]>([])
    const [getConversation, { data: conversation }] =
        useGetConversationMutation()

    useEffect(() => {
        getConversation({
            getConversationInput: {
                chatId: selectedChat!,
                pagination: { limit: 30, skip: 0 },
            },
        })

        setNewChat([])
    }, [selectedChat])

    useEffect(() => {
        ;(() => {
            if (!socket) return
            socket.on('connect', () => {
                console.log('Connected to chat:', socket.id)
            })

            socket.on(CHAT_EVENT['ON_LISTENING'], (d) => {
                const { message, chatId } = d
                if (selectedChat === chatId) {
                    setNewChat((prev) => [message, ...prev])
                }
            })
        })()

        return () => {
            if (socket) {
                socket.off(CHAT_EVENT['ON_LISTENING'])
                socket.off('connect')
            }
        }
    }, [socket, selectedChat])

    return (
        <div className="h-full w-full flex flex-col-reverse items-end max-h-full border rounded-3xl p-4 overflow-y-auto no-scrollbar">
            {conversation && conversation.getChatConversation ? (
                <>
                    {newChat
                        .concat(conversation.getChatConversation)
                        ?.map((message: any, index: number) => (
                            <SingleChatComponent key={index} value={message} />
                        ))}
                </>
            ) : (
                <p>No messages found</p>
            )}
        </div>
    )
}

export default ChatConversation
