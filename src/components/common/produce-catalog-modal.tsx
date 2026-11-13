'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { X, Search, Sprout, Leaf, Apple, LayoutGrid, ArrowLeft, ArrowRight } from 'lucide-react';
import { PRODUCTS, type ProductCategory } from '@/data/products';
import { matchesQuery } from '@/lib/arabic-search';
import { asset } from '@/lib/asset-path';

interface ProduceCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: 'all' | ProductCategory;
  onRequestQuote?: (productName?: string) => void;
}

export function ProduceCatalogModal({
  isOpen,
  onClose,
  initialCategory = 'all',
  onRequestQuote,
}: ProduceCatalogModalProps) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('products');
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [category, setCategory] = useState<'all' | ProductCategory>(initialCategory);
  const [query, setQuery] = useState('');
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCategory(initialCategory);
    }
  }, [isOpen, initialCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      if (isOpen) {
        previousFocusRef.current?.focus();
      }
    };
  }, [isOpen, onClose]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const catMatch = category === 'all' || item.category === category;
      const textMatch = matchesQuery(query, item.nameAr, item.nameEn, item.slug);
      return catMatch && textMatch;
    });
  }, [category, query]);

  if (!isOpen) return null;

  const categories: Array<{
    key: 'all' | ProductCategory;
    label: string;
    count: number;
    icon: React.ReactNode;
  }> = [
    { key: 'all', label: t('categories.all'), count: PRODUCTS.length, icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { key: 'veg', label: t('categories.veg'), count: PRODUCTS.filter((p) => p.category === 'veg').length, icon: <Sprout className="w-3.5 h-3.5" /> },
    { key: 'leaf', label: t('categories.leaf'), count: PRODUCTS.filter((p) => p.category === 'leaf').length, icon: <Leaf className="w-3.5 h-3.5" /> },
    { key: 'fruit', label: t('categories.fruit'), count: PRODUCTS.filter((p) => p.category === 'fruit').length, icon: <Apple className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalog-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-modal-backdrop"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-5xl bg-ivory-canvas text-forest rounded-3xl shadow-2xl border border-forest/10 max-h-[90vh] flex flex-col overflow-hidden animate-modal-panel"
      >
        {/* Sticky Header */}
        <div className="p-5 sm:p-7 pb-4 border-b border-forest/10 bg-ivory-canvas flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-natural">
                {t('eyebrow')} · {filteredProducts.length} {t('countBadge')}
              </span>
              <h3
                id="catalog-modal-title"
                className={`text-xl sm:text-2xl lg:text-3xl font-black text-forest-dark ${
                  isAr ? 'font-arabic' : 'font-english'
                }`}
              >
                {t('title')}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={isAr ? 'إغلاق' : 'Close'}
              className="p-2 rounded-full bg-forest/5 hover:bg-forest/10 text-forest transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Category Filters */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-forest/45 absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full ps-10 pe-9 py-2.5 rounded-full bg-white border border-forest/15 focus:border-forest focus:ring-1 focus:ring-forest outline-none text-xs sm:text-sm text-forest placeholder:text-forest/40 transition"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={isAr ? 'مسح البحث' : 'Clear search'}
                  className="absolute top-1/2 -translate-y-1/2 end-3 text-forest/45 hover:text-forest"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {categories.map((cat) => {
                const active = category === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setCategory(cat.key)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                      active
                        ? 'bg-[#183D2B] text-white shadow-sm'
                        : 'bg-white text-forest/75 border border-forest/10 hover:border-forest/30 hover:text-forest'
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-forest/5 text-forest/60'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrollable Products Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7" data-lenis-prevent>
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center gap-3 text-forest/60">
              <Search className="w-10 h-10 opacity-30" />
              <p className="text-sm font-semibold">{t('noResults')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    if (onRequestQuote) {
                      onClose();
                      onRequestQuote(isAr ? product.nameAr : product.nameEn);
                    }
                  }}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-[#0C2518]/10 shadow-sm hover:shadow-lg hover:border-[#CCA35B]/50 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3F0E6]">
                    <Image
                      src={asset(product.image)}
                      alt={isAr ? product.nameAr : product.nameEn}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-2.5 sm:p-3 flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#0C2518] truncate">
                      {isAr ? product.nameAr : product.nameEn}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-[#FAF8F3] group-hover:bg-[#CCA35B] text-forest/50 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <Arrow className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note & Bulk Quote CTA */}
        <div className="px-5 sm:px-7 py-4 border-t border-forest/10 bg-[#F3F0E6]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-forest/70">
          <p className="text-center sm:text-start">{t('note')}</p>
          {onRequestQuote && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestQuote();
              }}
              className="inline-flex items-center gap-2 bg-[#183D2B] hover:bg-[#23553D] text-white font-bold px-4 py-2 rounded-full text-xs whitespace-nowrap transition-colors shadow-sm"
            >
              <span>{isAr ? 'طلب عرض سعر للجملة' : 'Request Wholesale Quote'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
