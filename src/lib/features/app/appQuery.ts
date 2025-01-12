export const GetUserByIdQueryDocument = `query GetUserById {
    getUserById {
        _id
        email
        tags
        status
        chats {
            _id
        }
    }
}
 `
