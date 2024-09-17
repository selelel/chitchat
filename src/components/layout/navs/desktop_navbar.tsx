import React from 'react';
import { usePathname } from 'next/navigation'
import CategoryNav from './category_nav';
import { CameraIcon, ChatIcon, ChitChatLogo, NotificationIcon, ExploreIcon, HomeIcon, MenuIcon, ProfileIcon, SearchIcon } from '@/components/commons/icon';

const categories = [
  { text: 'Home', icon: HomeIcon, href: '/home' },
  { text: 'Search', icon: SearchIcon, href: '/search' },
  { text: 'Chat', icon: ChatIcon, href: '/chat' },
  { text: 'Explore', icon: ExploreIcon, href: '/explore' },
  { text: 'Notifications', icon: NotificationIcon, href: '/notification' },
  { text: 'Post', icon: CameraIcon, href: '/post' },
  { text: 'Profile', icon: ProfileIcon, href: '/profile' },
  { text: 'Menu', icon: MenuIcon, href: '/menu' },
];

export default function DesktopNavBar() {
  const path = usePathname()

  return (
    <div className='flex flex-col h-full space-y-7 overflow-hidden'>
      <ChitChatLogo className="text-2xl pt-3" />

      <nav className="flex flex-col space-y-4">
        {categories.slice(0, 5).map((category, i) => (
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
        text='Menu'
        icon={<MenuIcon boxSize={8} />}
        href='/menu'
        isActive={path.startsWith('/menu')}
      />
      <CategoryNav
        text='Profile'
        icon={<ProfileIcon boxSize={8} />}
        href='/profile/me'
        isActive={path.startsWith('/profile')}
      />
    </div>
  );
}