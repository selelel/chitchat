import type { Metadata } from 'next'
import Link from 'next/link'
import { AlienMonsterPatternBackground } from '../styles/emotion/alien_monster_bg'
import { ChitChatLogo } from '@/components/commons/icon'

export default function IndexPage() {
    return (
        <div className="h-screen grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-11">
            <div className="w-full h-screen col-span-1 sm:col-span-2 lg:col-span-4 p-5 flex flex-col space-y-5 justify-center">
                <ChitChatLogo className="text-3xl pt-3" />
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold">Welcome to ChitChat</h1>
                    <p className="text-lg text-gray-600">
                        Connect, chat, and collaborate with people around the
                        world in real-time.
                    </p>
                    <div className="space-y-4">
                        <Link
                            href="/chat"
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors block text-center"
                        >
                            Start Chatting
                        </Link>
                        <Link
                            href="/signin"
                            className="w-full border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors block text-center"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
            <AlienMonsterPatternBackground className="col-span-0 sm:col-span-2 lg:col-span-7 md:block" />
        </div>
    )
}

export const metadata: Metadata = {
    title: 'ChitChat - Real-time Chat Application',
    description:
        'Connect and chat with people around the world in real-time with ChitChat.',
}
