export const CreateNewPostMutationDocument = `mutation createNewPost(
        $contentInput: PostContentInput!
        $optionInput: PostOptionInput!
    ) {
        createNewPost(postContent: $contentInput, postOption: $optionInput) {
            _id
        }
    }`

export const GetPostQueryDocument = `mutation GetPost($postId: String!) {
                            getPost(postId: $postId) {
                                _id
                                author {
                                    _id
                                }
                                content {
                                    description
                                    images
                                    text
                                }
                                    likes
                                audience
                            }
                        }
                    `

export const GetRecommendedPostsQueryDocument = `
    mutation getRecommendedPosts($pagination: Pagination!) {
        getRecommendedPosts(pagination: $pagination) {
            _id
            shares
            author {
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
