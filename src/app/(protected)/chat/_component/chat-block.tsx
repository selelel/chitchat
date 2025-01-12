import React from 'react'
import { Chat, User } from '@/lib/graphql/graphqlTypes'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { LOCALSTORAGE } from '@/constants/localstorage'

interface ChatBlockProps {
    data: Chat & {
        usersId: User[]
    }
}

function ChatBlock({ data }: ChatBlockProps) {
    const name = data.usersId.filter(
        (data) => data._id !== localStorageGetItem(LOCALSTORAGE['USER_ID'])
    )[0]
    return <div>{name.user.firstname}</div>
}

export default ChatBlock
