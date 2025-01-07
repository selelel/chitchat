import { baseApiWithGraphql } from '../../graphql/graphqlBaseApi'
import { Parse_Message } from '@/helper/error'
import { GetUserByIdQueryDocument } from './appQuery'
import { Query, User } from '@/lib/graphql/graphqlTypes'

export const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
    endpoints: (build) => ({
        getUserInfo: build.query<User, void>({
            query: () => ({
                document: GetUserByIdQueryDocument,
            }),
            transformErrorResponse: (error) => {
                console.log(error.message)
                return { ...error, message: Parse_Message(error) }
            },
        }),
    }),
})

export const { useGetUserInfoQuery } = injectedRtkApi
