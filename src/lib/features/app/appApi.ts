import { baseApiWithGraphql } from '../../graphql/graphqlBaseApi'
import { Parse_Message } from '@/helper/error'
import { GetUserByIdQueryDocument } from './appQuery'
import { Query, User } from '@/lib/graphql/graphqlTypes'
import { LOCALSTORAGE } from '@/constants/localstorage'

export const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
    endpoints: (build) => ({
        getUserInfo: build.query<User, void>({
            query: () => ({
                document: GetUserByIdQueryDocument,
            }),
            transformResponse: ({ getUserById }: Query) => {
                // ! setting here the localstorage changing user_id
                window.localStorage.setItem(
                    LOCALSTORAGE['USER_ID'],
                    getUserById._id
                )
                return getUserById
            },
            transformErrorResponse: (error) => {
                console.log(error.message)
                return { ...error, message: Parse_Message(error) }
            },
        }),
    }),
})

export const { useGetUserInfoQuery } = injectedRtkApi
