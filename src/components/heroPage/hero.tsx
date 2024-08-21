'use client';

import { Button } from 'antd';
import React from 'react';
import { GoogleIcon } from '../commons/icon/SocialMedia';
import { useLogOutMutation } from '@/modules/auth/authApi';
import { useAppDispatch } from '@/lib/hooks';
import { removeAccessToken } from '@/lib/features/app/appSlice';
import { useRouter } from 'next/navigation';

function Hero() {
  const [logOut, { isSuccess, error, isLoading }] = useLogOutMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      dispatch(removeAccessToken());
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <>
      <Button
        tabIndex={0}
        className="flex flex-row justify-center space-x-1 items-center w-full rounded-md py-5 px-10 cursor-pointer"
        onClick={handleLogout}
        loading={isLoading} // Show loading spinner while logging out
      >
        <GoogleIcon boxSize={4} />
        <p className='font-semibold text-custom-grey'>Google Log Out</p>
      </Button>
      <div>ChitChat</div>
    </>
  );
}

export default Hero;