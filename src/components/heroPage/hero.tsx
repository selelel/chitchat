'use client'

import { Button } from 'antd'
import React, { useEffect } from 'react'
import { GoogleIcon } from '../commons/icon/SocialMedia'
import { poppins } from '@/layouts/fonts'
import { useLogInRedirect } from '@/helper/auth_helper/redirect'
import { useLogOutMutation } from '@/modules/auth/authApi'
import { useAppDispatch } from '@/lib/hooks'
import { removeAccessToken } from '@/lib/features/app/appSlice'
import { redirect } from 'next/navigation'


function Hero() {
  useLogInRedirect()
  const [logOut, { data }] = useLogOutMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(data) {
      dispatch(removeAccessToken())
      redirect('/auth/login')
    }
  }, [dispatch, data])

  const handleLogout = () => {
    logOut()
  }

    return (
      <>
      <Button
          tabIndex={0}
          className="flex flex-row justify-center space-x-1 items-center w-full rounded-md py-5 px-10 cursor-pointer"
          onClick={handleLogout}
          >
          <GoogleIcon boxSize={4} />
          <p className={`font-semibold text-custom-grey ${poppins.className}`}>Google Log Out</p>
        </Button>
      <div>ChitChat</div>
      </>
        
  ) 
}

export default Hero