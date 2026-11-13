export interface CuratedProduct {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  category: 'citrus' | 'vine' | 'leaf' | 'fruits' | 'berries';
  categoryLabelAr: string;
  categoryLabelEn: string;
  image: string;
  isFeatured?: boolean;
  notesAr?: string;
  notesEn?: string;
}

/**
 * Curated Produce Selection for Preview & Prototype
 * Clearly marked as placeholder demo content until final company materials are provided.
 */
export const CURATED_PRODUCTS: CuratedProduct[] = [
  // 1. Featured Produce from the Approved Mockup Row
  {
    id: 'prod-orange',
    slug: 'orange',
    nameAr: 'برتقال طازج',
    nameEn: 'Fresh Orange',
    category: 'citrus',
    categoryLabelAr: 'حمضيات',
    categoryLabelEn: 'Citrus',
    image: '/images/products/orange.jpg',
    isFeatured: true,
  },
  {
    id: 'prod-apple',
    slug: 'apple',
    nameAr: 'تفاح أحمر فاخر',
    nameEn: 'Premium Red Apple',
    category: 'fruits',
    categoryLabelAr: 'فواكه',
    categoryLabelEn: 'Fruits',
    image: '/images/products/apple.jpg',
    isFeatured: true,
  },
  {
    id: 'prod-leaf',
    slug: 'kale',
    nameAr: 'ورقيات وخضار طازجة',
    nameEn: 'Fresh Leafy Greens',
    category: 'leaf',
    categoryLabelAr: 'ورقيات وأعشاب',
    categoryLabelEn: 'Leafy Greens',
    image: '/images/products/kale.jpg',
    isFeatured: true,
  },
  {
    id: 'prod-berry',
    slug: 'blueberry',
    nameAr: 'توت أزرق مختار',
    nameEn: 'Select Blueberries',
    category: 'berries',
    categoryLabelAr: 'توتيات',
    categoryLabelEn: 'Berries',
    image: '/images/products/blueberry.jpg',
    isFeatured: true,
  },

  // 2. High-Demand Commercial Produce
  {
    id: 'prod-tomato',
    slug: 'tomato',
    nameAr: 'طماطم محمية',
    nameEn: 'Vine Tomatoes',
    category: 'vine',
    categoryLabelAr: 'خضروات ثمرية',
    categoryLabelEn: 'Vine Produce',
    image: '/images/products/tomato.jpg',
  },
  {
    id: 'prod-cucumber',
    slug: 'cucumber',
    nameAr: 'خيار بلدي',
    nameEn: 'Fresh Cucumber',
    category: 'vine',
    categoryLabelAr: 'خضروات ثمرية',
    categoryLabelEn: 'Vine Produce',
    image: '/images/products/cucumber.jpg',
  },
  {
    id: 'prod-strawberry',
    slug: 'strawberry',
    nameAr: 'فراولة طازجة',
    nameEn: 'Fresh Strawberry',
    category: 'berries',
    categoryLabelAr: 'توتيات',
    categoryLabelEn: 'Berries',
    image: '/images/products/strawberry.jpg',
  },
  {
    id: 'prod-grapes',
    slug: 'green-grapes',
    nameAr: 'عنب مائدة أبيض',
    nameEn: 'Table Green Grapes',
    category: 'fruits',
    categoryLabelAr: 'فواكه',
    categoryLabelEn: 'Fruits',
    image: '/images/products/green-grapes.jpg',
  },
  {
    id: 'prod-pepper',
    slug: 'red-pepper',
    nameAr: 'فلفل ألوان محمي',
    nameEn: 'Sweet Bell Peppers',
    category: 'vine',
    categoryLabelAr: 'خضروات ثمرية',
    categoryLabelEn: 'Vine Produce',
    image: '/images/products/red-pepper.jpg',
  },
  {
    id: 'prod-pomegranate',
    slug: 'pomegranate',
    nameAr: 'رمان يمني / محلي',
    nameEn: 'Fresh Pomegranate',
    category: 'fruits',
    categoryLabelAr: 'فواكه',
    categoryLabelEn: 'Fruits',
    image: '/images/products/pomegranate.jpg',
  },
  {
    id: 'prod-lettuce',
    slug: 'lettuce',
    nameAr: 'خس كابوتشا',
    nameEn: 'Iceberg Lettuce',
    category: 'leaf',
    categoryLabelAr: 'ورقيات وأعشاب',
    categoryLabelEn: 'Leafy Greens',
    image: '/images/products/lettuce.jpg',
  },
  {
    id: 'prod-lemon',
    slug: 'lemon',
    nameAr: 'ليمون أصفر',
    nameEn: 'Fresh Lemon',
    category: 'citrus',
    categoryLabelAr: 'حمضيات',
    categoryLabelEn: 'Citrus',
    image: '/images/products/lemon.jpg',
  },
];
