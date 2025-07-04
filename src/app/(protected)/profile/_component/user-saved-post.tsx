import { useEffect } from 'react'
import { useGetSavedPostsMutation } from '@/lib/features/post/postApi'
import PostItem from '@/app/(protected)/post/_component/post-item'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { LOCALSTORAGE } from '@/constants/localstorage'

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

export default UserSavedPosts
