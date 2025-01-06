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
    userId: string
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

    return <div className="w-fit p-4">{text}</div>
}

export default SingleChatComponent
