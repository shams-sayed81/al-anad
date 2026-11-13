import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { readexPro, alexandria, jakartaSans } from '@/app/fonts';
import { LenisProvider } from '@/lib/lenis-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppPill } from '@/components/common/whatsapp-pill';
import { asset } from '@/lib/asset-path';
import '@/styles/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'العناد الوطنية | توريد المحاصيل الزراعية وسلسلة الإمداد'
      : 'Al Anad National | Fresh Produce Supply & Cold Chain',
    description: isAr
      ? 'كيان تجاري متخصص بتوريد الخضار والفواكه بأعلى معايير الجودة وبسلسلة تبريد متكاملة منذ عام 2007 في المملكة العربية السعودية.'
      : 'A leading Saudi agricultural trading company specializing in fresh produce supply and cold-chain logistics since 2007.',
    icons: {
      icon: asset('/favicon.ico'),
      apple: asset('/brand/al-anad-new-logo-128.png'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ar' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const fontClasses = `${readexPro.variable} ${alexandria.variable} ${jakartaSans.variable}`;

  return (
    <html lang={locale} dir={dir} className={fontClasses}>
      <body className="bg-ivory-canvas text-forest-dark antialiased flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <WhatsAppPill />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
