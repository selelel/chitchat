import { GRAPHQL_URI } from '@/config/env'
import { RefreshTokenQueryDocument } from '@/lib/features/auth/authQuery'
import { Query } from '@/lib/graphql/graphqlTypes'
import { GraphQLClient } from 'graphql-request'

export const fetchUserInfo = async () => {
    const client = new GraphQLClient(GRAPHQL_URI, { credentials: 'include' })
    try {
        const response = (await client.request(RefreshTokenQueryDocument)) as {
            userInfo: Query['getUserInfo']
        }
        const userInfo = response.userInfo

        return userInfo
    } catch (error: unknown) {
        throw error
    }
}
