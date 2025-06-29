import {
    GetUserInfo,
    selectUserInfo,
    ServerStatus,
} from '@/lib/features/app/appSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { User } from '@/lib/graphql/graphqlTypes'
import React, { useEffect, useState } from 'react'
import {
    useGetLikePostsMutation,
    useGetUserPostsMutation,
    useGetSavedPostsMutation,
} from '@/lib/features/post/postApi'
import PostItem from '@/app/(protected)/post/_component/post-item'
import { useSearchParams, useRouter } from 'next/navigation'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { LOCALSTORAGE } from '@/constants/localstorage'

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
    const [getUserPosts, { data, isLoading, isError }] =
        useGetUserPostsMutation()

    useEffect(() => {
        getUserPosts({ skip: 0, limit: 100 })
    }, [])

    return (
        <div className="p-4">
            <h3 className="text-md font-bold mb-2">Posts</h3>
            <div>
                {data?.getUserPosts?.length === 0 ? (
                    <div>No Made Post</div>
                ) : (
                    data?.getUserPosts?.map((data, idx) => {
                        return (
                            <PostItem
                                key={idx}
                                _id={data._id}
                                content={data.content}
                                audience={data.audience}
                                createdAt={data.createdAt}
                                updatedAt={data.updatedAt}
                                username={data.author.user.username}
                                likes={data.likes.length}
                                authorId={data.author._id}
                                isLiked={
                                    data.likes.some(
                                        (like) =>
                                            like._id ===
                                            localStorageGetItem(
                                                LOCALSTORAGE['USER_ID']
                                            )
                                    ) || false
                                }
                                isSaved={
                                    data.save.some(
                                        (save) =>
                                            save._id ===
                                            localStorageGetItem(
                                                LOCALSTORAGE['USER_ID']
                                            )
                                    ) || false
                                }
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}

const UserLikedPosts = () => {
    const [getLikePosts, { data, isLoading, isError }] =
        useGetLikePostsMutation()

    useEffect(() => {
        getLikePosts({ skip: 0, limit: 100 })
    }, [])

    return (
        <div className="p-4">
            <h3 className="text-md font-bold mb-2">Liked Posts</h3>
            <div>
                {data?.getLikedPost?.length === 0 ? (
                    <div>No Liked Post</div>
                ) : (
                    data?.getLikedPost?.map((data, idx) => {
                        return (
                            <PostItem
                                key={idx}
                                _id={data._id}
                                content={data.content}
                                audience={data.audience}
                                createdAt={data.createdAt}
                                updatedAt={data.updatedAt}
                                username={data.author.user.username}
                                likes={data.likes.length}
                                authorId={data.author._id}
                                isLiked
                                isSaved={
                                    data.save.some(
                                        (save) =>
                                            save._id ===
                                            localStorageGetItem(
                                                LOCALSTORAGE['USER_ID']
                                            )
                                    ) || false
                                }
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}

const UserSavedPosts = () => {
    const [getSavedPosts, { data, isLoading, isError }] =
        useGetSavedPostsMutation()

    useEffect(() => {
        getSavedPosts({ skip: 0, limit: 100 })
    }, [])

    return (
        <div className="p-4">
            <h3 className="text-md font-bold mb-2">Saved Posts</h3>
            <div>
                {data?.getSavePosts?.length === 0 ? (
                    <div>No Saved Posts</div>
                ) : (
                    data?.getSavePosts?.map((data, idx) => {
                        return (
                            <PostItem
                                key={idx}
                                _id={data._id}
                                content={data.content}
                                audience={data.audience}
                                createdAt={data.createdAt}
                                updatedAt={data.updatedAt}
                                username={data.author.user.username}
                                likes={data.likes.length}
                                authorId={data.author._id}
                                isLiked={
                                    data.likes.some(
                                        (like) =>
                                            like._id ===
                                            localStorageGetItem(
                                                LOCALSTORAGE['USER_ID']
                                            )
                                    ) || false
                                }
                                isSaved={true}
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
