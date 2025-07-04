import { useEffect } from 'react'
import { useGetUserPostsMutation } from '@/lib/features/post/postApi'
import PostItem from '@/app/(protected)/post/_component/post-item'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { LOCALSTORAGE } from '@/constants/localstorage'

const UserPosts = () => {
    const [getUserPosts, { data, isLoading, isError }] =
        useGetUserPostsMutation()

    useEffect(() => {
        getUserPosts({ pagination: { skip: 0, limit: 100 } })
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

export default UserPosts
