'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const url_params = new URLSearchParams(window.location.search);
    const [token, id] = [url_params.get('token') || undefined, url_params.get('user_id') || undefined]
    console.log(token, id)

    window.location.href = '/';
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Callback;
