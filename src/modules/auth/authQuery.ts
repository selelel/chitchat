export const TestQueryDocument = 
`query TestQuery {
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
}`;

export const LogInMutationDocument = 
`mutation LoginUser($input: LoginUserInput!) {
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
`;
export const LogOutQueryDocument = 
`query LogoutAllDevices {
            logoutAllDevices
          }`

            

                        