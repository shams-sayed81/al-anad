'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getGSAP } from '@/lib/gsap';
import { PARTNERS } from '@/data/partners';

export function PartnersSection() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('clients');

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const row1 = PARTNERS.slice(0, 5);
  const row2 = PARTNERS.slice(5, 10);

  useEffect(() => {
    const { gsap } = getGSAP();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const eyebrowLines = headerRef.current?.querySelectorAll('[data-eyebrow-line]');
      if (eyebrowLines?.length) {
        gsap.fromTo(
          eyebrowLines,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (headerRef.current?.children) {
        gsap.fromTo(
          Array.from(headerRef.current.children),
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.querySelectorAll('.partner-card'),
          { opacity: 0, y: 20, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.055,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isAr]);

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] overflow-hidden border-t border-[#0C2518]/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-2">
          <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-widest text-natural uppercase">
            <span data-eyebrow-line className="w-8 sm:w-12 h-px bg-natural/50 origin-center" />
            <span>{t('eyebrow')}</span>
            <span data-eyebrow-line className="w-8 sm:w-12 h-px bg-natural/50 origin-center" />
          </div>

          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-forest-dark ${
              isAr ? 'font-arabic' : 'font-english'
            }`}
          >
            {t('title')}
          </h2>

          <p className="text-sm sm:text-base text-forest-dark/75 font-medium max-w-xl">
            {t('subtitle')}
          </p>
        </div>

        {/* 10 Partner Logos in 2 Curated Rows (5 Logos Per Row on Desktop) */}
        <div ref={gridRef} className="flex flex-col gap-4 sm:gap-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {row1.map((p) => (
              <div
                key={p.id}
                className="partner-card flex items-center justify-center p-5 sm:p-6 rounded-2xl bg-white/80 hover:bg-white shadow-[0_2px_10px_-2px_rgba(12,37,24,0.04)] hover:shadow-md border border-forest-dark/5 hover:border-gold/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] group"
              >
                <div className="relative w-full h-9 sm:h-11">
                  <Image
                    src={p.logo}
                    alt={isAr && p.nameAr ? p.nameAr : p.name}
                    fill
                    sizes="(max-width: 640px) 120px, 160px"
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {row2.map((p) => (
              <div
                key={p.id}
                className="partner-card flex items-center justify-center p-5 sm:p-6 rounded-2xl bg-white/80 hover:bg-white shadow-[0_2px_10px_-2px_rgba(12,37,24,0.04)] hover:shadow-md border border-forest-dark/5 hover:border-gold/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] group"
              >
                <div className="relative w-full h-9 sm:h-11">
                  <Image
                    src={p.logo}
                    alt={isAr && p.nameAr ? p.nameAr : p.name}
                    fill
                    sizes="(max-width: 640px) 120px, 160px"
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
