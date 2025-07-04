import React, { useEffect, useState } from 'react'
import { selectUserInfo } from '@/lib/features/app/appSlice'
import { useAppSelector } from '@/lib/hooks'
import { useSearchParams, useRouter } from 'next/navigation'
import UserProfileImage from './user-profile-info'
import UserPosts from './user-posts'
import UserLikedPosts from './user-liked-post'
import UserSavedPosts from './user-saved-post'

const UserProfile: React.FC = () => {
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
    const userInfo = useAppSelector(selectUserInfo)

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

    return (
        <>
            <UserProfileImage user={userInfo} />
            <div className="flex border-b">
                <button
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'posts' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                    onClick={() => handleTabChange('posts')}
                >
                    Posts
                </button>
                <button
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'saved' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                    onClick={() => handleTabChange('saved')}
                >
                    Saved Posts
                </button>
                <button
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'liked' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                    onClick={() => handleTabChange('liked')}
                >
                    Liked Posts
                </button>
            </div>
            <div>
                {activeTab === 'posts' ? (
                    <UserPosts />
                ) : activeTab === 'liked' ? (
                    <UserLikedPosts />
                ) : (
                    <UserSavedPosts />
                )}
            </div>
        </>
    )
}

export default UserProfile
