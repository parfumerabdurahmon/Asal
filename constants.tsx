
import { HoneyProduct } from './types';

export const UI_TEXT = {
  hero_badge: { uz: "Premium Tabiiy Asal", ru: "Премиальный Натуральный Мед" },
  hero_title_1: { uz: "Tabiatning Eng Toza", ru: "Чистейший Дар" },
  hero_title_2: { uz: "Oltin Tuhfasi", ru: "Природы" },
  hero_desc: { uz: "Dunyodagi eng toza hududlardan olingan 10 xil noyob, xom va organik asal to'plamimizni kashf eting.", ru: "Откройте нашу коллекцию из 10 уникальных видов сырого и органического меда, собранного в самых чистых уголках мира." },
  explore_btn: { uz: "To'plamni Ko'rish", ru: "Посмотреть Коллекцию" },
  call_btn: { uz: "Hoziroq Qo'ng'iroq Qiling", ru: "Позвонить Сейчас" },
  collection_title: { uz: "Bizning Maxsus To'plam", ru: "Наша Фирменная Коллекция" },
  collection_desc: { uz: "Akasiya nektaridan tortib Grechixa minerallarigacha - tabiatning barcha jilosini his eting.", ru: "От светлого нектара Акации до глубоких минералов Гречихи — ощутите весь спектр природы." },
  order_now: { uz: "Buyurtma Berish", ru: "Заказать Сейчас" },
  cta_title: { uz: "Mukammal Ta'mni Tatib Ko'rishga Tayyormisiz?", ru: "Готовы Попробовать Совершенство?" },
  cta_desc: { uz: "Telegram orqali to'g'ridan-to'g'ri buyurtma bering va yangi asalni eshigingizga yetkazib beramiz.", ru: "Заказывайте напрямую через Telegram, и мы доставим свежий мед прямо к вашему порогу." },
  follow_insta: { uz: "Instagramda Kuzating", ru: "Следите в Instagram" },
  contact_tg: { uz: "Telegram orqali bog'lanish", ru: "Связаться через Telegram" },
  badges: [
    { icon: "fa-leaf", label: { uz: "100% Organik", ru: "100% Органика" } },
    { icon: "fa-vial", label: { uz: "Laboratoriya Sinovi", ru: "Лаб. Контроль" } },
    { icon: "fa-droplet", label: { uz: "Filtrlangan", ru: "Нефильтрованный" } },
    { icon: "fa-shield-heart", label: { uz: "Tabiiy", ru: "Натуральный" } }
  ]
};

export const INITIAL_PRODUCTS: HoneyProduct[] = [
  {
    id: 1,
    name: { uz: "Tog' Guli Asali", ru: "Горное Разнотравье" },
    description: { uz: "Musaffo tog' yonbag'irlaridan yig'ilgan, minglab gullarning iforini o'zida jamlagan asal.", ru: "Собран на нетронутых горных лугах, этот мед воплощает дух тысячи цветов." },
    price: 120000,
    image: "https://images.unsplash.com/photo-1471943311424-646960669fba?auto=format&fit=crop&q=80&w=800",
    origin: { uz: "Tog'li Hududlar", ru: "Высокогорье" },
    flavorProfile: { uz: ["Gulli", "Yorqin", "Mayin"], ru: ["Цветочный", "Яркий", "Гладкий"] }
  },
  {
    id: 2,
    name: { uz: "Oltin Akasiya", ru: "Золотая Акация" },
    description: { uz: "Quyosh nuri kabi tiniq, choy va nafis shirinliklar uchun juda mos keladigan yengil asal.", ru: "Прозрачный как солнечный свет, этот легкий и нежный мед идеален для чая." },
    price: 150000,
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800",
    origin: { uz: "Daryo Vodiylari", ru: "Речные Долины" },
    flavorProfile: { uz: ["Yengil", "Shirin", "Tiniq"], ru: ["Мягкий", "Сладкий", "Чистый"] }
  },
  {
    id: 3,
    name: { uz: "O'rmon Manukasi", ru: "Лесная Манука" },
    description: { uz: "Boy va kuchli ta'm. O'zining shifobaxsh xususiyatlari va quyuq teksturasi bilan mashhur.", ru: "Богатый, землистый и мощный. Известен своими исключительными целебными свойствами." },
    price: 450000,
    image: "https://images.unsplash.com/photo-1566417713940-db559f41b3f7?auto=format&fit=crop&q=80&w=800",
    origin: { uz: "Qadimiy O'rmonlar", ru: "Древние Леса" },
    flavorProfile: { uz: ["Kuchli", "Shifobaxsh", "Quyuq"], ru: ["Крепкий", "Лечебный", "Густой"] }
  },
  {
    id: 4,
    name: { uz: "Apelsin Guli", ru: "Цветок Апельсина" },
    description: { uz: "Sitrusli va tetiklantiruvchi, bahorgi gullash paytida yig'ilgan noyob asal.", ru: "Цитрусовый и освежающий, собранный во время весеннего цветения апельсинов." },
    price: 130000,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=800",
    origin: { uz: "Sitrus Bog'lari", ru: "Цитрусовые Рощи" },
    flavorProfile: { uz: ["Sitrus", "Xushbo'y", "Yengil"], ru: ["Цитрус", "Цедра", "Легкий"] }
  },
  {
    id: 5,
    name: { uz: "To'q Grechixa", ru: "Темная Гречиха" },
    description: { uz: "Yuqori mineral tarkibiga ega, to'q qahrabo rangli va o'ziga xos ta'mli asal.", ru: "Смелый мед, напоминающий патоку, с высоким содержанием минералов." },
    price: 110000,
    image: "https://images.unsplash.com/photo-1590779033100-9f60705a013d?auto=format&fit=crop&q=80&w=800",
    origin: { uz: "Shimoliy Tekisliklar", ru: "Северные Равнины" },
    flavorProfile: { uz: ["Kuchli", "Solodli", "Mineral"], ru: ["Сильный", "Солодовый", "Минеральный"] }
  },
  {
    id: 6,
    name: { uz: "Lavanda Oltini", ru: "Золото Лаванды" },
    description: { uz: "Lavanda dalalarining tinchlantiruvchi ifori bilan to'yingan xushbo'y asal.", ru: "Пропитан успокаивающим ароматом лавандовых полей. Истинный аромат." },
    price: 180000,
    image: "https://images.unsplash.com/photo-1508515053963-70c7cc39dfb5?auto=format&fit=crop&q=80&w=800",
    origin: { uz: "Lavanda Dalalari", ru: "Лавандовое Плато" },
    flavorProfile: { uz: ["Giyohli", "Tinchlantiruvchi", "Xushbo'y"], ru: ["Травяной", "Успокаивающий", "Ароматный"] }
  },
  {
    id: 7,
    name: { uz: "Krem-Asal", ru: "Крем-Мед" },
    description: { uz: "Issiq nonda erib ketadigan sariyog' kabi mayin teksturaga ega asal.", ru: "Взбит до совершенства для намазывания, с маслянистой текстурой." },
    price: 95000,
    image: "https://images.unsplash.com/photo-1510003343711-204683526690?auto=format&fit=crop&q=80&w=800",
    origin: { uz: "Yalangliklar", ru: "Пастбища" },
    flavorProfile: { uz: ["Kremli", "Sutli", "Yumshoq"], ru: ["Кремовый", "Молочный", "Мягкий"] }
  },
  {
    id: 8,
    name: { uz: "Sidr Zahirasi", ru: "Сидр Резерв" },
    description: { uz: "Dunyodagi eng noyob asallardan biri, o'zining noyobligi va chuqur ta'mi bilan qadrlanadi.", ru: "Один из редчайших сортов меда в мире, ценимый за уникальность вкуса." },
    price: 950000,
    image: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=800",
    origin: { uz: "Cho'l Vodiylari", ru: "Пустынные Долины" },
    flavorProfile: { uz: ["Yong'oqli", "Intensiv", "Ekzotik"], ru: ["Ореховый", "Интенсивный", "Экзотичный"] }
  },
  {
    id: 9,
    name: { uz: "Evkalipt Shabadasi", ru: "Эвкалиптовый Бриз" },
    description: { uz: "Sovutuvchi, yalpizli iforga ega ushbu asal tomoq og'rig'ini yumshatish uchun juda foydali.", ru: "Прохладный мятный подтон делает этот мед идеальным для смягчения горла." },
    price: 140000,
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&q=80&w=800",
    origin: { uz: "Sohil O'rmonlari", ru: "Прибрежные Леса" },
    flavorProfile: { uz: ["Salqin", "Yalpizli", "Yangi"], ru: ["Прохладный", "Мятный", "Свежий"] }
  },
  {
    id: 10,
    name: { uz: "Mum-Asal", ru: "Мед в Сотах" },
    description: { uz: "To'g'ridan-to'g'ri uyadan olingan xom mum bo'laklari bilan birga yetkaziladigan toza asal.", ru: "Чистый мед с куском натуральных сот прямо из улья." },
    price: 160000,
    image: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&q=80&w=800",
    origin: { uz: "Oilaviy Umurtqalar", ru: "Семейные Пасеки" },
    flavorProfile: { uz: ["Xom", "Haqiqiy", "Tabiiy"], ru: ["Сырой", "Настоящий", "Текстурный"] }
  }
];

export const CONTACT = {
  instagram: "premium_parfumes_org",
  telegram: "khodja_dev",
  phone: "+998996909575"
};
