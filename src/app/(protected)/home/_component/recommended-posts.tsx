import React, { useEffect } from 'react'
import { Spin } from 'antd'
import { useGetRecommendedPostsMutation } from '@/lib/features/post/postApi'
import PostItem from '@/app/(protected)/home/_component/post-item'
import { Post } from '@/lib/graphql/graphqlTypes'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { LOCALSTORAGE } from '@/constants/localstorage'

const RecommendedPosts: React.FC = () => {
    const [
        getRecommendedPosts,
        { data: recommendedPosts, isLoading: isLoadingPosts },
    ] = useGetRecommendedPostsMutation()

    useEffect(() => {
        getRecommendedPosts({ skip: 0, limit: 100 })
    }, [])

    if (isLoadingPosts) {
        return (
            <div className="flex justify-center">
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            {recommendedPosts?.getRecommendedPosts.map((post: Post) => {
                return (
                    <PostItem
                        key={post._id}
                        _id={post._id}
                        content={post.content}
                        audience={post.audience}
                        createdAt={post.createdAt}
                        updatedAt={post.updatedAt}
                        shares={post.shares}
                        username={post.author.user.username}
                        likes={post.likes.length || 0}
                        isLiked={
                            post.likes.some(
                                (like) =>
                                    like._id ===
                                    localStorageGetItem(LOCALSTORAGE['USER_ID'])
                            ) || false
                        }
                    />
                )
            })}
        </div>
    )
}

export default RecommendedPosts
