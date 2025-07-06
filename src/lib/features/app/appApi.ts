import { baseApiWithGraphql } from '../../graphql/graphqlBaseApi'
import { Parse_Message } from '@/helper/error'
import {
    AcceptFollowRequestMutation,
    DeclineFollowRequestMutation,
    FollowUserMutation,
    GetManyUserByIdMutation,
    GetUserByIdQueryDocument,
    RemoveUserFollowerMutation,
    RemoveUserFollowingMutation,
} from './appQuery'
import { Mutation, Query, User } from '@/lib/graphql/graphqlTypes'
import { LOCALSTORAGE } from '@/constants/localstorage'
import { localStorageSetItem } from '@/utils/helper/localstorage'
import { GetUserInfoByUsername } from './appQuery'

export const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
    endpoints: (build) => ({
        getUserInfo: build.query<User, void>({
            query: () => ({
                document: GetUserByIdQueryDocument,
            }),
            transformResponse: ({ getUserInfo }: Query) => {
                // ! setting here the localstorage changing user_id
                localStorageSetItem(LOCALSTORAGE['USER_ID'], getUserInfo._id)
                return getUserInfo
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
        folowUser: build.mutation<
            { followUser: Mutation['followUser'] },
            { input: string }
        >({
            query: ({ input }) => ({
                document: FollowUserMutation,
                variables: { input },
            }),
            transformErrorResponse: (error) => {
                console.log(error.message)
                return { ...error, message: Parse_Message(error) }
            },
        }),
        acceptFollowRequest: build.mutation<
            { acceptFollowRequest: Mutation['acceptFollowRequest'] },
            string
        >({
            query: (input) => ({
                document: AcceptFollowRequestMutation,
                variables: { input },
            }),
            transformErrorResponse: (error) => {
                console.log(error.message)
                return { ...error, message: Parse_Message(error) }
            },
        }),
        cancelFollowRequest: build.mutation<
            { cancelFollowRequest: Mutation['cancelFollowRequest'] },
            { input: string }
        >({
            query: ({ input }) => ({
                document: DeclineFollowRequestMutation,
                variables: { input },
            }),
            transformErrorResponse: (error) => {
                console.log(error.message)
                return { ...error, message: Parse_Message(error) }
            },
        }),
        declineFollowRequest: build.mutation<
            { declineFollowRequest: Mutation['declineFollowRequest'] },
            string
        >({
            query: (input) => ({
                document: DeclineFollowRequestMutation,
                variables: { input },
            }),
            transformErrorResponse: (error) => {
                console.log(error.message)
                return { ...error, message: Parse_Message(error) }
            },
        }),
        removeUserFollower: build.mutation<
            { removeUserFollower: Mutation['removeUserFollower'] },
            { input: string }
        >({
            query: ({ input }) => ({
                document: RemoveUserFollowerMutation,
                variables: { input },
            }),
            transformErrorResponse: (error) => {
                console.log(error.message)
                return { ...error, message: Parse_Message(error) }
            },
        }),
        removeUserFollowing: build.mutation<
            { removeUserFollowing: Mutation['removeUserFollowing'] },
            { input: string }
        >({
            query: ({ input }) => ({
                document: RemoveUserFollowingMutation,
                variables: { input },
            }),
            transformErrorResponse: (error) => {
                console.log(error.message)
                return { ...error, message: Parse_Message(error) }
            },
        }),
        getManyUserInfo: build.mutation<
            { getManyUserInfo: Mutation['getManyUserInfo'] },
            string[]
        >({
            query: (variables) => ({
                document: GetManyUserByIdMutation,
                variables: { ids: variables },
            }),
            transformErrorResponse: (error) => {
                console.log(error.message)
                return { ...error, message: Parse_Message(error) }
            },
        }),
    }),
})

export const {
    useGetUserInfoQuery,
    useGetUserInfoByUsernameMutation,
    useAcceptFollowRequestMutation,
    useCancelFollowRequestMutation,
    useDeclineFollowRequestMutation,
    useFolowUserMutation,
    useRemoveUserFollowerMutation,
    useRemoveUserFollowingMutation,
    useGetManyUserInfoMutation,
} = injectedRtkApi
