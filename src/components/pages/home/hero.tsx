'use client';

import { Button } from 'antd';
import React, { useEffect } from 'react';
import { GoogleIcon } from '../../commons/icon/SocialMedia';
import { useLogOutMutation } from '@/modules/auth/authApi';
import { useAppDispatch } from '@/lib/hooks';
import { removeAccessToken } from '@/lib/features/app/appSlice';
import { redirect } from 'next/navigation';

function Hero() {
  const [logOut, { data, isLoading }] = useLogOutMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let countdown = 5;
    const intervalId = setInterval(() => {
      console.log(countdown);
      countdown -= 1;
      if (countdown < 0) {
        clearInterval(intervalId);
        console.log('Accesstoken is expired');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    if(data) {
      dispatch(removeAccessToken());
      redirect('/auth/login')
    }
  }, [data, dispatch])

  return (
    <>
      <Button
        tabIndex={0}
        className="flex flex-row justify-center space-x-1 items-center w-full rounded-md py-5 px-10 cursor-pointer"
        onClick={() => logOut()}
        loading={isLoading}
      >
        <GoogleIcon boxSize={4} />
        <p className='font-semibold text-custom-grey'>Google Log Out</p>
      </Button>
      <div>ChitChat</div>
    </>
  );
}

export default Hero;