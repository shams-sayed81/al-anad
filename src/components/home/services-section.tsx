import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ThermometerSnowflake, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';

export function ServicesSection() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const services = [
    {
      num: '01',
      titleAr: 'تسويق وتوزيع المحاصيل المحلية',
      titleEn: 'Marketing & Distribution of Local Crops',
      descAr:
        'نربط إنتاج 35 مزرعة سعودية بأكبر سلاسل الهايبر ماركت وتطبيقات التوصيل السريع والمنشآت الغذائية، بفرز احترافي ومعايير صارمة.',
      descEn:
        'Connecting yields from 35 Saudi farms to leading hypermarkets, fast-delivery platforms, and food enterprises with artisanal grading.',
    },
    {
      num: '02',
      titleAr: 'استيراد المحاصيل الزراعية الخارجية',
      titleEn: 'Importation of Global Agricultural Produce',
      descAr:
        'نتعاقد مع أكثر من 12 جهة خارجية موثوقة لضمان توفير أصناف الفواكه والخضار التخصصية وتغطية احتياجات السوق على مدار العام.',
      descEn:
        'Contracting with over 12 verified international sources to guarantee seasonal diversity and year-round produce availability.',
    },
    {
      num: '03',
      titleAr: 'تلبية الكميات وعقود التوريد المؤسسية',
      titleEn: 'Enterprise Volume & Institutional Contracts',
      descAr:
        'توفير احتياجات كبرى الفنادق والمطاعم وشركات الإعاشة بعقود توريد مجدولة، وشاحنات مبرّدة مخصصة لكل عميل.',
      descEn:
        'Fulfilling high-volume recurring procurement for premier hotels, restaurant chains, and catering institutions with tailored logistics.',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-[#F6F4ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Premium Photographic Fleet Tile with Ambient Telemetry */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(24,61,43,0.2)] bg-forest-dark">
              <Image
                src="/images/editorial/fleet_logistics_highway.jpg"
                alt="Refrigerated Fleet Logistics"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/30 to-transparent" />

              {/* Minimal Telemetry Badge Overlaid on Fleet Visual */}
              <div className="absolute bottom-8 inset-x-8 flex flex-col gap-3 text-ivory">
                <span className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                  <ThermometerSnowflake className="w-4 h-4 text-gold" />
                  <span>{isAr ? 'أسطول مبرّد ومراقب حراريًا' : 'Thermal Telemetry Fleet'}</span>
                </span>
                <h3 className="font-arabic font-bold text-2xl text-white leading-tight">
                  {isAr ? '15+ شاحنة مبرّدة على مدار الساعة' : '15+ Refrigerated Trucks Operating 24/7'}
                </h3>
                <p className="text-xs text-sage-light/90 leading-relaxed">
                  {isAr
                    ? 'أجهزة تتبع حراري دقيقة تحفظ النضارة حتى باب المنشأة دون أي انقطاع.'
                    : 'Continuous thermal tracking ensuring produce arrives at optimum temperature.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Editorial 3-Service Roster (Zero Generic Card Boxes) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-wider text-natural uppercase">
                <span>{isAr ? 'خدماتنا التجارية' : 'Commercial Services'}</span>
                <span className="w-12 h-px bg-natural/40" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-arabic leading-tight text-forest">
                {isAr ? 'ثلاث خدمات تغطي سلسلة التوريد كاملة' : 'Comprehensive Supply Chain Solutions'}
              </h2>
            </div>

            {/* Service Rows */}
            <div className="flex flex-col gap-6 pt-2">
              {services.map((item, idx) => (
                <div
                  key={idx}
                  className="pb-6 border-b border-forest/10 flex items-start gap-6 group"
                >
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-gold flex-shrink-0" dir="ltr">
                    {item.num}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-arabic font-bold text-xl text-forest group-hover:text-natural transition-colors">
                      {isAr ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {isAr ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Inquiry Trigger */}
            <div className="pt-2">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-forest hover:bg-forest-light text-ivory text-sm font-bold px-7 py-3.5 rounded-full shadow-editorial transition-all duration-300"
              >
                <span>{isAr ? 'اطلب عرض سعر مخصص لمنشأتك' : 'Request Enterprise Quote'}</span>
                <span className="w-6 h-6 rounded-full bg-gold text-forest-dark flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Arrow className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
