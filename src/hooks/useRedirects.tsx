'use client';
import { LOCALSTORAGE } from '@/constants/localstorage'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

export function useLogInRedirect() {
    useEffect(() => {
        (() => {
            const tkn = localStorage.getItem(LOCALSTORAGE.TOKEN)
            if(!(!!tkn)){
                redirect('/login')
            }
        })() 
    }, [])
}

export function useRedirectIfAuthenticated() {
    useEffect(() => {
      const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
      if (token) {
        redirect('/');
      }
    }, []);
  }
