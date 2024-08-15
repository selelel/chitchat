'use client'

import { Button } from 'antd'
import React from 'react'
import { GoogleIcon } from '../commons/icon/SocialMedia'
import { poppins } from '@/layouts/fonts'
import { handleLogout } from '@/helper/auth_helper/sign_user'


function Hero() {
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