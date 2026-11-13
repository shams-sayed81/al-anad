import { Readex_Pro, Alexandria, Plus_Jakarta_Sans } from 'next/font/google';

export const readexPro = Readex_Pro({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-readex-pro',
  display: 'swap',
});

export const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-alexandria',
  display: 'swap',
});

export const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

