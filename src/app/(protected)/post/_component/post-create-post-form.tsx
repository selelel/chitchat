import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Form from '@/components/ui/(not-official)-form'
import { poppins } from '@/utils/fonts'
import { yupResolver } from '@hookform/resolvers/yup'
import { post_form_schema, post_form_types } from '@/lib/schemas/post.form.dto'
import {
    useCreateNewPostMutation,
    useGetPostMutation,
} from '@/lib/features/post/postApi'
import { Alert, Divider } from 'antd'
import { selectAccessToken } from '@/lib/features/app/appSlice'
import { useAppSelector } from '@/lib/hooks'
import { append_image } from '@/app/actions'
import PostItem from './post-item'
import { Query } from '@/lib/graphql/graphqlTypes'
import { Button } from '@/components/ui/button'

const audience = [
    { value: 'public', label: 'Public' },
    { value: 'friends', label: 'Friends' },
    { value: 'only_me', label: 'Only Me' },
]

function CreatePostForm() {
    const [createdPostPreviewData, setCreatedPostPreviewData] =
        useState<Query['getPost']>()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ resolver: yupResolver(post_form_schema) })

    const [
        createNewPost,
        { isLoading: isCreatingPost, error: createPostError },
    ] = useCreateNewPostMutation()
    const [getPost] = useGetPostMutation()
    const token = useAppSelector(selectAccessToken)

    const [loadImage, setLoadImage] = useState<
        'no-image' | 'image-uploading' | 'done-image-upload'
    >('no-image')

    const handleCreatePost = async ({
        audience,
        descriptions,
        file,
    }: post_form_types) => {
        if (file?.fileList?.length > 8) {
            alert('Maximum 8 images allowed.')
            return
        }

        try {
            const postResponse = await createNewPost({
                contentInput: { description: descriptions },
                optionInput: { audience },
            })

            const createdPost = postResponse.data?.createNewPost

            if (!createdPost?._id) {
                throw new Error('Post not created successfully.')
            }

            setCreatedPostPreviewData(createdPost)

            if (file?.fileList?.length > 0) {
                setLoadImage('image-uploading')
                await append_image(file, createdPost._id, token)
                setLoadImage('done-image-upload')
            } else {
                setLoadImage('done-image-upload')
            }

            const postWithImages = await getPost(createdPost._id)
            setCreatedPostPreviewData(postWithImages.data?.getPost)
        } catch (err) {
            console.error(err)
            alert('An error occurred while creating the post.')
        }
    }

    return (
        <Form submit={handleSubmit(handleCreatePost)} className="space-y-2">
            <Form.Title>Create Post</Form.Title>

            {createPostError && (
                <Alert
                    className={poppins.className}
                    type="error"
                    message={createPostError.message}
                    banner
                />
            )}

            <div className="flex flex-col w-fit">
                <Form.Select
                    name="audience"
                    control={{ control }}
                    options={audience}
                    defaultValue="public"
                />
            </div>

            <div className="flex flex-col w-full">
                <Form.TextArea
                    placeholder="What's on your mind..."
                    register={register}
                    rows={5}
                    name="descriptions"
                />
            </div>

            <Divider />

            <Form.Upload control={{ control }} name="file" multiple />

            <Form.Button
                tabIndex={0}
                className="flex flex-row justify-center space-x-1 items-center rounded-md py-5 px-10 cursor-pointer w-fit"
            >
                <p className="font-semibold text-custom-grey">Post</p>
            </Form.Button>

            {(isCreatingPost || loadImage === 'image-uploading') && (
                <div className="flex justify-center items-center py-5">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-2 text-blue-500 font-semibold">
                        Posting...
                    </span>
                </div>
            )}

            {loadImage === 'done-image-upload' &&
                createdPostPreviewData?.content && (
                    <PostItem
                        isPreview
                        key={createdPostPreviewData._id}
                        _id={createdPostPreviewData._id}
                        content={createdPostPreviewData.content}
                        audience={createdPostPreviewData.audience || 'public'}
                        createdAt={new Date().toISOString()}
                        updatedAt={new Date().toISOString()}
                        shares={createdPostPreviewData.shares ?? 0}
                        username={
                            createdPostPreviewData.author.user.username ?? ''
                        }
                    />
                )}
        </Form>
    )
}

export default CreatePostForm
