import { LOCALSTORAGE } from '@/constants/localstorage'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { cn } from '@/utils/utils'
import React from 'react'

interface ChatMessage {
    createdAt: string
    content: {
        text: string
        images?: string[]
    }
    editedAt: string
    seen: boolean
    reaction: string
    chatId: string
    userId: {
        user: {
            username: string
        }
        _id: string
    }
}

function SingleChatComponent({ value }: { value: ChatMessage }) {
    const {
        createdAt,
        content: { text, images },
        userId,
        editedAt,
        seen,
        reaction,
        chatId,
    } = value

    return (
        <div
            className={cn(
                'w-full p-2 flex',
                userId._id === localStorageGetItem(LOCALSTORAGE['USER_ID'])
                    ? 'justify-end'
                    : 'justify-start'
            )}
        >
            <p
                className={cn(
                    'px-3 py-2 md:max-w-[30ch] lg:max-w-[60ch] rounded-lg',
                    userId._id === localStorageGetItem(LOCALSTORAGE['USER_ID'])
                        ? 'bg-blue-200'
                        : 'bg-green-200'
                )}
            >
                {text}
            </p>
        </div>
    )
}

export default SingleChatComponent
