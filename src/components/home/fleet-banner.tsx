import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Truck, ThermometerSnowflake, ShieldCheck, Clock } from 'lucide-react';
import { asset } from '@/lib/asset-path';

export function FleetBanner() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section className="relative rounded-3xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden bg-forest text-ivory shadow-editorial-lg py-16 px-6 sm:px-12 lg:px-16">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={asset('/images/facility/trucks.jpg')}
          alt="Al Anad National Refrigerated Fleet"
          fill
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-forest-dark/95 via-forest-dark/85 to-forest-dark/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="max-w-2xl flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
            <Truck className="w-4 h-4" />
            <span>
              {isAr
                ? 'أسطول التوزيع وسلسلة التبريد'
                : 'Cold Chain Logistics & Fleet Telemetry'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-arabic leading-tight text-ivory-canvas">
            {isAr
              ? 'أسطول مبرّد يحفظ النضارة حتى باب عميلنا'
              : 'Refrigerated Fleet Preserving Freshness to Your Door'}
          </h2>

          <p className="text-sm sm:text-base text-sage-light leading-relaxed">
            {isAr
              ? 'أكثر من 15 شاحنة نقل مبرّدة مجهزة بأحدث أجهزة مراقبة درجات الحرارة لضمان وصول المحاصيل طازجة دون أي انقطاع في سلسلة التبريد.'
              : 'Over 15 refrigerated trucks equipped with continuous temperature telemetry to guarantee produce arrives at peak freshness without thermal disruption.'}
          </p>
        </div>

        {/* 3 Telemetry Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:max-w-xl w-full">
          <div className="p-4 rounded-2xl bg-forest-dark/80 backdrop-blur-md border border-white/10 flex flex-col gap-2">
            <ThermometerSnowflake className="w-6 h-6 text-gold" />
            <h4 className="font-bold text-sm text-ivory">
              {isAr ? 'تبريد مستمر' : 'Constant Temperature'}
            </h4>
            <p className="text-xs text-sage-light/80">
              {isAr ? '+4°C إلى +8°C حسب الصنف' : '+4°C to +8°C calibrated'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-forest-dark/80 backdrop-blur-md border border-white/10 flex flex-col gap-2">
            <Clock className="w-6 h-6 text-gold" />
            <h4 className="font-bold text-sm text-ivory">
              {isAr ? 'التزام بالمواعيد' : 'Punctual Dispatch'}
            </h4>
            <p className="text-xs text-sage-light/80">
              {isAr ? 'جداول توريد يومية منتظمة' : 'Scheduled daily deliveries'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-forest-dark/80 backdrop-blur-md border border-white/10 flex flex-col gap-2">
            <ShieldCheck className="w-6 h-6 text-gold" />
            <h4 className="font-bold text-sm text-ivory">
              {isAr ? 'سلامة غذائية' : 'Food Safety Standard'}
            </h4>
            <p className="text-xs text-sage-light/80">
              {isAr ? 'اشتراطات وقائية صارمة' : 'Stringent hygiene protocols'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
