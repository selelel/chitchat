'use client';

import { AppStore, makeStore } from '@/lib/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export function Providers({ children }: { children: React.ReactNode }) {

  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  
  return <Provider store={storeRef.current}>{children}</Provider>;

}

export default Providers;
