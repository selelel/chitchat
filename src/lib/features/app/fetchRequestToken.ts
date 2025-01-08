import { GRAPHQL_URI } from '@/config/env'
import { LOCALSTORAGE } from '@/constants/localstorage'
import { RefreshTokenQueryDocument } from '@/lib/features/auth/authQuery'
import { Query } from '@/lib/graphql/graphqlTypes'
import { GraphQLClient } from 'graphql-request'

export const fetchRefreshToken = async () => {
    const client = new GraphQLClient(GRAPHQL_URI, { credentials: 'include' })
    try {
        const response = (await client.request(RefreshTokenQueryDocument)) as {
            refresh: Query['refresh']
        }

        const access_token = response?.refresh?.accesstoken
        //! SET HERE THE ACCESSTOKEN, PLEASE RESOLVE THIS OR COMEUP WITH A BETTER APPROACH
        window.localStorage.setItem(LOCALSTORAGE['ACCESSTOKEN'], access_token)

        return access_token
    } catch (error: unknown) {
        console.log(error, error instanceof Error)
        if (error instanceof Error) {
            if (error.message === 'INVALID_REFRESH_TOKEN') {
                console.log(error, error instanceof Error)
                window.location.href = '/login'
            }
        }

        throw error
    }
}
