import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
}

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const isLight = variant === 'light';

  return (
    <Link href="/" className={`inline-flex items-center transition-transform duration-300 hover:scale-[1.02] ${className}`}>
      <div className="relative h-10 w-44 md:h-12 md:w-52">
        <Image
          src={isLight ? '/brand/al_anad_master_logo_light.png' : '/brand/al_anad_master_logo_transparent.png'}
          alt="Al Anad National - العناد الوطنية"
          fill
          priority
          sizes="(max-width: 768px) 176px, 208px"
          className="object-contain ltr:object-left rtl:object-right"
        />
      </div>
    </Link>
  );
}
