import React from 'react'
import { usePathname } from 'next/navigation'
import CategoryNav from './category_nav'
import {
    CameraIcon,
    ChatIcon,
    ChitChatLogo,
    NotificationIcon,
    ExploreIcon,
    HomeIcon,
    MenuIcon,
    ProfileIcon,
    SearchIcon,
} from '@/components/commons/icon'
import pathsConfig from '@/config/pathConfig'
import ProfileButton from './profile-button'

const categories = [
    { text: 'Home', icon: HomeIcon, href: pathsConfig.dashboard.home },
    { text: 'Search', icon: SearchIcon, href: pathsConfig.dashboard.search },
    { text: 'Chat', icon: ChatIcon, href: pathsConfig.dashboard.chat },
    { text: 'Explore', icon: ExploreIcon, href: pathsConfig.dashboard.explore },
    {
        text: 'Notifications',
        icon: NotificationIcon,
        href: pathsConfig.dashboard.notification,
    },
    { text: 'Post', icon: CameraIcon, href: pathsConfig.dashboard.post },
    { text: 'Profile', icon: ProfileIcon, href: pathsConfig.dashboard.profile },
    { text: 'Menu', icon: MenuIcon, href: pathsConfig.dashboard.menu },
]

export default function DesktopNavBar() {
    const path = usePathname()

    return (
        <div className="flex flex-col h-full space-y-7 overflow-hidden">
            <ChitChatLogo className="text-2xl pt-3" />

            <nav className="flex flex-col space-y-4">
                {categories.slice(0, 6).map((category, i) => (
                    <CategoryNav
                        key={i}
                        text={category.text}
                        icon={<category.icon boxSize={8} />}
                        href={category.href}
                        isActive={path.startsWith(category.href)}
                    />
                ))}
            </nav>
            <CategoryNav
                text="Menu"
                icon={<MenuIcon boxSize={8} />}
                href="/menu"
                isActive={path.startsWith('/menu')}
            />
            <ProfileButton />
        </div>
    )
}
