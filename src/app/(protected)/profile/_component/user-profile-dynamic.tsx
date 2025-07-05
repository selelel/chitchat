import React, { useEffect } from 'react'
import { useGetUserInfoByUsernameMutation } from '@/lib/features/app/appApi'
import UserPostsDynamic from './user-posts-dynamic'
import UserProfileInfo, { UserProfileInfoDynamic } from './user-profile-info'
import { LOCALSTORAGE } from '@/constants/localstorage'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { redirect } from 'next/navigation'

const UserProfileDynamic: React.FC<{ username: string }> = ({ username }) => {
    const [getUserInfoByUsername, { data, isLoading }] =
        useGetUserInfoByUsernameMutation()

    useEffect(() => {
        getUserInfoByUsername({ username })
    }, [username])

    if (
        localStorageGetItem(LOCALSTORAGE['USER_ID']) ===
        data?.getUserInfoByUsername._id
    ) {
        redirect('/profile/me')
    } else {
        return (
            <>
                <UserProfileInfoDynamic
                    user={data?.getUserInfoByUsername!}
                    isLoading={isLoading}
                />
                <div>
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                            <svg
                                className="w-10 h-10 mb-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="text-lg font-medium">
                                No posts found
                            </span>
                            <span className="text-sm">
                                This user hasn't posted anything yet.
                            </span>
                        </div>
                    ) : (
                        <UserPostsDynamic
                            id={data?.getUserInfoByUsername?._id!}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default UserProfileDynamic
