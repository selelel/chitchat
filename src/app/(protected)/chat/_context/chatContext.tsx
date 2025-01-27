'use client'
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react'

interface ChatContextType {
    selectedChat: string | null
    setSelectedChat: (chat: string | null) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [selectedChat, setSelectedChat] = useState<string | null>(null)

    useEffect(() => {
        console.log('selectedChat', selectedChat)
    }, [selectedChat])

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = (): ChatContextType => {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context
}
