'use client'
import React from 'react'
import ChatBlock from './chat-block'
import { useGetAllChatQuery } from '@/lib/features/chat/chatApi'
import { Chat } from '@/lib/graphql/graphqlTypes'

function AllChat() {
    const { data } = useGetAllChatQuery()
    const getAllChats = data?.getAllChats || []
    console.log(getAllChats)

    return (
        <div>
            {getAllChats.map((chat: Chat) => (
                <ChatBlock data={chat} />
            ))}
        </div>
    )
}

export default AllChat
