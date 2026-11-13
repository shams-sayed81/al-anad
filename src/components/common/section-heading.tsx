import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
  theme?: 'dark' | 'light';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className = '',
}: SectionHeadingProps) {
  const isDark = theme === 'dark';
  const isCenter = align === 'center';

  return (
    <div
      className={`flex flex-col gap-3 ${
        isCenter ? 'items-center text-center' : 'items-start text-start'
      } ${className}`}
    >
      {/* Eyebrow with subtle divider line */}
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-wider uppercase ${
            isDark ? 'text-gold' : 'text-natural'
          }`}
        >
          <span className="w-6 h-px bg-current opacity-60" />
          <span>{eyebrow}</span>
          <span className="w-6 h-px bg-current opacity-60" />
        </div>
      )}

      {/* Main Title */}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-arabic leading-tight ${
          isDark ? 'text-ivory-canvas' : 'text-forest'
        }`}
      >
        {title}
      </h2>

      {/* Subtitle / Lead */}
      {subtitle && (
        <p
          className={`max-w-2xl text-sm md:text-base leading-relaxed ${
            isDark ? 'text-sage-light' : 'text-ink-secondary'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
