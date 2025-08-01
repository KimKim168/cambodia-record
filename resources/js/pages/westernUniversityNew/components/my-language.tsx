import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';

const languages = [
  {
    value: 'en',
    label: 'English',
    flag: '/assets/icons/english.png',
  },
  {
    value: 'kh',
    label: 'Khmer',
    flag: '/assets/demo-images/kh.png',

  },
];

export function MyLanguage() {
  const { locale } = usePage().props;
  const [value, setValue] = useState(locale || 'en');
  return (
    <div className="flex gap-3">
      {languages.map((lang) => (
        <Link key={lang.value} href={`/lang/${lang.value}`}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setValue(lang.value)}
            className={`p-1 border-2 transition-all ${
              value === lang.value
                ? 'border-red-500'
                : 'border-transparent'
            } hover:border-red-500`}
          >
            <img
              src={lang.flag}
              alt={lang.label}
              className="h-full w-full rounded-full object-cover"
            />
          </Button>
        </Link>
      ))}
    </div>
  );
}
