import { GRAPHQL_URI } from '@/config/env'
import { Query, User } from '@/lib/graphql/graphqlTypes'
import { GraphQLClient } from 'graphql-request'
import { GetUserByIdQueryDocument } from './appQuery'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { LOCALSTORAGE } from '@/constants/localstorage'

export const fetchUserInfo = async () => {
    const client = new GraphQLClient(GRAPHQL_URI, { credentials: 'include' })
    client.setHeaders({
        Authorization: `Bearer ${localStorageGetItem(LOCALSTORAGE['ACCESSTOKEN'])}`,
    })

    try {
        const response = (await client.request(GetUserByIdQueryDocument)) as {
            getUserInfo: Query['getUserInfo']
        }
        return response.getUserInfo as User
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'INVALID_REQUEST') {
                console.log(error, error instanceof Error)
            }
        }
        throw error
    }
}
