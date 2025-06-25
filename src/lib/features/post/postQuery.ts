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

export const UnlikePostMutationDocument = `
    mutation UnlikePost($postId: String!) {
        unlikePost(postId: $postId)
    }
`

export const IsLikedPostMutationDocument = `
    mutation isLikedPost($postId: String!) {
        isLikedPost(postId: $postId)
    }
`

export const GetLikedPosts = `
    query GetLikedPost {
        getLikedPost {
                _id
                shares
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
        query GetUserPosts {
        getUserPosts {
                _id
                shares
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
