import React from 'react';
import { useLocale } from 'next-intl';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'pill-forest' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isRtl?: boolean;
  icon?: React.ReactNode;
  showArrow?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'pill-forest',
  size = 'md',
  isRtl,
  icon,
  showArrow = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  let locale = 'ar';
  try {
    locale = useLocale();
  } catch {
    // fallback if called outside NextIntl provider
  }
  const isRtlResolved = isRtl !== undefined ? isRtl : locale === 'ar';
  const Arrow = isRtlResolved ? ArrowLeft : ArrowRight;

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 gap-2',
    md: 'text-sm px-5 py-2.5 gap-2.5',
    lg: 'text-base px-7 py-3.5 gap-3',
  };

  const variantClasses = {
    'pill-forest':
      'bg-forest text-ivory hover:bg-forest-light active:bg-forest-dark shadow-editorial transition-all duration-300 font-semibold rounded-full inline-flex items-center',
    gold:
      'bg-gold text-forest-dark hover:bg-gold-light active:bg-gold-dark shadow-editorial transition-all duration-300 font-bold rounded-full inline-flex items-center',
    outline:
      'border border-forest/20 text-forest hover:border-forest hover:bg-forest/5 active:bg-forest/10 transition-all duration-300 font-semibold rounded-full inline-flex items-center',
    ghost:
      'text-forest hover:bg-forest/5 active:bg-forest/10 transition-colors font-medium rounded-full inline-flex items-center',
  };

  return (
    <button
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${
            variant === 'pill-forest'
              ? 'bg-gold text-forest-dark'
              : variant === 'gold'
              ? 'bg-forest text-gold'
              : 'bg-forest/10 text-forest'
          }`}
        >
          <Arrow className="w-3.5 h-3.5" />
        </span>
      )}
    </button>
  );
}
