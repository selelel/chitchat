import { useEffect } from 'react'
import { useGetLikePostsMutation } from '@/lib/features/post/postApi'
import PostItem from '@/app/(protected)/post/_component/post-item'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { LOCALSTORAGE } from '@/constants/localstorage'

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

export default UserLikedPosts
