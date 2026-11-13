import React from 'react';

interface BotanicalLeafProps {
  className?: string;
  size?: number;
  variant?: 'branch' | 'single' | 'contour';
}

export function BotanicalLeaf({
  className = '',
  size = 320,
  variant = 'branch',
}: BotanicalLeafProps) {
  if (variant === 'single') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <path
          d="M20 80C20 80 30 35 75 25C80 40 70 75 20 80Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 78C35 60 55 45 75 25"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 200 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Central Stem */}
      <path
        d="M100 240C95 180 110 120 130 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Top Leaves */}
      <path
        d="M130 10C140 25 155 45 145 60C135 60 120 40 130 10Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Right Leaves */}
      <path
        d="M125 55C150 65 175 90 160 115C145 110 130 85 125 55Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M115 110C145 125 170 155 150 180C135 170 120 140 115 110Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Left Leaves */}
      <path
        d="M122 70C95 75 75 95 85 120C100 115 115 95 122 70Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M110 130C80 140 60 165 70 190C85 185 100 160 110 130Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
