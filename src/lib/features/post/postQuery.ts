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
            audience
            createdAt
            updatedAt
        }
    }

`
