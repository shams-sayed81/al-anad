'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { PARTNERS } from '@/data/partners';

export function PartnersMarquee() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const sectors = [
    { titleAr: 'تطبيقات التوصيل السريع', titleEn: 'Quick Delivery Apps' },
    { titleAr: 'سلاسل الهايبر ماركت الكبرى', titleEn: 'Hypermarket Chains' },
    { titleAr: 'الفنادق والمطاعم الراقية', titleEn: 'Hospitality & Dining' },
    { titleAr: 'شركات الإعاشة والتموين', titleEn: 'Institutional Catering' },
  ];

  return (
    <section id="partners" className="py-16 md:py-20 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-wider text-natural uppercase">
            <span>{isAr ? 'شركاؤنا وعملاؤنا' : 'Partners & Clients'}</span>
            <span className="w-12 h-px bg-natural/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-arabic text-forest">
            {isAr
              ? 'نخدم كبرى المنشآت والمنصات في المملكة'
              : 'Serving Leading Enterprises and Platforms in Saudi Arabia'}
          </h2>
        </div>

        {/* Minimalist Sector Row (No Heavy Cards) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-forest font-semibold">
          {sectors.map((sec, idx) => (
            <React.Fragment key={idx}>
              <span className="px-4 py-2 rounded-full bg-[#F3F0E6] text-forest">
                {isAr ? sec.titleAr : sec.titleEn}
              </span>
              {idx < sectors.length - 1 && (
                <span className="hidden sm:inline-block text-forest/20">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Clean Borderless Monochrome Partner Logoscape */}
        <div className="relative overflow-hidden w-full py-6">
          <div className="flex items-center gap-12 sm:gap-16 animate-marquee whitespace-nowrap">
            {PARTNERS.concat(PARTNERS).map((p, idx) => (
              <div
                key={`${p.id}-${idx}`}
                className="flex-shrink-0 flex items-center justify-center transition-all duration-300 opacity-65 hover:opacity-100 hover:scale-105"
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={110}
                  height={48}
                  className="max-h-9 sm:max-h-11 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
