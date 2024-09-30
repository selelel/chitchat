import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../commons/form';
import { poppins } from '@/utils/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import { post_form_schema, post_form_types } from '@/lib/schemas/post.form.dto';
import { useCreateNewPostMutation } from '@/lib/features/post/postApi';
import { Alert, Divider } from 'antd';
import { env } from '@/config/env';
import { selectAccessToken } from '@/lib/features/app/appSlice';
import { useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { append_image } from '@/app/actions';

const audience = [
  { value: 'public', label: 'Public' },
  { value: 'friends', label: 'Friends' },
  { value: 'only_me', label: 'Only Me' },
];

function CreatePostForm() {
  const [createdPost, setCreatedPost] = useState<any>(null)
  const { register, handleSubmit, control, formState: { errors }, setError} = useForm({ resolver: yupResolver(post_form_schema) });
  const [createNewPost, { data: createPostData, isLoading: isCreatingPost, error: createPostError }] = useCreateNewPostMutation();
  const token = useAppSelector(selectAccessToken);
const handleCreatePost = async ({ audience, descriptions, file }: post_form_types) => {
    try {
      const response = await createNewPost({
        contentInput: {
          description: descriptions,
        },
        optionInput: {
          audience: audience,
        },
      });

      if (response.data) {
        console.log('Post created:', response.data?.createNewPost?._id);

        if (file.fileList.length > 0) {
          const appendImagePost = await append_image(file, response.data?.createNewPost?._id, token, env.BASE_API_URL)
          console.log(appendImagePost)
          setCreatedPost(appendImagePost)
        }
      }
    } catch (err) {
      console.log(err)
    }
  };
  

  return (
    <Form submit={handleSubmit(handleCreatePost)} className="space-y-2">
      <Form.Title>Create Post</Form.Title>

      {createPostError && (<Alert className={poppins.className} type="error" message={createPostError.message} banner />)}

      <div className="flex flex-col w-fit">
        <Form.Select
          name='audience'
          control={{ control }}
          options={audience}
          defaultValue={'public'}
        />
      </div>

      <div className="flex flex-col w-full">
        <Form.TextArea
          placeholder='What&apos;s on your head...'
          register={register}
          rows={5}
          name="descriptions"
        />
      </div>

      <Divider />

      <Form.Upload control={{control}} name='file'/>

      <Form.Button
        tabIndex={0}
        className="flex flex-row justify-center space-x-1 items-center rounded-md py-5 px-10 cursor-pointer w-fit"
        loading={isCreatingPost}
      >
        <p className='font-semibold text-custom-grey'>Post</p>
      </Form.Button>

      {!!createdPost && (<div>
        <p>{createdPost.content.description}</p>
        {createdPost?.content.images.map((d: string | StaticImport) => <Image src={d} width={250} height={250} alt={String(d)}/>)}

      </div>)}

    </Form>
  );
}

export default CreatePostForm;