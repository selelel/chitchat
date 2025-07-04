import { baseApiWithGraphql } from '../../graphql/graphqlBaseApi'
import { Parse_Message } from '@/helper/error'
import { GetUserByIdQueryDocument } from './appQuery'
import { Query, User } from '@/lib/graphql/graphqlTypes'
import { LOCALSTORAGE } from '@/constants/localstorage'
import { localStorageSetItem } from '@/utils/helper/localstorage'
import { GetUserInfoByUsername } from './appQuery'

export const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
    endpoints: (build) => ({
        getUserInfo: build.query<User, void>({
            query: () => ({
                document: GetUserByIdQueryDocument,
            }),
            transformResponse: ({ getUserById }: Query) => {
                // ! setting here the localstorage changing user_id
                localStorageSetItem(LOCALSTORAGE['USER_ID'], getUserById._id)
                return getUserById
            },
            transformErrorResponse: (error) => {
                console.log(error.message)
                return { ...error, message: Parse_Message(error) }
            },
        }),
        getUserInfoByUsername: build.mutation<
            { getUserInfoByUsername: Query['getUserInfoByUsername'] },
            { username: string }
        >({
            query: ({ username }) => ({
                document: GetUserInfoByUsername,
                variables: { username },
            }),
            transformErrorResponse: (error) => {
                console.log(error.message)
                return { ...error, message: Parse_Message(error) }
            },
        }),
    }),
})

export const { useGetUserInfoQuery, useGetUserInfoByUsernameMutation } =
    injectedRtkApi
