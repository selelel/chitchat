import { baseApiWithGraphql } from '../../graphql/graphqlBaseApi'
import { Parse_Message } from '@/helper/error'
import { GetUserByIdQueryDocument } from './appQuery'
import { Query } from '@/lib/graphql/graphqlTypes'

export const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
    endpoints: (build) => ({
        getUserInfo1: build.mutation<any, void>({
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

export const { useGetUserInfo1Mutation } = injectedRtkApi
