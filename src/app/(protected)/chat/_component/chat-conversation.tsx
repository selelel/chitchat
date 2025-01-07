import React, { useEffect, useState } from 'react'
import SingleChatComponent from './chat-single-message'
import { useGetUserInfoQuery } from '@/lib/features/app/appApi'
import { useGetConversationMutation } from '@/lib/features/chat/chatApi'

const sanderdaze_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmIwOWQyZTg4MWZjM2NlOWU5MWMwMzUiLCJwcm92aWRlciI6Imp3dCIsImlhdCI6MTczNjEzMDE0NywiZXhwIjoxNzM4NzIyMTQ3fQ.B5dEpHQ4eUthv4cRg21g8mzy8v59TMFfEKxJyUb6SHg'
function ChatConversation({ chatId }: { chatId: string }) {
    const { data } = useGetUserInfoQuery()
    const [getConversation, { data: conversation, isLoading, isError }] =
        useGetConversationMutation()
    console.log(data, conversation)

    useEffect(() => {
        getConversation({
            getConversationInput: {
                chatId,
                pagination: { limit: 10, skip: 0 },
            },
        })
    }, [])

    return (
        <div className="h-full max-h-full border rounded-3xl p-4 overflow-hidden">
            {conversation ? (
                <>
                    <div>
                        {conversation.getChatConversation?.map(
                            (message: any, index: number) => (
                                <SingleChatComponent
                                    key={index}
                                    value={message}
                                />
                            )
                        )}
                    </div>
                </>
            ) : (
                <p>No messages found</p>
            )}
        </div>
    )
}

export default ChatConversation
