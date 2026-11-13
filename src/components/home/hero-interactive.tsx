'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getGSAP } from '@/lib/gsap';
import { useLenis } from '@/lib/lenis-provider';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export function HeroInteractive() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('hero');
  const { scrollTo } = useLenis();
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const { gsap } = getGSAP();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const eyebrowLines = eyebrowRef.current?.querySelectorAll('[data-hero-line]');

      if (eyebrowLines?.length) {
        tl.fromTo(
          eyebrowLines,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.05 },
          0
        );
      }

      tl.fromTo(
        eyebrowRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        0.08
      )
        .fromTo(
          titleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          '-=0.45'
        )
        .fromTo(
          leadRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.1 },
          '-=0.4'
        )
        .fromTo(
          statsRef.current?.children ? Array.from(statsRef.current.children) : [],
          { y: 14, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.08 },
          '-=0.3'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.2'
        );

      // Smooth count-up for hero stat counters
      const counterEls = statsRef.current?.querySelectorAll<HTMLElement>('[data-count-to]');
      counterEls?.forEach((el) => {
        const target = Number(el.dataset.countTo || 0);
        const prefix = el.dataset.countPrefix || '';
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.2,
          delay: 0.45,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(counter.val)}`;
          },
        });
      });

      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.06, yPercent: 0 },
          {
            scale: 1.06,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isAr]);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollTo(id, { offset: -70 });
  };

  return (
    <>
      <section
        id="hero"
        ref={containerRef}
        className="relative min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] xl:min-h-[700px] flex items-center pt-24 sm:pt-28 pb-10 overflow-hidden bg-ivory-canvas"
      >
        {/* Full-bleed Panoramic Background Landscape (Ultra-HD master photography) */}
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none select-none z-0"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/hero/hero_master_fa1a5da8.jpg"
              alt={t('imageAlt')}
              fill
              priority
              sizes="100vw"
              className="object-cover object-right sm:object-[80%_center] lg:object-right"
            />
            {/* Balanced cinematic scrim for crisp readability across centered composition */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.34)_55%,rgba(0,0,0,0.18)_100%)] pointer-events-none z-[1]" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/65 via-black/25 to-transparent pointer-events-none z-[1]" />
          </div>
        </div>

        {/* Content Container (Centered, balanced editorial focal composition) */}
        <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-4 sm:gap-5">
            {/* Eyebrow - Warm sunrise amber gold */}
            <div
              ref={eyebrowRef}
              className="flex items-center justify-center gap-3 text-[11px] sm:text-xs font-bold tracking-[0.16em] text-gold-light uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
            >
              <span data-hero-line className="w-8 sm:w-12 h-[1.5px] bg-gold-light/80 origin-center" />
              <span>{t('eyebrow')}</span>
              <span data-hero-line className="w-8 sm:w-12 h-[1.5px] bg-gold-light/80 origin-center" />
            </div>

            {/* Main Title / Focal Point - Pure radiant white */}
            <h1
              ref={titleRef}
              className={`text-4xl sm:text-5xl lg:text-[60px] xl:text-[66px] font-black tracking-tight leading-[1.15] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)] ${
                isAr ? 'font-arabic' : 'font-english'
              }`}
            >
              {t('title')}
            </h1>

            {/* Subtitle / Lead Paragraph - Luminous ivory white */}
            <p
              ref={leadRef}
              className="text-sm sm:text-base lg:text-lg text-white/95 font-medium leading-relaxed max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]"
            >
              {t('lead')}
            </p>

            {/* Dual CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-3 pt-1">
              {/* Primary Gold CTA */}
              <a
                href="#products"
                onClick={(e) => handleScrollTo(e, '#products')}
                className="group inline-flex items-center gap-3 bg-gold-dark hover:bg-gold active:bg-gold-dark text-white text-xs sm:text-sm font-bold ps-5 pe-2 py-2.5 rounded-full shadow-[0_8px_24px_-4px_rgba(188,143,71,0.55)] transition-all duration-300 hover:scale-[1.03]"
              >
                <span>{t('ctaProducts')}</span>
                <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-transform duration-300 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                  <Arrow className="w-3.5 h-3.5" />
                </span>
              </a>

              {/* Secondary Frosted Glass CTA */}
              <a
                href="#about"
                onClick={(e) => handleScrollTo(e, '#about')}
                className="group inline-flex items-center gap-2.5 bg-white/15 hover:bg-white/25 border border-white/40 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full backdrop-blur-md shadow-md transition-all duration-300 hover:border-white/70 hover:scale-[1.03]"
              >
                <span className="w-5 h-5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white">
                  <ArrowDown className="w-3 h-3" />
                </span>
                <span>{t('ctaStory')}</span>
              </a>
            </div>

            {/* Clean Editorial Typographic Proof-Points (Zero Glass Capsules, Pure Hierarchy) */}
            <div
              ref={statsRef}
              className="flex items-center justify-center gap-6 sm:gap-10 md:gap-12 pt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
            >
              {/* Stat 1: 35 Local Farms */}
              <div className="flex flex-col items-center text-center">
                <span
                  data-count-to="35"
                  className={`text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight ${
                    isAr ? 'font-arabic' : 'font-english'
                  }`}
                  dir="ltr"
                >
                  {t('stats.farms.value')}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-white/85 mt-1 tracking-wide">
                  {t('stats.farms.label')}
                </span>
              </div>

              {/* Elegant Hairline Divider */}
              <span className="h-8 w-px bg-white/25" aria-hidden="true" />

              {/* Stat 2: +15 Refrigerated Fleet */}
              <div className="flex flex-col items-center text-center">
                <span
                  data-count-to="15"
                  data-count-prefix="+"
                  className={`text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight ${
                    isAr ? 'font-arabic' : 'font-english'
                  }`}
                  dir="ltr"
                >
                  {t('stats.fleet.value')}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-white/85 mt-1 tracking-wide">
                  {t('stats.fleet.label')}
                </span>
              </div>

              {/* Elegant Hairline Divider */}
              <span className="h-8 w-px bg-white/25" aria-hidden="true" />

              {/* Stat 3: +19 Years Experience */}
              <div className="flex flex-col items-center text-center">
                <span
                  data-count-to="19"
                  data-count-prefix="+"
                  className={`text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight ${
                    isAr ? 'font-arabic' : 'font-english'
                  }`}
                  dir="ltr"
                >
                  {t('stats.years.value')}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-white/85 mt-1 tracking-wide">
                  {t('stats.years.label')}
                </span>
              </div>
            </div>

            {/* Bottom Scroll Indicator */}
            <button
              type="button"
              ref={scrollIndicatorRef}
              className="flex items-center justify-center gap-2 pt-2 text-xs font-bold text-white/90 hover:text-white cursor-pointer group drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
              onClick={(e) => handleScrollTo(e, '#about')}
            >
              <div className="w-4 h-6 rounded-full border-2 border-white/60 group-hover:border-white flex items-start justify-center p-1 transition-colors">
                <span className="w-1 h-1.5 rounded-full bg-white group-hover:translate-y-1.5 transition-transform duration-300" />
              </div>
              <span className="transition-colors">
                {t('exploreMore')}
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
