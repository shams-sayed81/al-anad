import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { CuratedProduct } from '@/data/curated-products';
import { asset } from '@/lib/asset-path';

interface ProductCardProps {
  product: CuratedProduct;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const name = isAr ? product.nameAr : product.nameEn;
  const categoryLabel = isAr ? product.categoryLabelAr : product.categoryLabelEn;

  return (
    <article
      className={`group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] w-full shadow-[0_12px_32px_-8px_rgba(24,61,43,0.12)] transition-all duration-500 hover:shadow-[0_20px_48px_-10px_rgba(24,61,43,0.22)] hover:-translate-y-2 flex flex-col justify-between p-6 ${className}`}
    >
      {/* 1. Full-Bleed High-Quality Macro Photography */}
      <div className="absolute inset-0 z-0 bg-forest-dark">
        <Image
          src={asset(product.image)}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />
        {/* Editorial Atmospheric Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/25 to-forest-dark/10" />
      </div>

      {/* 2. Top Bar: Category Pill */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-ivory bg-forest-dark/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
          {categoryLabel}
        </span>
        <span className="w-2 h-2 rounded-full bg-gold" />
      </div>

      {/* 3. Bottom Text Overlaid Directly on Visual Canvas */}
      <div className="relative z-10 flex flex-col gap-1.5 text-ivory">
        <h3 className="font-arabic font-extrabold text-xl sm:text-2xl text-white group-hover:text-gold-light transition-colors leading-tight">
          {name}
        </h3>
        <p className="text-xs text-sage-light/90 font-medium">
          {isAr ? 'محصول طازج مختار بعناية' : 'Specially harvested fresh produce'}
        </p>
      </div>
    </article>
  );
}
