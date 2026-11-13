export type ProductCategory = 'veg' | 'leaf' | 'fruit';

export interface Product {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  category: ProductCategory;
  image: string;
}

export const PRODUCTS: Product[] = [
  // Vegetables (32)
  { id: '1', slug: 'tomato', nameAr: 'طماطم', nameEn: 'Tomato', category: 'veg', image: '/images/products/tomato.jpg' },
  { id: '2', slug: 'cucumber', nameAr: 'خيار', nameEn: 'Cucumber', category: 'veg', image: '/images/products/cucumber.jpg' },
  { id: '3', slug: 'potato', nameAr: 'بطاطس', nameEn: 'Potato', category: 'veg', image: '/images/products/potato.jpg' },
  { id: '4', slug: 'onion', nameAr: 'بصل أصفر', nameEn: 'Yellow onion', category: 'veg', image: '/images/products/onion.jpg' },
  { id: '5', slug: 'red-onion', nameAr: 'بصل أحمر', nameEn: 'Red onion', category: 'veg', image: '/images/products/red-onion.jpg' },
  { id: '6', slug: 'carrot', nameAr: 'جزر', nameEn: 'Carrot', category: 'veg', image: '/images/products/carrot.jpg' },
  { id: '7', slug: 'zucchini', nameAr: 'كوسا', nameEn: 'Zucchini', category: 'veg', image: '/images/products/zucchini.jpg' },
  { id: '8', slug: 'eggplant', nameAr: 'باذنجان', nameEn: 'Eggplant', category: 'veg', image: '/images/products/eggplant.jpg' },
  { id: '9', slug: 'green-pepper', nameAr: 'فلفل رومي أخضر', nameEn: 'Green bell pepper', category: 'veg', image: '/images/products/green-pepper.jpg' },
  { id: '10', slug: 'red-pepper', nameAr: 'فلفل ملوّن', nameEn: 'Bell pepper', category: 'veg', image: '/images/products/red-pepper.jpg' },
  { id: '11', slug: 'chili', nameAr: 'فلفل حار', nameEn: 'Chili pepper', category: 'veg', image: '/images/products/chili.jpg' },
  { id: '12', slug: 'sweet-potato', nameAr: 'بطاطا حلوة', nameEn: 'Sweet potato', category: 'veg', image: '/images/products/sweet-potato.jpg' },
  { id: '13', slug: 'broccoli', nameAr: 'بروكلي', nameEn: 'Broccoli', category: 'veg', image: '/images/products/broccoli.jpg' },
  { id: '14', slug: 'cauliflower', nameAr: 'قرنبيط', nameEn: 'Cauliflower', category: 'veg', image: '/images/products/cauliflower.jpg' },
  { id: '15', slug: 'corn', nameAr: 'ذرة', nameEn: 'Sweet corn', category: 'veg', image: '/images/products/corn.jpg' },
  { id: '16', slug: 'garlic', nameAr: 'ثوم', nameEn: 'Garlic', category: 'veg', image: '/images/products/garlic.jpg' },
  { id: '17', slug: 'ginger', nameAr: 'زنجبيل', nameEn: 'Ginger', category: 'veg', image: '/images/products/ginger.jpg' },
  { id: '18', slug: 'cabbage', nameAr: 'ملفوف', nameEn: 'Cabbage', category: 'veg', image: '/images/products/cabbage.jpg' },
  { id: '19', slug: 'red-cabbage', nameAr: 'ملفوف أحمر', nameEn: 'Red cabbage', category: 'veg', image: '/images/products/red-cabbage.jpg' },
  { id: '20', slug: 'beetroot', nameAr: 'شمندر', nameEn: 'Beetroot', category: 'veg', image: '/images/products/beetroot.jpg' },
  { id: '21', slug: 'radish', nameAr: 'فجل', nameEn: 'Radish', category: 'veg', image: '/images/products/radish.jpg' },
  { id: '22', slug: 'turnip', nameAr: 'لفت', nameEn: 'Turnip', category: 'veg', image: '/images/products/turnip.jpg' },
  { id: '23', slug: 'pumpkin', nameAr: 'قرع', nameEn: 'Pumpkin', category: 'veg', image: '/images/products/pumpkin.jpg' },
  { id: '24', slug: 'okra', nameAr: 'بامية', nameEn: 'Okra', category: 'veg', image: '/images/products/okra.jpg' },
  { id: '25', slug: 'green-beans', nameAr: 'فاصوليا خضراء', nameEn: 'Green beans', category: 'veg', image: '/images/products/green-beans.jpg' },
  { id: '26', slug: 'peas', nameAr: 'بازلاء', nameEn: 'Peas', category: 'veg', image: '/images/products/peas.jpg' },
  { id: '27', slug: 'celery', nameAr: 'كرفس', nameEn: 'Celery', category: 'veg', image: '/images/products/celery.jpg' },
  { id: '28', slug: 'leek', nameAr: 'كراث', nameEn: 'Leek', category: 'veg', image: '/images/products/leek.jpg' },
  { id: '29', slug: 'mushroom', nameAr: 'فطر', nameEn: 'Mushroom', category: 'veg', image: '/images/products/mushroom.jpg' },
  { id: '30', slug: 'spring-onion', nameAr: 'بصل أخضر', nameEn: 'Spring onion', category: 'veg', image: '/images/products/spring-onion.jpg' },
  { id: '31', slug: 'artichoke', nameAr: 'خرشوف', nameEn: 'Artichoke', category: 'veg', image: '/images/products/artichoke.jpg' },
  { id: '32', slug: 'asparagus', nameAr: 'هليون', nameEn: 'Asparagus', category: 'veg', image: '/images/products/asparagus.jpg' },

  // Leafy Greens & Herbs (12)
  { id: '33', slug: 'lettuce', nameAr: 'خس', nameEn: 'Lettuce', category: 'leaf', image: '/images/products/lettuce.jpg' },
  { id: '34', slug: 'romaine', nameAr: 'خس روماني', nameEn: 'Romaine lettuce', category: 'leaf', image: '/images/products/romaine.jpg' },
  { id: '35', slug: 'rocket', nameAr: 'جرجير', nameEn: 'Rocket', category: 'leaf', image: '/images/products/rocket.jpg' },
  { id: '36', slug: 'parsley', nameAr: 'بقدونس', nameEn: 'Parsley', category: 'leaf', image: '/images/products/parsley.jpg' },
  { id: '37', slug: 'mint', nameAr: 'نعناع', nameEn: 'Mint', category: 'leaf', image: '/images/products/mint.jpg' },
  { id: '38', slug: 'spinach', nameAr: 'سبانخ', nameEn: 'Spinach', category: 'leaf', image: '/images/products/spinach.jpg' },
  { id: '39', slug: 'coriander', nameAr: 'كزبرة', nameEn: 'Coriander', category: 'leaf', image: '/images/products/coriander.jpg' },
  { id: '40', slug: 'dill', nameAr: 'شبت', nameEn: 'Dill', category: 'leaf', image: '/images/products/dill.jpg' },
  { id: '41', slug: 'basil', nameAr: 'ريحان', nameEn: 'Basil', category: 'leaf', image: '/images/products/basil.jpg' },
  { id: '42', slug: 'chard', nameAr: 'سلق', nameEn: 'Swiss chard', category: 'leaf', image: '/images/products/chard.jpg' },
  { id: '43', slug: 'molokhia', nameAr: 'ملوخية', nameEn: 'Molokhia', category: 'leaf', image: '/images/products/molokhia.jpg' },
  { id: '44', slug: 'kale', nameAr: 'كيل', nameEn: 'Kale', category: 'leaf', image: '/images/products/kale.jpg' },

  // Fruits (31)
  { id: '45', slug: 'apple', nameAr: 'تفاح أحمر', nameEn: 'Red apple', category: 'fruit', image: '/images/products/apple.jpg' },
  { id: '46', slug: 'green-apple', nameAr: 'تفاح أخضر', nameEn: 'Green apple', category: 'fruit', image: '/images/products/green-apple.jpg' },
  { id: '47', slug: 'orange', nameAr: 'برتقال', nameEn: 'Orange', category: 'fruit', image: '/images/products/orange.jpg' },
  { id: '48', slug: 'mandarin', nameAr: 'يوسفي', nameEn: 'Mandarin', category: 'fruit', image: '/images/products/mandarin.jpg' },
  { id: '49', slug: 'lemon', nameAr: 'ليمون', nameEn: 'Lemon', category: 'fruit', image: '/images/products/lemon.jpg' },
  { id: '50', slug: 'lime', nameAr: 'ليمون أخضر', nameEn: 'Lime', category: 'fruit', image: '/images/products/lime.jpg' },
  { id: '51', slug: 'grapefruit', nameAr: 'جريب فروت', nameEn: 'Grapefruit', category: 'fruit', image: '/images/products/grapefruit.jpg' },
  { id: '52', slug: 'green-grapes', nameAr: 'عنب أخضر', nameEn: 'Green grapes', category: 'fruit', image: '/images/products/green-grapes.jpg' },
  { id: '53', slug: 'red-grapes', nameAr: 'عنب أحمر', nameEn: 'Red grapes', category: 'fruit', image: '/images/products/red-grapes.jpg' },
  { id: '54', slug: 'banana', nameAr: 'موز', nameEn: 'Banana', category: 'fruit', image: '/images/products/banana.jpg' },
  { id: '55', slug: 'strawberry', nameAr: 'فراولة', nameEn: 'Strawberry', category: 'fruit', image: '/images/products/strawberry.jpg' },
  { id: '56', slug: 'pomegranate', nameAr: 'رمان', nameEn: 'Pomegranate', category: 'fruit', image: '/images/products/pomegranate.jpg' },
  { id: '57', slug: 'mango', nameAr: 'مانجو', nameEn: 'Mango', category: 'fruit', image: '/images/products/mango.jpg' },
  { id: '58', slug: 'peach', nameAr: 'خوخ', nameEn: 'Peach', category: 'fruit', image: '/images/products/peach.jpg' },
  { id: '59', slug: 'nectarine', nameAr: 'نكتارين', nameEn: 'Nectarine', category: 'fruit', image: '/images/products/nectarine.jpg' },
  { id: '60', slug: 'plum', nameAr: 'برقوق', nameEn: 'Plum', category: 'fruit', image: '/images/products/plum.jpg' },
  { id: '61', slug: 'apricot', nameAr: 'مشمش', nameEn: 'Apricot', category: 'fruit', image: '/images/products/apricot.jpg' },
  { id: '62', slug: 'pear', nameAr: 'كمثرى', nameEn: 'Pear', category: 'fruit', image: '/images/products/pear.jpg' },
  { id: '63', slug: 'kiwi', nameAr: 'كيوي', nameEn: 'Kiwi', category: 'fruit', image: '/images/products/kiwi.jpg' },
  { id: '64', slug: 'watermelon', nameAr: 'بطيخ', nameEn: 'Watermelon', category: 'fruit', image: '/images/products/watermelon.jpg' },
  { id: '65', slug: 'cantaloupe', nameAr: 'شمام', nameEn: 'Cantaloupe', category: 'fruit', image: '/images/products/cantaloupe.jpg' },
  { id: '66', slug: 'pineapple', nameAr: 'أناناس', nameEn: 'Pineapple', category: 'fruit', image: '/images/products/pineapple.jpg' },
  { id: '67', slug: 'papaya', nameAr: 'بابايا', nameEn: 'Papaya', category: 'fruit', image: '/images/products/papaya.jpg' },
  { id: '68', slug: 'guava', nameAr: 'جوافة', nameEn: 'Guava', category: 'fruit', image: '/images/products/guava.jpg' },
  { id: '69', slug: 'fig', nameAr: 'تين', nameEn: 'Fig', category: 'fruit', image: '/images/products/fig.jpg' },
  { id: '70', slug: 'cherry', nameAr: 'كرز', nameEn: 'Cherry', category: 'fruit', image: '/images/products/cherry.jpg' },
  { id: '71', slug: 'avocado', nameAr: 'أفوكادو', nameEn: 'Avocado', category: 'fruit', image: '/images/products/avocado.jpg' },
  { id: '72', slug: 'blueberry', nameAr: 'توت أزرق', nameEn: 'Blueberry', category: 'fruit', image: '/images/products/blueberry.jpg' },
  { id: '73', slug: 'dates', nameAr: 'تمر', nameEn: 'Dates', category: 'fruit', image: '/images/products/dates.jpg' },
  { id: '74', slug: 'coconut', nameAr: 'جوز الهند', nameEn: 'Coconut', category: 'fruit', image: '/images/products/coconut.jpg' },
  { id: '75', slug: 'dragon-fruit', nameAr: 'فاكهة التنين', nameEn: 'Dragon fruit', category: 'fruit', image: '/images/products/dragon-fruit.jpg' },
];
