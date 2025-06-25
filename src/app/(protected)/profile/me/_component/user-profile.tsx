import {
    GetUserInfo,
    selectUserInfo,
    ServerStatus,
} from '@/lib/features/app/appSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { User } from '@/lib/graphql/graphqlTypes'
import React, { useEffect, useState } from 'react'
import {
    useGetLikePostsQuery,
    useGetUserPostsQuery,
} from '@/lib/features/post/postApi'
import PostItem from '@/app/(protected)/home/_component/post-item'
import { useSearchParams, useRouter } from 'next/navigation'

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
        <p className="text-gray-500">
            @
            {[user?.user.firstname, user?.user.lastname]
                .join('_')
                .toLowerCase()}
        </p>
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

const UserPosts = () => {
    const { data, isLoading, isError } = useGetUserPostsQuery()
    return (
        <div className="p-4">
            <h3 className="text-md font-bold mb-2">Posts</h3>
            {/* Placeholder for liked posts */}
            <div>
                {data?.length === 0 ? (
                    <div>No Liked Post</div>
                ) : (
                    data?.map((data, idx) => {
                        return (
                            <PostItem
                                _id={data._id}
                                content={data.content}
                                audience={data.audience}
                                createdAt={data.createdAt}
                                updatedAt={data.updatedAt}
                                username={data.author.user.username}
                                likes={data.likes.length}
                                isLiked
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}

const UserLikedPosts = () => {
    const { data, isLoading, isError } = useGetLikePostsQuery()
    return (
        <div className="p-4">
            <h3 className="text-md font-bold mb-2">Liked Posts</h3>
            {/* Placeholder for liked posts */}
            <div>
                {data?.length === 0 ? (
                    <div>No Liked Post</div>
                ) : (
                    data?.map((data, idx) => {
                        return (
                            <PostItem
                                _id={data._id}
                                content={data.content}
                                audience={data.audience}
                                createdAt={data.createdAt}
                                updatedAt={data.updatedAt}
                                username={data.author.user.username}
                                likes={data.likes.length}
                                isLiked
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}

const UserProfile: React.FC = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const tabParam = searchParams.get('tab')
    const [activeTab, setActiveTab] = useState<'posts' | 'liked'>(
        tabParam === 'liked' ? 'liked' : 'posts'
    )
    const userInfo = useAppSelector(selectUserInfo)

    // Keep state in sync with search param
    useEffect(() => {
        setActiveTab(tabParam === 'liked' ? 'liked' : 'posts')
    }, [tabParam])

    const handleTabChange = (tab: 'posts' | 'liked') => {
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
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'liked' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                    onClick={() => handleTabChange('liked')}
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
