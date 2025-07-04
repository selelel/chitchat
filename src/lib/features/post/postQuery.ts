export const CreateNewPostMutationDocument = `mutation createNewPost(
        $contentInput: PostContentInput!
        $optionInput: PostOptionInput!
    ) {
        createNewPost(postContent: $contentInput, postOption: $optionInput) {
            _id
            shares
            author {
                _id
                user {
                    username
                }
            }
            content {
                text
                description
                images
            }
            likes {
                _id
            }
            audience
            createdAt
            updatedAt
        }
    }`

export const GetPostQueryDocument = `query GetPost($postId: String!) {
        getPost(postId: $postId) {
            _id
            shares
            save {
                    _id
                    user {
                        username
                    }
                }
            author {
                _id
                user {
                    username
                }
            }
            content {
                text
                description
                images
            }
            likes {
                _id
            }
            audience
            createdAt
            updatedAt
        }
    }`

export const GetRecommendedPostsQueryDocument = `
    mutation getRecommendedPosts($pagination: Pagination!) {
        getRecommendedPosts(pagination: $pagination) {
            _id
            shares
            save {
                    _id
                    user {
                        username
                    }
                }
            author {
                _id
                user {
                    username
                }
            }
            content {
                text,
                description,
                images
            }
            likes {
                _id
            }
            audience
            createdAt
            updatedAt
        }
    }

`

export const GetUserFollowingPostsQueryDocument = `
    mutation getUserFollowingPosts($pagination: Pagination!) {
        getUserFollowingPosts(pagination: $pagination) {
            _id
            shares
            author {
                _id
                user {
                    username
                }
            }
            save {
                    _id
                    user {
                        username
                    }
                }
            content {
                text,
                description,
                images
            }
            likes {
                _id
            }
            audience
            createdAt
            updatedAt
        }
    }

`

export const LikePostMutationDocument = `
    mutation LikePost($postId: String!) {
        likePost(postId: $postId)
    }
`

export const SavePostMutationDocument = `
    mutation savePost($postId: String!) {
        savePost(postId: $postId)
    }
`

export const UnlikePostMutationDocument = `
    mutation UnlikePost($postId: String!) {
        unlikePost(postId: $postId)
    }
`

export const UnsavePostMutationDocument = `
    mutation UnsavePost($postId: String!) {
        unsavePost(postId: $postId)
    }
`

export const IsLikedPostMutationDocument = `
    mutation isLikedPost($postId: String!) {
        isLikedPost(postId: $postId)
    }
`

export const GetLikedPosts = `
    query GetLikedPost($pagination: Pagination!) {
        getLikedPost(pagination: $pagination) {
                _id
                shares
                save {
                    _id
                    user {
                        username
                    }
                }
                author {
                    _id
                    user {
                        username
                    }
                }
                content {
                    text,
                    description,
                    images
                }
                likes {
                    _id
                }
                audience
                createdAt
                updatedAt
            }
    }
`

export const GetUserPosts = `
    query GetUserPosts($id: String, $pagination: Pagination!) {
    getUserPosts(pagination: $pagination, id: $id) {
                _id
                shares
                save {
                    _id
                    user {
                        username
                    }
                }
                author {
                    _id
                    user {
                        username
                    }
                }
                content {
                    text,
                    description,
                    images
                }
                likes {
                    _id
                }
                audience
                createdAt
                updatedAt
            }
    }
`

export const GetSavedPosts = `
    query GetSavePosts($pagination: Pagination!) {
        getSavePosts(pagination: $pagination) {
                _id
                shares
                save {
                    _id
                    user {
                        username
                    }
                }
                author {
                    _id
                    user {
                        username
                    }
                }
                content {
                    text,
                    description,
                    images
                }
                likes {
                    _id
                }
                audience
                createdAt
                updatedAt
            }
    }
`

export const DeletePost = `
        mutation removePost($id: String!) {
            removePost(postId: $id)
        }
`

export const UpdatePost = `
        mutation updatePost(
            $id: String!
            $updateContent: PostContentInput!
            $option: PostOptionInput!
        ) {
            updatePost(postId: $id, updatedPost: $updateContent, postOption: $option)
        }
`
