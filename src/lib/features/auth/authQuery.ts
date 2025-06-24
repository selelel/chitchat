export const TestQueryDocument = `query TestQuery {
    testQuery {
        _id
        email
        tags
        status
        user {
            username
            firstname
        }
    }
}`

export const LogInMutationDocument = `mutation LoginUser($input: LoginUserInput!) {
    loginUser(userInput: $input) {
        accesstoken
        user {
            _id
            user {
                firstname
                lastname
                username
            }
        }
    }
}
`

export const LogOutQueryDocument = `query LogoutAllDevices {
            logoutAllDevices
          }`

export const RefreshTokenQueryDocument = `query Refresh {
        refresh {
            accesstoken
        }
    }`

export const GetUserInfoQueryDocument = `
    query GetUserInfo {
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
            posts {
                _id
            }
        }
    }
`

export const SignInMutationDocument = `mutation RegisterUser($input: UserInput!) {
        registerUser(userInput: $input) {
            _id
        }
    }`

export const CheckUserExistsByEmailMutationDocument = `mutation CheckUserExistsByEmail($input: String!) {
        checkUserExistsByEmail(email: $input)
    }`
