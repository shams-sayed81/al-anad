'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getGSAP } from '@/lib/gsap';
import { ShieldCheck, Truck, Sprout } from 'lucide-react';
import { asset } from '@/lib/asset-path';

export function AboutSection() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('about');

  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const leafLeftRef = useRef<HTMLDivElement>(null);
  const leafRightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGSAP();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (imageCardRef.current) {
        gsap.fromTo(
          imageCardRef.current,
          { opacity: 0, x: isAr ? 30 : -30, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Subtle organic vertical parallax as user scrolls through About
        gsap.fromTo(
          imageCardRef.current,
          { y: -10 },
          {
            y: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          }
        );
      }

      if (emblemRef.current) {
        gsap.fromTo(
          emblemRef.current,
          { opacity: 0, scale: 0.65, rotate: -14 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (leafLeftRef.current) {
        gsap.fromTo(
          leafLeftRef.current,
          { opacity: 0, scale: 0.7, x: isAr ? 16 : -16 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.85,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (leafRightRef.current) {
        gsap.fromTo(
          leafRightRef.current,
          { opacity: 0, scale: 0.7, y: 14 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.85,
            delay: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const eyebrowLines = sectionRef.current?.querySelectorAll('[data-eyebrow-line]');
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
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (contentRef.current?.children) {
        gsap.fromTo(
          Array.from(contentRef.current.children),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const pillars = sectionRef.current?.querySelectorAll('[data-about-pillar]');
      if (pillars?.length) {
        gsap.fromTo(
          pillars,
          { opacity: 0, y: 18, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
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
      id="about"
      ref={sectionRef}
      className="relative bg-ivory-canvas py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Hidden SVG ClipPath for Organic Leaf-Shaped Silhouette */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="about-organic-leaf-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.08,0.16 C 0.24,0.03 0.56,0.02 0.84,0.10 C 0.96,0.14 0.99,0.34 0.96,0.58 C 0.92,0.82 0.72,0.97 0.44,0.96 C 0.18,0.95 0.03,0.78 0.02,0.52 C 0.01,0.34 0.03,0.22 0.08,0.16 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Top Organic Wave Transition Curve separating Hero from About */}
      <div className="absolute top-0 inset-x-0 h-10 pointer-events-none overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          <path
            d="M0 0C320 30 640 40 960 20C1160 10 1340 0 1440 0V40H0V0Z"
            fill="#FAF8F3"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Organic Floating Harvest Visual (No rectangular frame, border, or box shadow) */}
          <div
            ref={imageCardRef}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="relative w-full max-w-md lg:max-w-xl aspect-[16/11] group select-none">
              {/* Soft Ambient Botanical Glow Behind Silhouette */}
              <div
                className="absolute inset-6 rounded-full bg-forest/10 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Floating Sage Leaf Accent — Extending Outside Start/Left Edge */}
              <div
                ref={leafLeftRef}
                className="absolute -start-3 sm:-start-5 top-[34%] w-14 h-20 sm:w-16 sm:h-24 z-10 pointer-events-none text-[#7E947D] opacity-85 transition-transform duration-700 group-hover:-translate-x-1 group-hover:-rotate-3"
                aria-hidden="true"
              >
                <svg viewBox="0 0 64 96" fill="none" className="w-full h-full drop-shadow-sm">
                  <path
                    d="M46 88C16 74 4 46 18 8C42 26 56 54 46 88Z"
                    fill="currentColor"
                    fillOpacity="0.82"
                  />
                  <path
                    d="M44 86C34 58 26 34 18 8"
                    stroke="#FAF8F3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeOpacity="0.65"
                  />
                </svg>
              </div>

              {/* Floating Sage Leaf Accent — Extending Outside Bottom/End Edge */}
              <div
                ref={leafRightRef}
                className="absolute -end-2 sm:-end-4 bottom-[8%] w-12 h-16 sm:w-14 sm:h-20 z-10 pointer-events-none text-[#8BA189] opacity-85 transition-transform duration-700 group-hover:translate-x-1 group-hover:rotate-3"
                aria-hidden="true"
              >
                <svg viewBox="0 0 56 80" fill="none" className="w-full h-full drop-shadow-sm">
                  <path
                    d="M12 72C36 62 50 36 38 6C16 20 6 44 12 72Z"
                    fill="currentColor"
                    fillOpacity="0.78"
                  />
                  <path
                    d="M14 70C22 46 30 28 38 6"
                    stroke="#FAF8F3"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeOpacity="0.6"
                  />
                </svg>
              </div>

              {/* Main Organic Clipped Photography with Silhouette-Following Shadow */}
              <div
                className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                style={{ filter: 'drop-shadow(0 20px 30px rgba(12, 37, 24, 0.14))' }}
              >
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{ clipPath: 'url(#about-organic-leaf-clip)' }}
                >
                  <Image
                    src={asset('/images/editorial/about_harvest_hd.jpg')}
                    alt={t('imageAlt')}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Warm Edge Vignette for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Overlapping Golden Circular Emblem Extending Beyond Silhouette */}
              <div
                ref={emblemRef}
                className="absolute -top-1 -end-1 sm:top-1 sm:-end-2 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gold to-gold-dark ring-[4px] ring-ivory-canvas shadow-[0_12px_24px_-6px_rgba(188,143,71,0.5)] flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                >
                  <path
                    d="M12 34C12 22 20 14 34 14C34 26 26 34 12 34Z"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 34C18 28 24 22 33 15"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 35C22 28 28 22 37 22C37 29 31 35 22 35Z"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Story & 3 Value Pillars */}
          <div
            ref={contentRef}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-widest text-natural uppercase">
              <span data-eyebrow-line className="w-8 sm:w-12 h-px bg-natural/50 origin-center" />
              <span>{t('eyebrow')}</span>
              <span data-eyebrow-line className="w-8 sm:w-12 h-px bg-natural/50 origin-center" />
            </div>

            {/* Title */}
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-forest-dark leading-[1.2] ${
                isAr ? 'font-arabic' : 'font-english'
              }`}
            >
              {t('title')}
            </h2>

            {/* Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-forest-dark/85 font-medium leading-relaxed max-w-2xl">
              {t('description')}
            </p>

            {/* 3 Pillars in a Row with Divider Lines */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-forest-dark/15 items-center">
              {/* Pillar 1 */}
              <div data-about-pillar className="group flex flex-col items-center sm:items-start text-center sm:text-start gap-2.5">
                <span className="p-2.5 rounded-2xl bg-white shadow-sm border border-forest-dark/10 text-natural transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold/50 group-hover:shadow-md">
                  <Sprout className="w-5 h-5 text-natural transition-transform duration-300 group-hover:scale-110" />
                </span>
                <span className="text-sm font-bold text-forest-dark">
                  {t('features.farms')}
                </span>
              </div>

              {/* Pillar 2 */}
              <div data-about-pillar className="group flex flex-col items-center sm:items-start text-center sm:text-start gap-2.5 sm:border-s sm:border-forest-dark/15 sm:ps-6">
                <span className="p-2.5 rounded-2xl bg-white shadow-sm border border-forest-dark/10 text-natural transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold/50 group-hover:shadow-md">
                  <Truck className="w-5 h-5 text-natural transition-transform duration-300 group-hover:scale-110" />
                </span>
                <span className="text-sm font-bold text-forest-dark">
                  {t('features.network')}
                </span>
              </div>

              {/* Pillar 3 */}
              <div data-about-pillar className="group flex flex-col items-center sm:items-start text-center sm:text-start gap-2.5 sm:border-s sm:border-forest-dark/15 sm:ps-6">
                <span className="p-2.5 rounded-2xl bg-white shadow-sm border border-forest-dark/10 text-natural transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold/50 group-hover:shadow-md">
                  <ShieldCheck className="w-5 h-5 text-natural transition-transform duration-300 group-hover:scale-110" />
                </span>
                <span className="text-sm font-bold text-forest-dark">
                  {t('features.quality')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
