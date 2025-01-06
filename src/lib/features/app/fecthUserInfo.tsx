import { GRAPHQL_URI } from '@/config/env'
import { Query, User } from '@/lib/graphql/graphqlTypes'
import { GraphQLClient } from 'graphql-request'
import { GetUserByIdQueryDocument } from './appQuery'

export const fetchUserInfo = async (_: undefined, { getState }: any) => {
    const client = new GraphQLClient(GRAPHQL_URI, { credentials: 'include' })
    const access_token = getState().app.accesstoken
    console.log(access_token, getState())
    client.setHeaders({
        Authorization: access_token ? `Bearer ${access_token}` : '',
    })

    try {
        const response = (await client.request(GetUserByIdQueryDocument)) as {
            data: Query['getUserById']
        }
        return response.data as User
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'INVALID_REQUEST') {
                console.log(error, error instanceof Error)
            }
        }
        throw error
    }
}
