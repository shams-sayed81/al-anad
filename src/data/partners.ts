export interface Partner {
  id: string;
  name: string;
  nameAr?: string;
  logo: string;
}

export const PARTNERS: Partner[] = [
  { id: 'panda', name: 'Panda', nameAr: 'بندة', logo: '/images/partners/panda.png' },
  { id: 'othaim', name: 'Othaim Markets', nameAr: 'أسواق العثيم', logo: '/images/partners/othaim.png' },
  { id: 'keeta', name: 'Keeta', nameAr: 'كيتا', logo: '/images/partners/keeta.png' },
  { id: 'ninja', name: 'Ninja', nameAr: 'نينجا', logo: '/images/partners/ninja.png' },
  { id: 'spinneys', name: 'Spinneys', nameAr: 'سبينيس', logo: '/images/partners/spinneys.png' },
  { id: 'hasil', name: 'Hasil', nameAr: 'حصيل', logo: '/images/partners/hasil.png' },
  { id: 'dana', name: 'Dana Hypermarket', nameAr: 'دانة هايبر ماركت', logo: '/images/partners/dana.png' },
  { id: 'bustan', name: 'Bustan Al-Qassim', nameAr: 'بستان القصيم', logo: '/images/partners/bustan.png' },
  { id: 'thimar', name: 'Thimar Al-Aqilat', nameAr: 'ثمار العقيلي', logo: '/images/partners/thimar.png' },
  { id: 'bishri', name: 'Al-Bishri Trading', nameAr: 'مؤسسة البشري', logo: '/images/partners/bishri.png' },
];
