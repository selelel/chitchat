import React, { ReactNode } from 'react'
import Footer from '../../../../components/layout/footer'
// import Navigation from './navBar';
import NavBar from '../../../../components/layout/navBar'
import { Main } from '../../../../components/commons/commons'
import AllChat from './chat-all-chat'

interface LayoutProps {
    children?: ReactNode
}

export default function ChatLayout({ children }: LayoutProps) {
    return (
        <div className="grid grid-cols-10 h-screen space-x-10 *:p-5">
            <header className="col-span-2 row-span-6 border-r border-r-gray-300 h-full">
                <AllChat />
            </header>
            <Main className="col-span-5 h-screen">{children}</Main>
            {/* <section className="h-full">
                <Footer />
            </section> */}
        </div>
    )
}
