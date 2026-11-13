'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getGSAP } from '@/lib/gsap';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { ProduceCatalogModal } from '@/components/common/produce-catalog-modal';
import { QuoteModal } from '@/components/common/quote-modal';
import { asset } from '@/lib/asset-path';

export function ProductsMomentumRail() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('products');
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const products = [
    {
      id: 'orange',
      nameAr: 'برتقال طازج',
      nameEn: 'Fresh Oranges',
      image: '/images/products/product_master_orange_v2.jpg',
    },
    {
      id: 'apple',
      nameAr: 'تفاح أحمر فاخر',
      nameEn: 'Premium Red Apples',
      image: '/images/products/product_master_apple_v2.jpg',
    },
    {
      id: 'greens',
      nameAr: 'ورقيات وخضار طازجة',
      nameEn: 'Fresh Leafy Greens',
      image: '/images/products/product_master_greens_v2.jpg',
    },
    {
      id: 'blueberry',
      nameAr: 'توت أزرق مختار',
      nameEn: 'Selected Blueberries',
      image: '/images/products/product_master_blueberry_v2.jpg',
    },
    {
      id: 'tomato',
      nameAr: 'طماطم محمية',
      nameEn: 'Vine Tomatoes',
      image: '/images/products/tomato.jpg',
    },
    {
      id: 'strawberry',
      nameAr: 'فراولة طازجة',
      nameEn: 'Fresh Strawberries',
      image: '/images/products/strawberry.jpg',
    },
    {
      id: 'mango',
      nameAr: 'مانجو مختار',
      nameEn: 'Selected Mango',
      image: '/images/products/mango.jpg',
    },
    {
      id: 'pomegranate',
      nameAr: 'رمان طازج',
      nameEn: 'Fresh Pomegranate',
      image: '/images/products/pomegranate.jpg',
    },
  ];

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 2) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }
    // Modern browsers in RTL can use negative scrollLeft (Chrome/Firefox/Safari)
    const offset = Math.abs(el.scrollLeft);
    setCanPrev(offset > 4);
    setCanNext(offset < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons, isAr]);

  useEffect(() => {
    const { gsap } = getGSAP();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const eyebrowLines = headerRef.current?.querySelectorAll('[data-eyebrow-line]');
      const headerRow = headerRef.current?.querySelector('[data-products-header-row]');

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

      if (headerRow) {
        gsap.fromTo(
          headerRow,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (cardsRef.current?.children) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { opacity: 0, y: 26, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isAr]);

  const handleScroll = (action: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth >= 768 ? el.clientWidth / 2 : el.clientWidth * 0.85;
    const sign = action === 'next' ? (isAr ? -1 : 1) : (isAr ? 1 : -1);
    el.scrollBy({ left: cardWidth * sign, behavior: 'smooth' });
  };

  const handleOpenQuote = (productName?: string) => {
    setSelectedProduct(productName);
    setIsQuoteOpen(true);
  };

  return (
    <>
      <section id="products" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-ivory-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          {/* Header Block */}
          <div ref={headerRef} className="flex flex-col gap-2">
            {/* Centered Eyebrow */}
            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-widest text-natural uppercase">
              <span data-eyebrow-line className="w-8 sm:w-12 h-px bg-natural/50 origin-center" />
              <span>{t('eyebrow')}</span>
              <span data-eyebrow-line className="w-8 sm:w-12 h-px bg-natural/50 origin-center" />
            </div>

            {/* Headline & Explore Link in One Row */}
            <div
              data-products-header-row
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1"
            >
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-forest-dark text-center sm:text-start ${
                  isAr ? 'font-arabic' : 'font-english'
                }`}
              >
                {t('title')}
              </h2>

              <button
                type="button"
                onClick={() => setIsCatalogOpen(true)}
                className="group inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-gold-dark hover:text-forest transition-colors self-center sm:self-auto"
              >
                <span>{t('exploreAll')}</span>
                <span className="w-5 h-5 rounded-full bg-gold/15 group-hover:bg-gold/30 flex items-center justify-center transition-transform duration-300 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                  <Arrow className="w-3 h-3 text-gold-dark" />
                </span>
              </button>
            </div>
          </div>

          {/* Carousel Container with Direction-Aware Nav Controls */}
          <div className="relative flex items-center">
            {/* Start Navigation Arrow (Previous in reading direction) */}
            <button
              type="button"
              onClick={() => handleScroll('prev')}
              disabled={!canPrev}
              aria-label={isAr ? 'المنتجات السابقة' : 'Previous products'}
              className="hidden sm:flex absolute start-2 md:-start-4 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-forest-dark/10 items-center justify-center text-forest-dark hover:bg-ivory-canvas hover:scale-105 active:scale-95 transition-all disabled:opacity-35 disabled:pointer-events-none"
            >
              {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>

            {/* Product Cards Track */}
            <div
              ref={scrollRef}
              className="w-full overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-1"
            >
              <div
                ref={cardsRef}
                className="flex gap-5"
              >
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleOpenQuote(isAr ? product.nameAr : product.nameEn)}
                    aria-label={`${isAr ? product.nameAr : product.nameEn} — ${t('clickToQuote')}`}
                    className="group relative flex-shrink-0 w-[82%] sm:w-[calc((100%-20px)/2)] md:w-[calc((100%-60px)/4)] snap-start aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-forest-dark/10 bg-ivory cursor-pointer transition-all duration-500 hover:shadow-xl hover:border-gold/40 hover:-translate-y-1 text-start focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <Image
                      src={asset(product.image)}
                      alt={isAr ? product.nameAr : product.nameEn}
                      fill
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Bottom Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                    {/* Subtle Quote Cue on Hover/Focus */}
                    <span className="absolute top-3 end-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 bg-forest/90 text-ivory-canvas text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/15">
                      {t('clickToQuote')}
                    </span>

                    {/* Centered Bottom Pill Label */}
                    <div className="absolute bottom-3.5 inset-x-4 flex justify-center">
                      <span className="bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border border-white/20 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-gold/60">
                        {isAr ? product.nameAr : product.nameEn}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* End Navigation Arrow (Next in reading direction) */}
            <button
              type="button"
              onClick={() => handleScroll('next')}
              disabled={!canNext}
              aria-label={isAr ? 'المنتجات التالية' : 'Next products'}
              className="hidden sm:flex absolute end-2 md:-end-4 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-forest-dark/10 items-center justify-center text-forest-dark hover:bg-ivory-canvas hover:scale-105 active:scale-95 transition-all disabled:opacity-35 disabled:pointer-events-none"
            >
              {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </section>

      <ProduceCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onRequestQuote={(productName) => handleOpenQuote(productName)}
      />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProduct={selectedProduct}
      />
    </>
  );
}
