'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getGSAP } from '@/lib/gsap';
import { Clock, ShieldCheck, Snowflake } from 'lucide-react';
import { asset } from '@/lib/asset-path';

export function ServicesFleetSection() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('services');

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const truckImgRef = useRef<HTMLDivElement>(null);

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

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        const badges = cardRef.current.querySelectorAll('[data-fleet-badge]');
        if (badges.length) {
          gsap.fromTo(
            badges,
            { opacity: 0, y: 16, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 76%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }

      if (truckImgRef.current) {
        gsap.fromTo(
          truckImgRef.current,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isAr]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-10">
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

          <p className="text-sm sm:text-base text-forest-dark/75 font-medium max-w-2xl">
            {t('subtitle')}
          </p>
        </div>

        {/* Cinematic Fleet Card */}
        <div
          ref={cardRef}
          className="relative rounded-[2rem] bg-forest-dark text-white p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden border border-white/10"
        >
          {/* Background Truck Photography */}
          <div ref={truckImgRef} className="absolute inset-y-0 end-0 w-full sm:w-[58%] lg:w-[54%] pointer-events-none select-none z-0">
            <div className="relative w-full h-full">
              <Image
                src={asset('/images/editorial/fleet_truck_road.jpg')}
                alt={t('fleetImageAlt')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
              {/* Direction-aware gradient fade into card background */}
              <div className="absolute inset-y-0 start-0 w-28 sm:w-48 ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-forest-dark to-transparent pointer-events-none" />
              <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/70 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col justify-between gap-8 max-w-xl">
            {/* Fleet Header Content */}
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-gold uppercase">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span>{t('badge')}</span>
              </span>

              <h3
                className={`text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight ${
                  isAr ? 'font-arabic' : 'font-english'
                }`}
              >
                {t('fleetTitle')}
              </h3>

              <p className="text-sm sm:text-base text-ivory-canvas/85 font-normal leading-relaxed max-w-md">
                {t('fleetDesc')}
              </p>
            </div>

            {/* 3 Cold-Chain Feature Badges */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-5 sm:gap-6 pt-4 border-t border-white/10">
              {/* Badge 1: Punctuality */}
              <div data-fleet-badge className="flex flex-col items-center sm:items-start text-center sm:text-start gap-1.5 group">
                <span className="w-11 h-11 rounded-full border border-gold/40 bg-forest-dark/80 backdrop-blur-sm flex items-center justify-center text-gold group-hover:border-gold group-hover:bg-gold/15 group-hover:scale-105 transition-all duration-300">
                  <Clock className="w-5 h-5" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {t('pillars.punctual.title')}
                </span>
                <span className="text-[11px] text-ivory-canvas/65 font-normal">
                  {t('pillars.punctual.sub')}
                </span>
              </div>

              {/* Divider */}
              <span className="hidden sm:block h-10 w-px bg-white/15" aria-hidden="true" />

              {/* Badge 2: Food Safety */}
              <div data-fleet-badge className="flex flex-col items-center sm:items-start text-center sm:text-start gap-1.5 group">
                <span className="w-11 h-11 rounded-full border border-gold/40 bg-forest-dark/80 backdrop-blur-sm flex items-center justify-center text-gold group-hover:border-gold group-hover:bg-gold/15 group-hover:scale-105 transition-all duration-300">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {t('pillars.safety.title')}
                </span>
                <span className="text-[11px] text-ivory-canvas/65 font-normal">
                  {t('pillars.safety.sub')}
                </span>
              </div>

              {/* Divider */}
              <span className="hidden sm:block h-10 w-px bg-white/15" aria-hidden="true" />

              {/* Badge 3: Ideal Temperature */}
              <div data-fleet-badge className="flex flex-col items-center sm:items-start text-center sm:text-start gap-1.5 group">
                <span className="w-11 h-11 rounded-full border border-gold/40 bg-forest-dark/80 backdrop-blur-sm flex items-center justify-center text-gold group-hover:border-gold group-hover:bg-gold/15 group-hover:scale-105 transition-all duration-300">
                  <Snowflake className="w-5 h-5" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {t('pillars.cooling.title')}
                </span>
                <span className="text-[11px] text-ivory-canvas/65 font-normal">
                  {t('pillars.cooling.sub')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
