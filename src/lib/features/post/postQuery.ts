export const CreateNewPostMutationDocument = 
    `mutation createNewPost(
        $contentInput: PostContentInput!
        $optionInput: PostOptionInput!
    ) {
        createNewPost(postContent: $contentInput, postOption: $optionInput) {
            _id
        }
    }`

export const GetPostQueryDocument =  `mutation GetPost($postId: String!) {
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
