'use client';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useLogOutMutation } from '@/lib/features/auth/authApi';
import { useAppDispatch } from '@/lib/hooks';
import { removeAccessToken } from '@/lib/features/app/appSlice';
import { redirect } from 'next/navigation';
import Layout from '@/components/layout/layout';
import { useCreateNewPostMutation } from '@/lib/features/post/postApi';

function HomePage() {
  const [logOut, { data, isLoading }] = useLogOutMutation();
  const [createNewPost, { data: createPostData, isLoading: isCreatingPost, error: createPostError }] = useCreateNewPostMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(data) {
      dispatch(removeAccessToken());
      redirect('/login')
    }
  }, [data, dispatch])

  const handleCreatePost = async () => {
    try {
      const response = await createNewPost({
        contentInput: {
          description: "Sample Description",
        },
        optionInput: {
          audience: "public",
        }
      });

      console.log('Post created:', response?.data?.createNewPost?._id);
    } catch (err) {
      console.error('Error creating post:', createPostError);
    }
  };

  return (
    <Layout>
      <div>
        <Button
          tabIndex={0}
          className="flex flex-row justify-center space-x-1 items-center rounded-md py-5 px-10 cursor-pointer w-fit"
          onClick={() => logOut()}
          loading={isLoading}
        >
          <p className='font-semibold text-custom-grey'>i lag out mo!</p>
        </Button>
        <div>Hinay lang pagpost and message guys, limited yung database natin. frrrrr</div>
        <Button
          tabIndex={0}
          className="flex flex-row justify-center space-x-1 items-center rounded-md py-5 px-10 cursor-pointer w-fit"
          onClick={handleCreatePost}
          loading={isLoading}
        >
          <p className='font-semibold text-custom-grey'>Psot!!!</p>
        </Button>
        {createPostError && <p>Error creating post: {createPostError.message}</p>}
        {createPostData && <p>Post created with ID: {createPostData.createNewPost._id}</p>}
      </div>
    </Layout>
  );
}

export default HomePage;