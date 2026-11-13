'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Logo } from '@/components/common/logo';
import { BotanicalLeaf } from '@/components/common/botanical-leaf';
import { useLenis } from '@/lib/lenis-provider';
import { getGSAP } from '@/lib/gsap';
import { Phone, Mail, MapPin, MessageCircle, X } from 'lucide-react';

export function Footer() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const { scrollTo } = useLenis();

  const footerRef = useRef<HTMLElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const { gsap } = getGSAP();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (colsRef.current?.children) {
        gsap.fromTo(
          Array.from(colsRef.current.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, [isAr]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLegalModal(null);
    };
    if (legalModal) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      if (legalModal) {
        previousFocusRef.current?.focus();
      }
    };
  }, [legalModal]);

  const handleQuickLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href, { offset: -70 });
  };

  return (
    <>
      <footer
        ref={footerRef}
        className="relative bg-[#0A1D12] text-[#FAF7F2] pt-16 pb-10 overflow-hidden border-t border-[#123824]"
      >
        {/* Subtle Botanical Leaf Silhouette in Background Corner */}
        <div className="absolute -bottom-10 -start-10 opacity-10 pointer-events-none text-[#3D6647] rtl:scale-x-[-1]">
          <BotanicalLeaf size={340} variant="branch" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            ref={colsRef}
            className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start"
          >
            {/* Column 1: Brand Logo at Start */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <Logo variant="light" />
              <p className="text-xs sm:text-sm text-[#FAF7F2]/75 leading-relaxed max-w-sm mt-1">
                {tFooter('summary')}
              </p>
            </div>

            {/* Column 2: Quick Links in Center */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <h4 className="text-sm font-bold text-gold tracking-wide uppercase">
                {tFooter('quickLinks')}
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#FAF7F2]/80">
                {[
                  { href: '#hero', label: tNav('home') },
                  { href: '#about', label: tNav('about') },
                  { href: '#products', label: tNav('products') },
                  { href: '#journey', label: tNav('supplyChain') },
                  { href: '#services', label: tNav('services') },
                  { href: '#partners', label: tNav('partners') },
                  { href: '#contact', label: tNav('contact') },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleQuickLink(e, link.href)}
                      className="hover:text-gold transition-colors inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Touchpoints at End */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <h4 className="text-sm font-bold text-gold tracking-wide uppercase">
                {tFooter('contactUs')}
              </h4>
              <ul className="flex flex-col gap-3 text-xs sm:text-sm text-[#FAF7F2]/85">
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <a href="tel:+966112651373" dir="ltr" className="hover:text-gold transition-colors font-medium">
                    011 265 1373
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                  <a
                    href="https://wa.me/966539850682"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="hover:text-gold transition-colors font-medium"
                  >
                    053 985 0682
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                  <a href="mailto:info@anadcorp.com" dir="ltr" className="hover:text-gold transition-colors font-medium">
                    info@anadcorp.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-[#FAF7F2]/75">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{tFooter('location')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/65">
            <div className="flex items-center gap-1">
              <span dir="ltr">{currentYear} ©</span>
              <span>{tFooter('rights')}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className="hover:text-[#FAF7F2] cursor-pointer transition-colors"
              >
                {tFooter('terms')}
              </button>
              <span className="text-[#FAF7F2]/20">|</span>
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className="hover:text-[#FAF7F2] cursor-pointer transition-colors"
              >
                {tFooter('privacy')}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Information Modal */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-modal-backdrop"
          onClick={() => setLegalModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative w-full max-w-lg bg-ivory-canvas text-forest rounded-3xl p-6 sm:p-8 shadow-2xl border border-forest/10 max-h-[85vh] overflow-y-auto animate-modal-panel"
          >
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              aria-label={isAr ? 'إغلاق' : 'Close'}
              className="absolute top-5 end-5 p-2 rounded-full bg-forest/5 hover:bg-forest/10 text-forest transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3
              id="legal-modal-title"
              className={`text-xl sm:text-2xl font-extrabold text-forest mb-4 pe-8 ${
                isAr ? 'font-arabic' : 'font-english'
              }`}
            >
              {legalModal === 'terms' ? tFooter('terms') : tFooter('privacy')}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-forest/80 leading-relaxed">
              {legalModal === 'terms' ? (
                isAr ? (
                  <>
                    <p>مرحبًا بكم في الموقع الرسمي لشركة العناد الوطنية. باستخدامك لهذا الموقع فإنك توافق على الالتزام بشروط الاستخدام المعمول بها في المملكة العربية السعودية.</p>
                    <p>تُعد طلبات عروض الأسعار المقدمة عبر الموقع طلبات استفسار تجارية أولية، وتخضع الأسعار النهائية وتوافر المحاصيل لتأكيد فريق المبيعات والمواسم الزراعية.</p>
                    <p>جميع العلامات التجارية والشعارات والصور المعروضة محفوظة لأصحابها وتُستخدم لأغراض التعريف بخدمات التوريد.</p>
                  </>
                ) : (
                  <>
                    <p>Welcome to the official website of Al Anad National. By accessing this website, you agree to comply with these terms in accordance with the laws of the Kingdom of Saudi Arabia.</p>
                    <p>Quote requests submitted through this portal represent preliminary B2B supply inquiries. Final pricing, volumes, and seasonal availability are confirmed directly by our commercial team.</p>
                    <p>All brand marks, partner logos, and visual assets remain the property of their respective owners.</p>
                  </>
                )
              ) : isAr ? (
                <>
                  <p>تلتزم شركة العناد الوطنية بحماية خصوصية بيانات العملاء والشركات التي تتواصل معنا عبر الموقع الإلكتروني.</p>
                  <p>تُستخدم المعلومات المقدمة في نموذج طلب عرض السعر (مثل الاسم، اسم المنشأة، رقم الجوال، وتفاصيل الطلب) حصريًا لغرض التواصل التجاري وإعداد عروض الأسعار.</p>
                  <p>لا نقوم ببيع أو مشاركة بياناتك مع أي جهات خارجية غير مرتبطة بتنفيذ طلب التوريد الخاص بك.</p>
                </>
              ) : (
                <>
                  <p>Al Anad National is committed to safeguarding the privacy of corporate and commercial inquiries submitted through our website.</p>
                  <p>Information provided in quote requests (name, company, contact number, and supply requirements) is used strictly to respond to your inquiry and prepare commercial proposals.</p>
                  <p>We do not sell or share your contact information with unrelated third parties.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
