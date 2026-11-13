'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { X, Send, CheckCircle2, AlertCircle, Phone, Mail } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export function QuoteModal({ isOpen, onClose, initialProduct }: QuoteModalProps) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('contact');
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    type: 'delivery',
    message: '',
    website: '', // Honeypot spam trap
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Close on Escape key & reset transient status on open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setStatus('idle');
      setErrorMessage('');
      if (initialProduct) {
        setFormData((prev) => ({
          ...prev,
          message: isAr
            ? `استفسار عن توريد: ${initialProduct}`
            : `Supply inquiry for: ${initialProduct}`,
        }));
      }
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      if (isOpen) {
        previousFocusRef.current?.focus();
      }
    };
  }, [isOpen, onClose, initialProduct, isAr]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) {
      setStatus('success');
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage(
        isAr ? 'يرجى تعبئة الاسم ورقم الجوال والطلب.' : 'Please fill in name, mobile, and message.'
      );
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (!res.ok) throw new Error('Server error');

      setStatus('success');
      setFormData({
        name: '',
        company: '',
        phone: '',
        type: 'delivery',
        message: '',
        website: '',
      });
    } catch {
      // On static hosting (e.g. GitHub Pages) fallback smoothly to WhatsApp dispatch
      const waText = encodeURIComponent(
        isAr
          ? `طلب عرض سعر توريد:\n• الاسم: ${formData.name}\n• الشركة: ${formData.company || 'غير محدد'}\n• الجوال: ${formData.phone}\n• النشاط: ${formData.type}\n• الطلب: ${formData.message}`
          : `New Produce Quote Request:\n• Name: ${formData.name}\n• Company: ${formData.company || 'N/A'}\n• Mobile: ${formData.phone}\n• Sector: ${formData.type}\n• Details: ${formData.message}`
      );
      window.open(`https://wa.me/966539850682?text=${waText}`, '_blank');
      setStatus('success');
      setFormData({
        name: '',
        company: '',
        phone: '',
        type: 'delivery',
        message: '',
        website: '',
      });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-modal-backdrop"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-xl bg-ivory-canvas text-forest rounded-3xl p-6 sm:p-8 shadow-2xl border border-forest/10 max-h-[90vh] overflow-y-auto animate-modal-panel"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={isAr ? 'إغلاق' : 'Close'}
          className="absolute top-5 end-5 p-2 rounded-full bg-forest/5 hover:bg-forest/10 text-forest transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col gap-1 mb-6 pe-8">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">
            {isAr ? 'طلب عرض سعر مباشر' : 'Direct Quote Request'}
          </span>
          <h3
            id="quote-modal-title"
            className={`text-2xl sm:text-3xl font-extrabold text-forest ${
              isAr ? 'font-arabic' : 'font-english'
            }`}
          >
            {t('title')}
          </h3>
          <p className="text-xs sm:text-sm text-forest/70 mt-1">
            {t('desc')}
          </p>
        </div>

        {/* Feedback Messages */}
        {status === 'success' && (
          <div className="mb-6 p-4 rounded-2xl bg-forest/10 border border-forest/20 flex items-start gap-3 text-forest">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-natural mt-0.5" />
            <div className="text-sm">
              <p className="font-bold">
                {isAr ? 'تم استلام طلبك بنجاح' : 'Request received successfully'}
              </p>
              <p className="text-xs text-forest/80 mt-0.5">
                {isAr
                  ? 'سيتواصل معك ممثل المبيعات خلال ساعات العمل الرسمية.'
                  : 'A sales representative will contact you during business hours.'}
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-forest">
                {isAr ? 'الاسم الكامل *' : 'Full Name *'}
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={isAr ? 'محمد الحربي' : 'John Doe'}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-forest/15 focus:border-forest focus:ring-1 focus:ring-forest outline-none text-sm text-forest placeholder:text-forest/35 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-forest">
                {isAr ? 'الشركة / المنشأة' : 'Company Name'}
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={isAr ? 'شركة الأغذية الحديثة' : 'Modern Foods Co.'}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-forest/15 focus:border-forest focus:ring-1 focus:ring-forest outline-none text-sm text-forest placeholder:text-forest/35 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-forest">
                {isAr ? 'رقم الجوال *' : 'Mobile Number *'}
              </label>
              <input
                type="tel"
                name="phone"
                required
                dir="ltr"
                value={formData.phone}
                onChange={handleChange}
                placeholder="05X XXX XXXX"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-forest/15 focus:border-forest focus:ring-1 focus:ring-forest outline-none text-sm text-forest placeholder:text-forest/35 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-forest">
                {isAr ? 'نوع النشاط' : 'Sector / Business Type'}
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-forest/15 focus:border-forest focus:ring-1 focus:ring-forest outline-none text-sm text-forest transition"
              >
                <option value="delivery">{isAr ? 'تطبيقات التوصيل الإلكترونية' : 'Quick Delivery App'}</option>
                <option value="market">{isAr ? 'هايبر / سوبر ماركت' : 'Hypermarket / Supermarket'}</option>
                <option value="hotel">{isAr ? 'فنادق ومطاعم' : 'Hospitality & Dining'}</option>
                <option value="catering">{isAr ? 'إعاشة وتموين' : 'Catering & Food Service'}</option>
                <option value="other">{isAr ? 'أخرى' : 'Other'}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-forest">
              {isAr ? 'الأصناف والكميات المطلوبة *' : 'Required Produce & Volume *'}
            </label>
            <textarea
              name="message"
              required
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder={
                isAr
                  ? 'اذكر الأصناف (مثل: طماطم، برتقال، تفاح...) والكمية التقديرية وتكرار التوريد'
                  : 'Specify varieties (e.g., tomatoes, oranges, apples), estimated quantities, and delivery frequency'
              }
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-forest/15 focus:border-forest focus:ring-1 focus:ring-forest outline-none text-sm text-forest placeholder:text-forest/35 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-2 w-full py-3.5 px-6 rounded-full bg-forest hover:bg-forest-light active:bg-forest-dark text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50"
          >
            {status === 'loading' ? (
              <span>{isAr ? 'جارٍ الإرسال...' : 'Sending...'}</span>
            ) : (
              <>
                <Send className="w-4 h-4 rtl:scale-x-[-1]" />
                <span>{isAr ? 'إرسال طلب السعر' : 'Submit Quote Request'}</span>
              </>
            )}
          </button>
        </form>

        {/* Direct Phone Assistance */}
        <div className="mt-6 pt-4 border-t border-forest/10 flex items-center justify-between text-xs text-forest/70">
          <span className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-natural" />
            <a href="tel:+966112651373" dir="ltr" className="hover:text-forest font-semibold">
              011 265 1373
            </a>
          </span>
          <span className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-natural" />
            <a href="mailto:info@anadcorp.com" dir="ltr" className="hover:text-forest font-semibold">
              info@anadcorp.com
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
