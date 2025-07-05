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

export const FollowUserMutation = `mutation FollowUser($input: String!) {
    followUser(targetUserId: $input)
}
 `

export const AcceptFollowRequestMutation = `mutation AcceptFollowRequest($input: String!)  {
    acceptFollowRequest(targetUserId: $input)
}`

export const DeclineFollowRequestMutation = `mutation DeclineFollowRequest($input: String!)  {
    declineFollowRequest(targetUserId: $input)
}`

export const RemoveUserFollowingMutation = `mutation RemoveUserFollowing($input: String!)  {
    removeUserFollowing(targetUserId: $input)
}`

export const RemoveUserFollowerMutation = `mutation RemoveUserFollower($input: String!)  {
    RemoveUserFollower(targetUserId: $input)
}`
