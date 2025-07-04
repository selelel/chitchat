import { Parse_Message } from '@/helper/error'
import { baseApiWithGraphql } from '@/lib/graphql/graphqlBaseApi'
import {
    Mutation,
    LoginUserInput,
    PostContentInput,
    PostOptionInput,
    Query,
    Post,
} from '@/lib/graphql/graphqlTypes'
import { LogInMutationDocument } from '../auth/authQuery'
import {
    CreateNewPostMutationDocument,
    DeletePost,
    GetLikedPosts,
    GetPostQueryDocument,
    GetRecommendedPostsQueryDocument,
    GetUserFollowingPostsQueryDocument,
    GetUserPosts,
    GetSavedPosts,
    LikePostMutationDocument,
    SavePostMutationDocument,
    UnlikePostMutationDocument,
    UnsavePostMutationDocument,
    UpdatePost,
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
        deletePost: build.mutation<
            { removePost: Mutation['removePost'] },
            string
        >({
            query: (variables) => ({
                document: DeletePost,
                variables: {
                    id: variables,
                },
            }),
            transformErrorResponse: (error) => {
                return { ...error, message: Parse_Message(error) }
            },
        }),
        updatePost: build.mutation<
            { updatePost: Mutation['updatePost'] },
            {
                id: string
                updateContent: PostContentInput
                option: PostOptionInput
            }
        >({
            query: (variables) => ({
                document: UpdatePost,
                variables: variables,
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
        }),
        savePost: build.mutation({
            query: (variables) => ({
                document: SavePostMutationDocument,
                variables,
            }),
        }),
        getUserPosts: build.mutation<
            { getUserPosts: Query['getUserPosts'] },
            {
                id?: string
                pagination: { skip: number; limit: number }
            }
        >({
            query: (variables) => ({
                document: GetUserPosts,
                variables,
            }),
        }),
        getLikePosts: build.mutation<
            { getLikedPost: Query['getLikedPost'] },
            { skip: number; limit: number }
        >({
            query: (variables) => ({
                document: GetLikedPosts,
                variables: {
                    pagination: variables,
                },
            }),
        }),
        getSavedPosts: build.mutation<
            { getSavePosts: Post[] },
            { skip: number; limit: number }
        >({
            query: (variables) => ({
                document: GetSavedPosts,
                variables: {
                    pagination: variables,
                },
            }),
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
        unsavePost: build.mutation({
            query: (variables) => ({
                document: UnsavePostMutationDocument,
                variables,
            }),
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
    useGetLikePostsMutation,
    useGetUserPostsMutation,
    useGetSavedPostsMutation,
    useDeletePostMutation,
    useUpdatePostMutation,
    useSavePostMutation,
    useUnsavePostMutation,
} = injectedRtkApi
