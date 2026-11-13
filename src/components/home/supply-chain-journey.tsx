'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getGSAP } from '@/lib/gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function SupplyChainJourney() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('journey');
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const stages = [
    {
      num: '01',
      title: t('step1.title'),
      sub: t('step1.sub'),
      image: '/images/facility/journey_step_tractor_v2.jpg',
      alt: t('step1.alt'),
    },
    {
      num: '02',
      title: t('step2.title'),
      sub: t('step2.sub'),
      image: '/images/facility/journey_step_sorting_v2.jpg',
      alt: t('step2.alt'),
    },
    {
      num: '03',
      title: t('step3.title'),
      sub: t('step3.sub'),
      image: '/images/facility/journey_step_warehouse_v2.jpg',
      alt: t('step3.alt'),
    },
    {
      num: '04',
      title: t('step4.title'),
      sub: t('step4.sub'),
      image: '/images/facility/journey_step_truck_v2.jpg',
      alt: t('step4.alt'),
    },
  ];

  useEffect(() => {
    const { gsap } = getGSAP();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const dirSign = isAr ? -1 : 1;
    const cardsEl = cardsRef.current;

    const ctx = gsap.context(() => {
      const eyebrowLines = eyebrowRef.current?.querySelectorAll('[data-eyebrow-line]');
      const eyebrowLabel = eyebrowRef.current?.querySelector('[data-eyebrow-label]');
      const cards = cardsEl ? Array.from(cardsEl.children) : [];

      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (eyebrowLines?.length) {
        entranceTl.fromTo(
          eyebrowLines,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.05 },
          0
        );
      }

      if (eyebrowLabel) {
        entranceTl.fromTo(
          eyebrowLabel,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0.1
        );
      }

      if (cards.length) {
        const nums = cards.map((c) => c.querySelector('[data-journey-num]')).filter(Boolean);
        const imgWraps = cards.map((c) => c.querySelector('[data-journey-img-wrap]')).filter(Boolean);
        const arrows = cards.map((c) => c.querySelector('[data-journey-arrow]')).filter(Boolean);

        entranceTl.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.14,
            ease: 'power3.out',
          },
          0.2
        );

        if (nums.length) {
          entranceTl.fromTo(
            nums,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.14,
              ease: 'power2.out',
            },
            0.25
          );
        }

        if (imgWraps.length) {
          entranceTl.fromTo(
            imgWraps,
            { scale: 1.12 },
            {
              scale: 1,
              duration: 1.05,
              stagger: 0.14,
              ease: 'power2.out',
            },
            0.25
          );
        }

        if (arrows.length) {
          entranceTl.fromTo(
            arrows,
            { opacity: 0, scale: 0.5, x: -8 * dirSign },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.14,
              ease: 'back.out(1.7)',
            },
            0.45
          );
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isAr]);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-[#0C2518] text-[#FAF7F2] py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Top Organic Wave Transition Curve */}
      <div className="absolute top-0 inset-x-0 h-10 pointer-events-none overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          <path
            d="M0 0C360 30 720 40 1080 20C1260 10 1380 0 1440 0V40H0V0Z"
            fill="#FAF7F2"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Eyebrow */}
        <div ref={eyebrowRef} className="flex flex-col items-center text-center gap-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-widest text-gold uppercase">
            <span data-eyebrow-line className="w-8 sm:w-14 h-px bg-gold/50 origin-center" />
            <span data-eyebrow-label>{t('eyebrow')}</span>
            <span data-eyebrow-line className="w-8 sm:w-14 h-px bg-gold/50 origin-center" />
          </div>
        </div>

        {/* 4 Connected Process Cards (RTL: 01 to 04 from right to left) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-5"
        >
          {stages.map((stage, idx) => (
            <div key={stage.num} className="relative flex flex-col gap-4 group">
              {/* Header: Stage Number, Title & Subtitle + Connector Arrow */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {/* Golden Numerals */}
                  <span
                    data-journey-num
                    className={`text-2xl sm:text-3xl font-black text-gold leading-none tracking-tight inline-block ${
                      isAr ? 'font-arabic' : 'font-english'
                    }`}
                    dir="ltr"
                  >
                    {stage.num}
                  </span>
                  {/* Step Title */}
                  <h3
                    className={`text-base sm:text-lg font-bold text-white mt-1 ${
                      isAr ? 'font-arabic' : 'font-english'
                    }`}
                  >
                    {stage.title}
                  </h3>
                  {/* Subtitle */}
                  <span className="text-xs text-ivory-canvas/70 font-normal mt-0.5">
                    {stage.sub}
                  </span>
                </div>

                {/* Arrow Connector to Next Step */}
                {idx < stages.length - 1 && (
                  <div
                    data-journey-arrow
                    className="hidden md:flex items-center justify-center w-7 h-7 rounded-full border border-white/20 text-[#CCA35B] group-hover:border-[#CCA35B] group-hover:bg-[#CCA35B]/10 transition-colors"
                  >
                    <Arrow
                      data-journey-arrow-icon
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:ltr:translate-x-0.5 group-hover:rtl:-translate-x-0.5"
                    />
                  </div>
                )}
              </div>

              {/* Photo Card */}
              <div
                data-journey-photo
                className="relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-[#123824] transition-all duration-500 group-hover:border-[#CCA35B]/40 group-hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)]"
              >
                <div data-journey-img-wrap className="absolute inset-0">
                  <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Organic Wave Transition Curve */}
      <div className="absolute bottom-0 inset-x-0 h-10 pointer-events-none overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          <path
            d="M0 40C360 10 720 0 1080 20C1260 30 1380 40 1440 40V0H0V40Z"
            fill="#FAF7F2"
          />
        </svg>
      </div>
    </section>
  );
}
