export const GetConversationMutationDocument = `mutation getConversation($getConversationInput: GetConversation!) {
    getChatConversation(conversationInput: $getConversationInput) {
        userId {
            user {
                username
            }
        }
        content {
            text
        }
    }
}
`
