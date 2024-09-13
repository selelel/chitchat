import React, { useMemo, useEffect, useState } from 'react';
import { ChitChatLogo } from '../../commons/commons';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { HomeIcon } from '../../commons/icon/HomeIcon';
import { SearchIcon } from '../../commons/icon/SearchIcon';
import { ChatIcon } from '../../commons/icon/ChatIcon';
import { ExportIcon } from '../../commons/icon/ExploreIcon';
import { NotificationIcon } from '../../commons/icon/NotificatonIcon';
import { CameraIcon } from '../../commons/icon/CameraIcon';
import { ProfileIcon } from '../../commons/icon/ProfileIcon';
import { MenuIcon } from '../../commons/icon/MenuIcon';

function Navigation() {
  const categories = [
    { text: "Home", icon: <HomeIcon boxSize={8} />, href: '/' },
    { text: "Search", icon: <SearchIcon boxSize={8} />, href: '/search' },
    { text: "Chat", icon: <ChatIcon boxSize={8} />, href: '/chat' },
    { text: "Explore", icon: <ExportIcon boxSize={8} />, href: '/explore' },
    { text: "Notifications", icon: <NotificationIcon boxSize={8} />, href: '/notification' },
    { text: "Post", icon: <CameraIcon boxSize={8} />, href: '/post' },
  ].map(data => <CategoryNav {...data} />)

  return (
    <div className='flex flex-col h-full space-y-7'>
      <ChitChatLogo className="text-2xl pt-3" />
      <section className='space-y-3'>
      {categories}
      </section>
      <CategoryNav text="Profile" icon={<ProfileIcon boxSize={8}/>} href={'/profile'} />
      <CategoryNav text="Menu" icon={<MenuIcon className="pt-1" boxSize={8}/>} href={'/menu'} />
    </div>
  );
}

interface CategoryNavProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  href: string;
}

const user_selects = cva('flex space-x-2 items-end text-md active:opacity-50 duration-100', {
  variants: {
    isSelected: {
      true: 'font-semibold',
    },
  },
});

function CategoryNav({ text, icon, className, href, ...props }: CategoryNavProps) {
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname);
    }
  }, []);

  const isSelected = useMemo(() => {
    return !!path && href.split('/')[1] === path.split('/')[1];
  }, [href, path]);

  return <Link className={user_selects({ isSelected, className })} {...props} href={href}>{icon} <p>{text}</p></Link>
}

export default Navigation;