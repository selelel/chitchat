export const CreateNewPostMutationDocument = 
    `mutation createNewPost(
        $contentInput: PostContentInput!
        $optionInput: PostOptionInput!
    ) {
        createNewPost(postContent: $contentInput, postOption: $optionInput) {
            _id
        }
    }`
