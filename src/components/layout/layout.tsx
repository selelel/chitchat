'use client'
import React, { ReactNode, useEffect } from 'react'
import Footer from './footer'
// import Navigation from './navBar';
import NavBar from './navBar'
import { Main } from '../commons/commons'
import { useAppDispatch } from '@/lib/hooks'
import { ServerStatus } from '@/lib/features/app/appSlice'

interface LayoutProps {
    children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(ServerStatus())
    }, [dispatch])

    return (
        <div className="grid grid-cols-10 h-screen space-x-10 *:p-5">
            <header className="col-span-2 row-span-6 border-r border-r-gray-300 h-full">
                <NavBar />
            </header>
            <Main className="col-span-5 h-screen">{children}</Main>
            <section className="h-full col-span-3">
                <Footer />
            </section>
        </div>
    )
}
