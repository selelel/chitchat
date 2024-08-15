import { Layout as LY } from 'antd'
import React, { ReactNode } from 'react'

export default function Layout({ children } : { children: ReactNode } ) {
  return (
    <LY className='h-screen'>{children}</LY>
  )
}

