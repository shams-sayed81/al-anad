'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export function LanguageSwitcher({
  variant = 'dark',
  className = '',
}: {
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const isLight = variant === 'light';

  return (
    <div
      className={`inline-flex items-center text-xs font-semibold ${
        isLight ? 'text-white/80' : 'text-forest/70'
      } ${className}`}
      aria-label="Language switch"
    >
      <Link
        href={pathname}
        locale="ar"
        className={`px-2 py-1 transition-colors ${
          currentLocale === 'ar'
            ? isLight
              ? 'text-white font-bold'
              : 'text-forest font-bold'
            : isLight
            ? 'text-white/65 hover:text-white'
            : 'text-forest/50 hover:text-forest'
        }`}
      >
        العربية
      </Link>
      <span className={isLight ? 'text-white/35' : 'text-forest/30'}>|</span>
      <Link
        href={pathname}
        locale="en"
        className={`px-2 py-1 transition-colors ${
          currentLocale === 'en'
            ? isLight
              ? 'text-white font-bold'
              : 'text-forest font-bold'
            : isLight
            ? 'text-white/65 hover:text-white'
            : 'text-forest/50 hover:text-forest'
        }`}
      >
        EN
      </Link>
    </div>
  );
}
