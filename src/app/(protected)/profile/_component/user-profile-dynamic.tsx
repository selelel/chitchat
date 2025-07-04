import React, { useEffect } from 'react'
import { useGetUserInfoByUsernameMutation } from '@/lib/features/app/appApi'
import UserPostsDynamic from './user-posts-dynamic'
import UserProfileInfo from './user-profile-info'

const UserProfileDynamic: React.FC<{ username: string }> = ({ username }) => {
    const [getUserInfoByUsername, { data }] = useGetUserInfoByUsernameMutation()

    useEffect(() => {
        getUserInfoByUsername({ username })
    }, [username])

    return (
        <>
            <UserProfileInfo user={data?.getUserInfoByUsername!} />
            <div>
                <UserPostsDynamic id={data?.getUserInfoByUsername?._id!} />
            </div>
        </>
    )
}

export default UserProfileDynamic
