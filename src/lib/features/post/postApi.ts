import { Parse_Message } from '@/helper/error'
import { baseApiWithGraphql } from '@/lib/graphql/graphqlBaseApi'
import {
    Mutation,
    LoginUserInput,
    PostContentInput,
    PostOptionInput,
    Query,
} from '@/lib/graphql/graphqlTypes'
import { LogInMutationDocument } from '../auth/authQuery'
import {
    CreateNewPostMutationDocument,
    GetPostQueryDocument,
    GetRecommendedPostsQueryDocument,
    GetUserFollowingPostsQueryDocument,
    LikePostMutationDocument,
    UnlikePostMutationDocument,
} from './postQuery'

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
    endpoints: (build) => ({
        createNewPost: build.mutation<
            { createNewPost: Mutation['createNewPost'] },
            { contentInput: PostContentInput; optionInput: PostOptionInput }
        >({
            query: (variables) => ({
                document: CreateNewPostMutationDocument,
                variables,
            }),
            transformErrorResponse: (error) => {
                return { ...error, message: Parse_Message(error) }
            },
            transformResponse: (data: {
                createNewPost: Mutation['createNewPost']
            }) => {
                return data
            },
        }),
        getPost: build.mutation<{ getPost: Query['getPost'] }, string>({
            query: (variables) => ({
                document: GetPostQueryDocument,
                variables: { postId: variables },
            }),
            transformErrorResponse: (error) => {
                return { ...error, message: Parse_Message(error) }
            },
            transformResponse: (data: { getPost: Query['getPost'] }) => {
                return data
            },
        }),
        getRecommendedPosts: build.mutation<
            { getRecommendedPosts: Mutation['getRecommendedPosts'] },
            { skip: number; limit: number }
        >({
            query: (variables) => ({
                document: GetRecommendedPostsQueryDocument,
                variables: {
                    pagination: variables,
                },
            }),
            transformErrorResponse: (error) => {
                return { ...error, message: Parse_Message(error) }
            },
        }),
        getFollowingPosts: build.mutation<
            { getUserFollowingPosts: Mutation['getUserFollowingPosts'] },
            { skip: number; limit: number }
        >({
            query: (variables) => ({
                document: GetUserFollowingPostsQueryDocument,
                variables: {
                    pagination: variables,
                },
            }),
            transformErrorResponse: (error) => {
                return { ...error, message: Parse_Message(error) }
            },
        }),
        likePost: build.mutation({
            query: (variables) => ({
                document: LikePostMutationDocument,
                variables,
            }),
            transformResponse: (response) => {
                console.log('Like response:', response)
                return response
            },
        }),
        unlikePost: build.mutation({
            query: (variables) => ({
                document: UnlikePostMutationDocument,
                variables,
            }),
            transformResponse: (response) => {
                console.log('Unlike response:', response)
                return response
            },
        }),
    }),
})

export const {
    useCreateNewPostMutation,
    useGetPostMutation,
    useGetRecommendedPostsMutation,
    useLikePostMutation,
    useUnlikePostMutation,
    useGetFollowingPostsMutation,
} = injectedRtkApi
