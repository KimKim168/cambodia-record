import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { MySearchProducts } from '../my-search-products';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Logo } from './logo';
import { MyNavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';
import { usePage } from '@inertiajs/react';
import MySearch from '../my-search';
import ToggleModeSwitch from '../toggle-mode-switch';
import Switch from '../news-component/my-switch';

const NavbarPage = () => {
  const { application_info } = usePage().props;
  const headerRef = useRef(null);
  const sentinelRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: [1] }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Sentinel to detect when scrolling past */}

      <nav
        ref={headerRef}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out backdrop-blur-md 
          bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700`}
      >
      <div ref={sentinelRef} />
        <div className="mx-auto flex xl:h-28 max-w-screen-2xl items-center justify-between px-4 xl:px-16">
          <Logo application_info={application_info} />
          {/* Desktop Menu */}
          <MyNavMenu className="hidden md:block" />
            {/* <ToggleModeSwitch/> */}
          {/* Mobile Menu */}
          <div className="xl:hidden flex items-center gap-2 xl:gap-4">
            <Switch/>
            <MySearch/>
            <NavigationSheet />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarPage;
