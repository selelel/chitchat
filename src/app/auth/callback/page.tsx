'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LOCALSTORAGE } from '@/constants/localstorage';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');

    if (token) {
      localStorage.setItem(LOCALSTORAGE.TOKEN, token);
      router.push('/');
    }
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Callback;
