import React, { ReactNode } from 'react';
import Navigation from './nav/navigation';
import Footer from './footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-cols-10 h-screen space-x-10 *:p-5">
      <header className="col-span-2 row-span-6 border-r border-r-gray-300 h-full">
        <Navigation />
      </header>
      <main className="col-span-5 h-full">{children}</main>
      <section className="h-full col-span-3"><Footer /></section>
    </div>
  );
}
