'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export function QuoteRequestPortal() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('contact');

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
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
      // Post to our API route
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (!res.ok) {
        throw new Error('Server error');
      }

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
    <section id="contact" className="py-16 md:py-24 bg-forest text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries & Corporate Touchpoints */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span>{t('eyebrow')}</span>
            </div>

            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-ivory-canvas ${
                isAr ? 'font-arabic' : 'font-english'
              }`}
            >
              {t('title')}
            </h2>

            <p className="text-sm sm:text-base text-sage-light leading-relaxed">
              {t('desc')}
            </p>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-3 pt-4">
              <a
                href="tel:+966112651373"
                className="p-4 rounded-2xl bg-forest-dark/70 border border-white/10 flex items-center justify-between hover:border-gold/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-light/60 flex items-center justify-center text-gold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-sage-light">{t('phoneLabel')}</span>
                    <span dir="ltr" className="font-bold text-sm text-ivory group-hover:text-gold transition-colors">
                      {t('phone')}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-sage-light/70 font-medium">{t('phoneBadge')}</span>
              </a>

              <a
                href="https://wa.me/966539850682"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-forest-dark/70 border border-white/10 flex items-center justify-between hover:border-gold/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-natural/20 flex items-center justify-center text-natural-light">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-sage-light">{t('mobileLabel')}</span>
                    <span dir="ltr" className="font-bold text-sm text-ivory group-hover:text-gold transition-colors">
                      {t('mobile')}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#25D366] bg-[#25D366]/10 px-2.5 py-0.5 rounded-full">
                  {t('mobileBadge')}
                </span>
              </a>

              <a
                href="mailto:info@anadcorp.com"
                className="p-4 rounded-2xl bg-forest-dark/70 border border-white/10 flex items-center justify-between hover:border-gold/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-light/60 flex items-center justify-center text-gold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-sage-light">{t('emailLabel')}</span>
                    <span dir="ltr" className="font-bold text-sm text-ivory group-hover:text-gold transition-colors">
                      {t('email')}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-sage-light/70 font-medium">{t('emailBadge')}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-sage-light/80 pt-2">
              <Clock className="w-4 h-4 text-gold flex-shrink-0" />
              <span>{t('responseTime')}</span>
            </div>
          </div>

          {/* Right Column: B2B Quote Submission Form */}
          <div className="lg:col-span-7 bg-ivory text-forest-dark rounded-editorial-lg p-6 sm:p-10 border border-subtle shadow-editorial-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-forest">
                    {t('form.name')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-ivory-surface border border-subtle text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest/60 transition-colors"
                  />
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-forest">
                    {t('form.company')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-ivory-surface border border-subtle text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest/60 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-forest">
                    {t('form.phone')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    dir="ltr"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="05XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-ivory-surface border border-subtle text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest/60 transition-colors text-start"
                  />
                </div>

                {/* Sector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-forest">
                    {t('form.type')}
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-ivory-surface border border-subtle text-sm text-forest focus:outline-none focus:border-forest/60 transition-colors"
                  >
                    <option value="delivery">{t('form.types.delivery')}</option>
                    <option value="market">{t('form.types.market')}</option>
                    <option value="hotel">{t('form.types.hotel')}</option>
                    <option value="catering">{t('form.types.catering')}</option>
                    <option value="other">{t('form.types.other')}</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-forest">
                  {t('form.message')} <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    isAr
                      ? 'حدد الأصناف والكميات المطلوبة وموقع التوصيل...'
                      : 'Specify required produce varieties, projected volumes, and delivery location...'
                  }
                  className="w-full px-4 py-3 rounded-xl bg-ivory-surface border border-subtle text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest/60 transition-colors resize-none"
                />
              </div>

              {/* Honeypot hidden input */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                className="hidden pointer-events-none"
                aria-hidden="true"
              />

              {/* Status Feedbacks */}
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-natural/15 border border-natural/30 text-forest text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-natural flex-shrink-0" />
                  <span>{t('form.success')}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-800 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span>{errorMessage || t('form.error')}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-forest hover:bg-forest-light text-ivory py-4 rounded-xl font-bold text-sm shadow-editorial transition-all duration-300 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-gold rtl:scale-x-[-1]" />
                <span>
                  {status === 'loading'
                    ? isAr
                      ? 'جاري الإرسال...'
                      : 'Sending request...'
                    : t('form.submit')}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
