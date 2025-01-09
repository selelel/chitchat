import React, { CSSProperties, useEffect, useState } from 'react'
import SingleChatComponent from './chat-single-message'
import { useGetUserInfoQuery } from '@/lib/features/app/appApi'
import { useGetConversationMutation } from '@/lib/features/chat/chatApi'
import { Message } from '@/lib/graphql/graphqlTypes'

function ChatConversation({
    chatId,
    newChat,
}: {
    chatId: string
    newChat: Message[]
}) {
    const { data } = useGetUserInfoQuery()
    const [getConversation, { data: conversation, isLoading, isError }] =
        useGetConversationMutation()
    console.log(data, conversation, newChat)

    useEffect(() => {
        getConversation({
            getConversationInput: {
                chatId,
                pagination: { limit: 30, skip: 0 },
            },
        })
    }, [])

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
