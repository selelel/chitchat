import {
    GetUserInfo,
    selectUserInfo,
    ServerStatus,
} from '@/lib/features/app/appSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { User } from '@/lib/graphql/graphqlTypes'
import React, { useEffect, useState } from 'react'

const UserProfileImage = ({ user }: { user: User | null }) => (
    <div className="flex flex-col items-center p-4">
        <img
            src={'/placeholder-profile.webp'}
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <h2 className="mt-2 text-lg font-semibold">
            {user?.user.username || 'Username'}
        </h2>
        <p className="text-gray-500">@{user?.email || 'userhandle'}</p>
        <div className="flex mt-4 space-x-4">
            <div className="text-center">
                <span className="font-bold">{user?.following.length}</span>
                <span className="text-gray-500"> Following</span>
            </div>
            <div className="text-center">
                <span className="font-bold">{user?.followers.length}</span>
                <span className="text-gray-500"> Followers</span>
            </div>
        </div>
    </div>
)

const UserPosts = () => (
    <div className="p-4">
        <h3 className="text-md font-bold mb-2">Posts</h3>
        {/* Placeholder for user posts */}
        <div className="bg-gray-100 rounded p-2 text-gray-600">
            No posts yet.
        </div>
    </div>
)

const UserLikedPosts = () => (
    <div className="p-4">
        <h3 className="text-md font-bold mb-2">Liked Posts</h3>
        {/* Placeholder for liked posts */}
        <div className="bg-gray-100 rounded p-2 text-gray-600">
            No liked posts yet.
        </div>
    </div>
)

const UserProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'posts' | 'liked'>('posts')
    const userInfo = useAppSelector(selectUserInfo)
    return (
        <>
            <UserProfileImage user={userInfo} />
            <div className="flex border-b">
                <button
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'posts' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                    onClick={() => setActiveTab('posts')}
                >
                    Posts
                </button>
                <button
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'liked' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                    onClick={() => setActiveTab('liked')}
                >
                    Liked Posts
                </button>
            </div>
            <div>
                {activeTab === 'posts' ? <UserPosts /> : <UserLikedPosts />}
            </div>
        </>
    )
}

export default UserProfile
