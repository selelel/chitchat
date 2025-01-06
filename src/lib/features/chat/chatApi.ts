import { baseApiWithGraphql } from '../../graphql/graphqlBaseApi'
import { Query, Mutation, GetConversation } from '../../graphql/graphqlTypes'
import { Parse_Message } from '@/helper/error'
import { GetConversationMutationDocument } from './chatQuery'

export const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
    endpoints: (build) => ({
        GetConversation: build.mutation<
            Mutation['getChatConversation'],
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
    }),
})

export const { useGetConversationMutation } = injectedRtkApi
