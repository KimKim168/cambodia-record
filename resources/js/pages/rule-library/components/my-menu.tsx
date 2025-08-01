'use client';

import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { AlignLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

const menuItems = [
  { id: 1, name: 'Home', link: '/' },
  { id: 2, name: 'About', link: '/about' },
  { id: 3, name: 'Collections', link: '/collections' },
  { id: 4, name: 'Resources', link: '/resources' },
  { id: 5, name: 'Databases', link: '/databases' },
  { id: 6, name: 'Contact Us', link: '/contact_us' },
];

const MyMenu = () => {
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname);
    }
  }, []);

  const getLinkClass = (linkPath: string) =>
    linkPath === activePath
      ? 'text-yellow-400 font-semibold underline underline-offset-4'
      : 'hover:text-yellow-300 hover:underline hover:underline-offset-4 transition';

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden xl:block py-3">
        <ul className="flex justify-center items-center space-x-4 text-base text-white">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className={`${
                index !== menuItems.length - 1 ? 'border-r pr-4 border-white' : ''
              }`}
            >
              <Link href={item.link} className={getLinkClass(item.link)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu */}
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <AlignLeft
              className="bg-white border-2 rounded-md"
              width={35}
              height={35}
              aria-label="Toggle menu"
            />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className='text-start'>
              <SheetTitle className='text-center'>Menu</SheetTitle>
              <ul className="flex flex-col justify-center space-y-4 text-black mt-4">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <Link href={item.link} className={getLinkClass(item.link)}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MyMenu;
