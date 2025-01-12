export const GetConversationMutationDocument = `mutation getConversation($getConversationInput: GetConversation!) {
    getChatConversation(conversationInput: $getConversationInput) {
        userId {
            user {
                username
            }
            _id
        }
        content {
            text
        }
    }
}
`

export const GetAllChatsQueryDocument = `query GetAllChats {
    getAllChats {
        _id
        usersId {
            _id
            user {
                firstname
                username
                lastname
                hide_name
            }
        }
    }
}
`
