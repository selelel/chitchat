import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import UserProfileImage from './user-profile-info'
import UserPosts from './user-posts'
import UserLikedPosts from './user-liked-post'
import UserSavedPosts from './user-saved-post'
import { useGetUserInfoByUsernameMutation } from '@/lib/features/app/appApi'
import UserPostsDynamic from './user-posts-dynamic'

const UserProfileDynamic: React.FC<{ username: string }> = ({ username }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const tabParam = searchParams.get('tab')
    const [activeTab, setActiveTab] = useState<'posts' | 'liked' | 'saved'>(
        tabParam === 'liked'
            ? 'liked'
            : tabParam === 'saved'
              ? 'saved'
              : 'posts'
    )
    const [getUserInfoByUsername, { data }] = useGetUserInfoByUsernameMutation()

    useEffect(() => {
        getUserInfoByUsername({ username })
    }, [username])

    // Keep state in sync with search param
    useEffect(() => {
        if (tabParam === 'liked') {
            setActiveTab('liked')
        } else if (tabParam === 'saved') {
            setActiveTab('saved')
        } else {
            setActiveTab('posts')
        }
    }, [tabParam])

    const handleTabChange = (tab: 'posts' | 'liked' | 'saved') => {
        router.replace(`?tab=${tab}`)
        setActiveTab(tab)
    }
    console.log(data?.getUserInfoByUsername?._id)

    return (
        <>
            <UserProfileImage user={data?.getUserInfoByUsername!} />
            <div>
                <UserPostsDynamic id={data?.getUserInfoByUsername?._id!} />
            </div>
        </>
    )
}

export default UserProfileDynamic
