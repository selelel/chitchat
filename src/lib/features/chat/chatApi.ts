import { baseApiWithGraphql } from '../../graphql/graphqlBaseApi'
import {
    Query,
    Mutation,
    GetConversation,
    User,
} from '../../graphql/graphqlTypes'
import { Parse_Message } from '@/helper/error'
import {
    GetAllChatsQueryDocument,
    GetConversationMutationDocument,
} from './chatQuery'

export const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
    endpoints: (build) => ({
        GetConversation: build.mutation<
            {
                getChatConversation: Mutation['getChatConversation'] & {
                    userId: User[]
                }
            },
            { getConversationInput: GetConversation }
        >({
            query: (variables) => ({
                document: GetConversationMutationDocument,
                variables,
            }),
            transformErrorResponse: (error) => ({
                ...error,
                message: Parse_Message(error),
            }),
        }),
        GetAllChat: build.query<{ getAllChats: Query['getAllChats'] }, void>({
            query: () => ({
                document: GetAllChatsQueryDocument,
            }),
            transformErrorResponse: (error) => ({
                ...error,
                message: Parse_Message(error),
            }),
        }),
    }),
})

export const { useGetConversationMutation, useGetAllChatQuery } = injectedRtkApi
