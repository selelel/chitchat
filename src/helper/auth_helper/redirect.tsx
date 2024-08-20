'use client';
import { useAppSelector } from '@/lib/hooks';
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useInvokedRefresh } from './token';
import { selectAccessToken } from '@/lib/features/app/appSlice';

export function useLogInRedirect() {
  const accesstoken = useAppSelector(selectAccessToken)
  useInvokedRefresh()

  useEffect(() => {
    if (!accesstoken) {
      setTimeout(()=>{
        redirect('/auth/login');
      }, 5000)
    }
  }, [accesstoken]);
}

//! AHHHH I DON'T KNOW WHAT I AM DOING!!!!!!!

export function useRedirectIfAuthenticated() {
  useInvokedRefresh()
  const accesstoken = useAppSelector(selectAccessToken)
    useEffect(() => {
      if (accesstoken) {
          redirect('/');
      }
    }, [accesstoken]);
  }
