'use client'
import { useChatContext } from '../_context/chatContext'
import ChatLayout from './chat-layout'
import ChatWindow from './chat-window'

function ChatPage() {
    const { selectedChat } = useChatContext()

    return (
        <ChatLayout>
            {selectedChat && <ChatWindow chatId={selectedChat} />}
        </ChatLayout>
    )
}

export default ChatPage
