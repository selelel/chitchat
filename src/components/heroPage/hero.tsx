'use client'

import { Button } from 'antd'
import React from 'react'
import { GoogleIcon } from '../commons/icon/SocialMedia'
import { poppins } from '@/layouts/fonts'
import { LOCALSTORAGE } from '@/constants/localstorage'


function Hero() {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/google/logout', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGE.TOKEN)}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Logout failed');
      }

      localStorage.removeItem(LOCALSTORAGE.TOKEN)
    } catch (error) {
      console.error('Logout error:', error);
    }
    window.location.href = '/auth/login';
  };

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