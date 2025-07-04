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
            user {
                firstname
                lastname
                username
                hide_name
            }
        }
        following {
            _id
            user {
                firstname
                lastname
                username
                hide_name
            }
        }
    }
}
 `

export const GetUserInfoByUsername = `query GetUserInfoByUsername($username: String!) {
    getUserInfoByUsername(username: $username) {
        _id
        email
        user {
            username
            firstname
            lastname
            hide_name
        }
        followers {
            _id
            user {
                firstname
                lastname
                username
                hide_name
            }
        }
        following {
            _id
            user {
                firstname
                lastname
                username
                hide_name
            }
        }
    }
}

 `
