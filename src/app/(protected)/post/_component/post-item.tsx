import React, { useEffect, useState } from 'react'
import { Card, Avatar, Space, Typography } from 'antd'
import Image from 'next/image'
import {
    UserOutlined,
    LeftOutlined,
    RightOutlined,
    MoreOutlined,
} from '@ant-design/icons'
import { formatDistanceToNow } from 'date-fns'
import { PostContentObject } from '@/lib/graphql/graphqlTypes'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Heart, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    useDeletePostMutation,
    useGetPostMutation,
    useLikePostMutation,
    useUnlikePostMutation,
} from '@/lib/features/post/postApi'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import { LOCALSTORAGE } from '@/constants/localstorage'
import PostEditModal from './post-update-modal'
import { ReactPhotoCollage } from 'react-photo-collage'

const { Text, Paragraph } = Typography

interface PostItemProps {
    _id: string
    content: PostContentObject
    audience: string
    createdAt: string
    updatedAt: string
    shares?: number
    username: string
    likes?: number
    isLiked?: boolean
    isPreview?: boolean
    authorId?: string
}

const PostItem: React.FC<PostItemProps> = ({
    _id,
    content,
    audience,
    createdAt,
    updatedAt,
    shares,
    username,
    likes,
    isLiked,
    isPreview = false,
    authorId,
}) => {
    const [
        deletePost,
        { data: postDeleted, isLoading: _, error: errorDeletion },
    ] = useDeletePostMutation()
    const [
        getPost,
        { data: getPostData, isLoading: getPostLoading, error: errorGetPost },
    ] = useGetPostMutation()
    const [postUpadated, setPostUpdated] = useState<boolean>(false)
    const [openUpdatePost, setOpenUpdatePost] = useState<boolean>(false)
    const [previewImage, setPreviewImage] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [likePost, { isLoading: isLikeLoading }] = useLikePostMutation()
    const [unlikePost, { isLoading: isUnlikeLoading }] = useUnlikePostMutation()
    const [localLikes, setLocalLikes] = useState(likes)
    const [localIsLiked, setLocalIsLiked] = useState(isLiked || false)
    const [showPost, setShowPost] = useState(true)
    const [openMenuPopOver, setOpenMenuPopOver] = useState(false)

    const handleToggleLike = async () => {
        try {
            // Optimistically update the UI
            setLocalLikes((prev) => (localIsLiked ? prev! - 1 : prev! + 1))
            setLocalIsLiked((prev) => !prev)
            // Make the API call
            if (localIsLiked) {
                const result = await unlikePost({ postId: _id }).unwrap()
                console.log('Unlike result:', result)
            } else {
                const result = await likePost({ postId: _id }).unwrap()
                console.log('Like result:', result)
            }
        } catch (error) {
            // Revert the optimistic update if the mutation fails
            setLocalLikes(likes)
            setLocalIsLiked(isLiked || false)
            console.error('Failed to toggle like:', error)
        }
    }

    useEffect(() => {
        if (true) {
            getPost(_id)
        }
    }, [openUpdatePost])

    const handleUpdatePost = () => {
        setOpenUpdatePost(true)
    }

    const handleDeletePost = () => {
        deletePost(_id)
        setShowPost(false)
        setOpenMenuPopOver(false)
    }

    const handleImageClick = (image: string, index: number) => {
        setPreviewImage(image)
        setCurrentImageIndex(index)
        setIsModalOpen(true)
    }

    const handleNext = () => {
        if (!content.images) return
        const nextIndex = (currentImageIndex + 1) % content.images.length
        setPreviewImage(content.images[nextIndex])
        setCurrentImageIndex(nextIndex)
    }

    const handlePrevious = () => {
        if (!content.images) return
        const prevIndex =
            (currentImageIndex - 1 + content.images.length) %
            content.images.length
        setPreviewImage(content.images[prevIndex])
        setCurrentImageIndex(prevIndex)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') handleNext()
        if (e.key === 'ArrowLeft') handlePrevious()
        if (e.key === 'Escape') setIsModalOpen(false)
    }

    return (
        <>
            <PostEditModal
                open={openUpdatePost}
                onOpenChange={setOpenUpdatePost}
                postId={_id}
                description={content.description}
                audience={audience.toLowerCase()}
                onUpdatedChange={setPostUpdated}
            />
            <Card
                className={cn(
                    '!w-full mb-4 max-h-[1000px] overflow-hidden',
                    !showPost && 'hidden'
                )}
            >
                <Space direction="vertical" size="middle" className="w-full">
                    <Space className="w-full justify-between">
                        <Space>
                            <Avatar icon={<UserOutlined />} />
                            <Space direction="vertical" size={0}>
                                <Text strong>{username}</Text>
                                <Text type="secondary" className="text-xs">
                                    {formatDistanceToNow(new Date(createdAt), {
                                        addSuffix: true,
                                    })}{' '}
                                    •{' '}
                                    {getPostData?.getPost?.audience?.toLowerCase() ||
                                        audience.toLowerCase()}{' '}
                                    {(createdAt !== updatedAt ||
                                        getPostData?.getPost?.createdAt !==
                                            getPostData?.getPost
                                                ?.updatedAt) && (
                                        <>
                                            • <b>edited</b>
                                        </>
                                    )}
                                </Text>
                            </Space>
                        </Space>
                        <div className="flex justify-end">
                            <Popover
                                open={openMenuPopOver}
                                onOpenChange={setOpenMenuPopOver}
                            >
                                <PopoverTrigger asChild>
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <MoreOutlined className="text-xl" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-40 p-0">
                                    {localStorageGetItem(
                                        LOCALSTORAGE['USER_ID']
                                    ) === authorId ? (
                                        <>
                                            <button
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                onClick={handleUpdatePost}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                                                onClick={handleDeletePost}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="w-full text-left px-4 py-2 hover:bg-red-100 "
                                                onClick={() =>
                                                    alert(
                                                        'areyoureallyinterestedinthepostortheperson???????'
                                                    )
                                                }
                                            >
                                                Interested In Content
                                            </button>
                                            <button
                                                className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                                                onClick={() =>
                                                    alert('Ouch! Really!')
                                                }
                                            >
                                                Not Interested
                                            </button>
                                            <button
                                                className="w-full text-left px-4 py-2 hover:bg-red-100  text-red-600"
                                                onClick={() => alert('Report')}
                                            >
                                                Report
                                            </button>
                                        </>
                                    )}
                                </PopoverContent>
                            </Popover>
                        </div>
                    </Space>

                    {content.description ||
                        (getPostData?.getPost.content.description && (
                            <Paragraph className="mb-0">
                                {getPostData?.getPost.content.description ||
                                    content.description}
                            </Paragraph>
                        ))}
                    {content.images?.length === 1 ? (
                        <ReactPhotoCollage
                            width="100%"
                            height={['35vw']}
                            layout={[1]}
                            photos={content.images.map((data) => ({
                                source: data,
                            }))}
                        />
                    ) : content.images?.length === 2 ? (
                        <ReactPhotoCollage
                            width="100%"
                            height={['35vw']}
                            layout={[2]}
                            photos={content.images.map((data) => ({
                                source: data,
                            }))}
                        />
                    ) : content.images?.length === 3 ? (
                        <ReactPhotoCollage
                            width="100%"
                            height={['20vw', '15vw']}
                            layout={[1, 2]}
                            photos={
                                content.images?.map((data) => ({
                                    source: data,
                                })) ?? []
                            }
                        />
                    ) : content.images?.length && content.images.length > 3 ? (
                        <ReactPhotoCollage
                            width="100%"
                            height={['20vw', '15vw']}
                            layout={[1, 3]}
                            photos={content.images.map((data) => ({
                                source: data,
                            }))}
                            showNumOfRemainingPhotos
                        />
                    ) : null}

                    {!isPreview && (
                        <Space className="w-full justify-between">
                            <button
                                onClick={handleToggleLike}
                                disabled={isLikeLoading || isUnlikeLoading}
                                className="flex items-center space-x-2 hover:opacity-80 transition-opacity disabled:opacity-50"
                            >
                                <Heart
                                    className={cn(
                                        'h-5 w-5 transition-all duration-300',
                                        localIsLiked
                                            ? 'fill-red-500 text-red-500 scale-110'
                                            : 'text-gray-500'
                                    )}
                                />
                                <Text type="secondary">{localLikes} likes</Text>
                            </button>
                            <Text type="secondary">{shares} shares</Text>
                        </Space>
                    )}
                </Space>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 border-none bg-transparent">
                        <div
                            className="relative w-full h-full flex items-center justify-center"
                            onKeyDown={handleKeyDown}
                            tabIndex={0}
                        >
                            {/* Navigation Buttons */}
                            {content.images && content.images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevious}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-all"
                                        aria-label="Previous image"
                                    >
                                        <LeftOutlined className="text-xl" />
                                    </button>

                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-all"
                                        aria-label="Next image"
                                    >
                                        <RightOutlined className="text-xl" />
                                    </button>
                                </>
                            )}

                            {/* Main Image Container */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={previewImage}
                                    alt="Full size image"
                                    className="max-w-full max-h-full object-contain"
                                    width={500}
                                    height={500}
                                    priority
                                    quality={100}
                                />
                            </div>

                            {/* Image Counter */}
                            {content.images && content.images.length > 1 && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/30 text-white px-4 py-1.5 rounded-full">
                                    <Text className="text-white text-base">
                                        {currentImageIndex + 1} /{' '}
                                        {content.images.length}
                                    </Text>
                                </div>
                            )}

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 z-10 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all"
                                aria-label="Close"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </Card>
        </>
    )
}

export default PostItem
