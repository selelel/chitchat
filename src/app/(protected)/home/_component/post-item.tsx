import React, { useState } from 'react'
import { Card, Avatar, Space, Typography } from 'antd'
import Image from 'next/image'
import { UserOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { formatDistanceToNow } from 'date-fns'
import { PostContentObject } from '@/lib/graphql/graphqlTypes'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Heart, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    useLikePostMutation,
    useUnlikePostMutation,
} from '@/lib/features/post/postApi'

const { Text, Paragraph } = Typography

interface PostItemProps {
    _id: string
    content: PostContentObject
    audience: string
    createdAt: string
    updatedAt: string
    shares: number
    username: string
    likes: number
    isLiked?: boolean
}

const PostItem: React.FC<PostItemProps> = ({
    _id,
    content,
    audience,
    createdAt,
    shares,
    username,
    likes,
    isLiked,
}) => {
    const [previewImage, setPreviewImage] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [likePost, { isLoading: isLikeLoading }] = useLikePostMutation()
    const [unlikePost, { isLoading: isUnlikeLoading }] = useUnlikePostMutation()
    const [localLikes, setLocalLikes] = useState(likes)
    const [localIsLiked, setLocalIsLiked] = useState(isLiked || false)

    const handleToggleLike = async () => {
        try {
            // Optimistically update the UI
            setLocalLikes((prev) => (localIsLiked ? prev - 1 : prev + 1))
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

    const renderImageGallery = () => {
        if (!content.images || content.images.length === 0) return null

        const images = content.images
        const imageCount = images.length

        if (imageCount === 1) {
            return (
                <div className="w-full">
                    <Image
                        src={images[0]}
                        alt="Post image"
                        className="w-full h-[500px] object-cover rounded-md cursor-pointer border border-black"
                        onClick={(e) => {
                            e.preventDefault()
                            handleImageClick(images[0], 0)
                        }}
                        width={500}
                        height={500}
                    />
                </div>
            )
        }

        if (imageCount === 2) {
            return (
                <div className="grid grid-cols-2 gap-2">
                    {images.map((image, index) => (
                        <div key={index}>
                            <Image
                                src={image}
                                alt={`Post image ${index + 1}`}
                                className="w-full h-[500px] object-cover rounded-md cursor-pointer border border-black"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleImageClick(image, index)
                                }}
                                width={500}
                                height={500}
                            />
                        </div>
                    ))}
                </div>
            )
        }

        if (imageCount === 3) {
            return (
                <div className="grid grid-cols-2 gap-2">
                    <div className="row-span-2">
                        <Image
                            src={images[0]}
                            alt="Post image 1"
                            className="w-full h-[500px] object-cover rounded-md cursor-pointer border border-black"
                            onClick={(e) => {
                                e.preventDefault()
                                handleImageClick(images[0], 0)
                            }}
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="grid grid-rows-2 gap-2">
                        {images.slice(1).map((image, index) => (
                            <Image
                                key={index + 1}
                                src={image}
                                alt={`Post image ${index + 2}`}
                                className="w-full !h-1 object-cover rounded-md cursor-pointer border border-black"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleImageClick(image, index + 1)
                                }}
                                width={250}
                                height={250}
                            />
                        ))}
                    </div>
                </div>
            )
        }

        if (imageCount === 4) {
            return (
                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                    {images.map((image, index) => (
                        <Image
                            key={index + 1}
                            src={image}
                            alt={`Post image ${index + 2}`}
                            className="w-full !h-[200px] object-cover rounded-md cursor-pointer border border-black"
                            onClick={(e) => {
                                e.preventDefault()
                                handleImageClick(image, index)
                            }}
                            width={250}
                            height={250}
                        />
                    ))}
                </div>
            )
        }

        return (
            <div className="grid grid-cols-2 gap-2">
                {images.slice(0, 4).map((image, index) => (
                    <div key={index} className="relative">
                        <Image
                            src={image}
                            alt={`Post image ${index + 1}`}
                            className="w-full h-[500px] object-cover rounded-md cursor-pointer border border-black"
                            onClick={(e) => {
                                e.preventDefault()
                                handleImageClick(image, index)
                            }}
                            width={500}
                            height={500}
                        />
                        {index === 3 && images.length > 4 && (
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleImageClick(images[0], 0)
                                }}
                            >
                                <Text className="text-white text-2xl font-bold">
                                    +{images.length - 4}
                                </Text>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Card className="!w-full mb-4 max-h-[800px] overflow-hidden">
            <Space direction="vertical" size="middle" className="w-full">
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Space direction="vertical" size={0}>
                        <Text strong>{username}</Text>
                        <Text type="secondary" className="text-xs">
                            {formatDistanceToNow(new Date(createdAt), {
                                addSuffix: true,
                            })}{' '}
                            • {audience.toLowerCase()}
                        </Text>
                    </Space>
                </Space>

                {content.description && (
                    <Paragraph className="mb-0">
                        {content.description}
                    </Paragraph>
                )}

                {renderImageGallery()}

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
    )
}

export default PostItem
