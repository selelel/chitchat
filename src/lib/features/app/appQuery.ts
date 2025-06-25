export const GetUserByIdQueryDocument = `query GetUserInfo {
    getUserInfo {
        _id
        email
        tags
        status
        isPrivate
        user {
            firstname
            lastname
            username
            hide_name
        }
        followers {
            _id
        }
        following {
            _id
        }
    }
}
 `
