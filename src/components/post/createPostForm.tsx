import React from 'react'
import { useForm } from 'react-hook-form'
import Form from '../commons/form';
import { poppins } from '@/utils/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import { post_form_schema, post_form_types } from '@/lib/schemas/post.form.dto';

const audience = [
    { value: "public", label: "Public" },
    { value: "friends", label: "Friends" },
    { value: "only_me", label: "Only Me" },
]

function CreatePostForm() {
    const { register, handleSubmit, control, formState: { errors } } = useForm({resolver: yupResolver(post_form_schema)});

    const handleCreatePost = async ({audience, descriptions}: post_form_types) => {
        console.log({audience, descriptions})
    };

    return (
        <Form submit={handleSubmit(handleCreatePost)} className="space-y-2">
        <Form.Title>Create Post</Form.Title>

        <div className="flex flex-col w-full">
            <Form.TextArea
                placeholder='What&apos;s on your head...'
                register={register}
                rows={5}
                name="descriptions"
            />
        </div>

        <div className="flex flex-col w-fit">
            <Form.Select
                name='audience'
                control={{control}}
                options={audience}
                defaultValue={'public'}
            />
        </div>

        <Form.Button
        className={`w-full sm:w-fit text-md py-5 px-10 font-semibold ${poppins.className}`}
        >
        Post
        </Form.Button>
    </Form>
    )
}

export default CreatePostForm