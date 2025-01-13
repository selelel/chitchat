'use client'
import React from 'react'
import ChatBlock from './chat-block'
import { useGetAllChatQuery } from '@/lib/features/chat/chatApi'
import { Chat } from '@/lib/graphql/graphqlTypes'
import { ChitChatLogo } from '@/components/commons/icon'

function AllChat() {
    const { data } = useGetAllChatQuery()
    const getAllChats = data?.getAllChats || []

    return (
        <div className="flex flex-col gap-4">
            <ChitChatLogo className="text-2xl pt-3" />
            <p className="text-xl font-bold">Messages</p>
            <div className="flex flex-col gap-2">
                {getAllChats.map((chat: Chat) => (
                    <ChatBlock key={chat._id} data={chat} />
                ))}
            </div>
        </div>
    )
}

export default AllChat
