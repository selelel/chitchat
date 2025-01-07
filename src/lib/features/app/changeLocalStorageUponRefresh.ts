import { GRAPHQL_URI } from '@/config/env'
import { LOCALSTORAGE } from '@/constants/localstorage'
import { User } from '@/lib/graphql/graphqlTypes'
import { GraphQLClient } from 'graphql-request'
import { GetUserByIdQueryDocument } from './appQuery'
import pathsConfig from '@/config/pathConfig'
import { client } from '@/utils/server/graphql-client'

export const changeLocalStorageUponRefresh = async () => {
    try {
        const { getChatConversation } = (await client.request(
            GetUserByIdQueryDocument
        )) as {
            getChatConversation: User
        }

        const user_id = getChatConversation._id
        //! SET HERE THE ACCESSTOKEN, PLEASE RESOLVE THIS OR COMEUP WITH A BETTER APPROACH
        window.localStorage.setItem(LOCALSTORAGE['USER_ID'], user_id)

        return user_id
    } catch (error: unknown) {
        console.log(error, error instanceof Error)
        if (error instanceof Error) {
            // ! HARD TO DEBUG
            if (error.message === 'INVALID_REQUEST') {
                console.log(error, error instanceof Error)
                window.location.href = pathsConfig.auth.signin
            }
        }

        throw error
    }
}
