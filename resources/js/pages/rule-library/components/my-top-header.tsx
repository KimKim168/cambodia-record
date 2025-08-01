import { Phone, User } from 'lucide-react';
import { MyLanguageSwitcher } from './my-language-switcher';

const MyTopHeader = () => {
  return (
    <div className="bg-white mt-1 px-4 sm:px-6 md:px-10 xl:px-20">
      <div className="flex flex-wrap items-center justify-end gap-2 text-sm text-gray-700 max-w-screen-2xl mx-auto">
        {/* Left Section (Language Switcher) */}
        <div className="flex-shrink-0">
          <MyLanguageSwitcher />
        </div>

        {/* Right Section (Phone + Login) */}
        <div className="flex flex-wrap items-center gap-3 justify-end min-w-0">
          <div className="flex items-center gap-1">
            <Phone size={16} />
            <span className="truncate">010 775589</span>
          </div>

          <div className="flex items-center gap-1">
            <User size={18} />
            <a href="#" className="hover:underline whitespace-nowrap">
              Patron Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTopHeader;
