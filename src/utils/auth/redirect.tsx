'use client';

import { useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { selectAccessToken } from '@/lib/features/app/appSlice';

const protectedRoutes = ['/', '/chat', '/explore', '/notification', '/profile/me', '/menu'];

export function useRedirectIfUnauthenticated() {
  const accesstoken = useAppSelector(selectAccessToken);
  const pathname = usePathname();

  useEffect(() => {
    if (!accesstoken && protectedRoutes.includes(pathname)) {
      redirect('/login');
    }
  }, [accesstoken, pathname]);
}

export function useRedirectIfAuthenticated() {
  const accesstoken = useAppSelector(selectAccessToken);

  useEffect(() => {
    if (accesstoken) {
      redirect('/');
    }
  }, [accesstoken]);
}
