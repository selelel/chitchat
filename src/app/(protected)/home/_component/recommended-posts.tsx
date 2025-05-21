import React, { useEffect } from 'react'
import { Spin } from 'antd'
import { useGetRecommendedPostsMutation } from '@/lib/features/post/postApi'
import PostItem from '@/app/(protected)/home/_component/post-item'
import { Post } from '@/lib/graphql/graphqlTypes'

const RecommendedPosts: React.FC = () => {
    const [
        getRecommendedPosts,
        { data: recommendedPosts, isLoading: isLoadingPosts },
    ] = useGetRecommendedPostsMutation()

    useEffect(() => {
        getRecommendedPosts({ skip: 0, limit: 10 })
    }, [])

    console.log(recommendedPosts)

    if (isLoadingPosts) {
        return (
            <div className="flex justify-center">
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            {recommendedPosts?.getRecommendedPosts.map((post: Post) => (
                <PostItem
                    key={post._id}
                    _id={post._id}
                    content={post.content}
                    audience={post.audience}
                    createdAt={post.createdAt}
                    updatedAt={post.updatedAt}
                    shares={post.shares}
                    username={post.author.user.username}
                />
            ))}
        </div>
    )
}

export default RecommendedPosts
