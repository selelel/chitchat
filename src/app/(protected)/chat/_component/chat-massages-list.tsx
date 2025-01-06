'use client'
import React, { useEffect, useState } from 'react'
import SingleChatComponent from './chat-single-message'
import { useGetUserInfoMutation } from '@/lib/features/auth/authApi'

const sanderdaze_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmIwOWQyZTg4MWZjM2NlOWU5MWMwMzUiLCJwcm92aWRlciI6Imp3dCIsImlhdCI6MTczNjEzMDE0NywiZXhwIjoxNzM4NzIyMTQ3fQ.B5dEpHQ4eUthv4cRg21g8mzy8v59TMFfEKxJyUb6SHg'
function ChatMessagesList() {
    const [conversation, setConversation] = useState<any>(null)
    const [getUser, { data, isLoading }] = useGetUserInfoMutation()
    console.log(data)

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="h-full max-h-full border rounded-3xl p-4 overflow-hidden">
            {conversation ? (
                <>
                    <h2>Conversation</h2>
                    <div>
                        {conversation.map((message: any, index: number) => (
                            <SingleChatComponent key={index} value={message} />
                        ))}
                    </div>
                </>
            ) : (
                <p>No messages found</p>
            )}
        </div>
    )
}

export default ChatMessagesList
