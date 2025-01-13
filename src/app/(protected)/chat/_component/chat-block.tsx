import React from 'react'
import { Chat, User } from '@/lib/graphql/graphqlTypes'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { LOCALSTORAGE } from '@/constants/localstorage'
// import placeholder_img from '/placeholder-profile.webp'
import Image from 'next/image'
import { useChatContext } from '../_context/chatContext'

interface ChatBlockProps {
    data: Chat & {
        usersId: User[]
    }
}

function ChatItem({ data }: ChatBlockProps) {
    const { setSelectedChat } = useChatContext()
    const name = data.usersId.filter(
        (data) => data._id !== localStorageGetItem(LOCALSTORAGE['USER_ID'])
    )[0]

    const handleSelectChat = () => setSelectedChat(data._id)

    return (
        <div
            onClick={handleSelectChat}
            className="flex border rounded-xl p-4 gap-2 items-center hover:bg-gray-100 active:[--tw-bg-opacity:0.5] cursor-pointer"
        >
            <Image
                src={data.avatar || '/placeholder-profile.webp'}
                alt="avatar"
                className="w-12 h-12 rounded-full"
                width="60"
                height="60"
            />
            <div className="flex flex-col items-start">
                <p className="font-semibold text-xs pointer-events-none">
                    {name.user.firstname}
                </p>
                <p className="text-[12px] pointer-events-none">
                    {name.user.username}
                </p>
            </div>
        </div>
    )
}

export default ChatItem
