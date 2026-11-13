import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { HeroInteractive } from '@/components/home/hero-interactive';
import { AboutSection } from '@/components/home/about-section';
import { ProductsMomentumRail } from '@/components/home/products-momentum-rail';
import { SupplyChainJourney } from '@/components/home/supply-chain-journey';
import { ServicesFleetSection } from '@/components/home/services-fleet-section';
import { PartnersSection } from '@/components/home/partners-section';
import { QuoteRequestPortal } from '@/components/home/quote-request-portal';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col overflow-hidden bg-[#FAF8F3]">
      {/* 1. CINEMATIC HERO (الرئيسية) */}
      <HeroInteractive />

      {/* 2. ABOUT & ORIGIN (من نحن) */}
      <AboutSection />

      {/* 3. FRESH PRODUCE SHOWCASE (منتجاتنا) */}
      <ProductsMomentumRail />

      {/* 4. 4-STAGE FARM-TO-MARKET SUPPLY CHAIN JOURNEY (سلسلة الإمداد) */}
      <SupplyChainJourney />

      {/* 5. REFRIGERATED FLEET & COLD CHAIN SERVICES (خدماتنا) */}
      <ServicesFleetSection />

      {/* 6. PARTNERS SHOWCASE (شركاؤنا) */}
      <PartnersSection />

      {/* 7. B2B QUOTE & CONTACT PORTAL (تواصل معنا) */}
      <QuoteRequestPortal />
    </div>
  );
}
