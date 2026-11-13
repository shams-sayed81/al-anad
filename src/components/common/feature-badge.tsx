import React from 'react';
import { Leaf, Truck, ShieldCheck, LucideIcon } from 'lucide-react';

export type FeatureType = 'farms' | 'network' | 'quality';

interface FeatureBadgeProps {
  type: FeatureType;
  title: string;
  className?: string;
}

const icons: Record<FeatureType, LucideIcon> = {
  farms: Leaf,
  network: Truck,
  quality: ShieldCheck,
};

export function FeatureBadge({ type, title, className = '' }: FeatureBadgeProps) {
  const Icon = icons[type];

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-ivory/80 border border-subtle shadow-editorial-sm transition-all duration-300 hover:border-natural/30 hover:bg-ivory ${className}`}
    >
      <div className="w-10 h-10 rounded-xl bg-forest/5 text-forest flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-natural" />
      </div>
      <span className="text-xs sm:text-sm font-bold text-forest leading-snug">
        {title}
      </span>
    </div>
  );
}
