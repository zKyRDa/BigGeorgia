export type Photo = { src: string; caption: string };

export type Review = { author: string; rating: number; text: string };

export type Branch = {
  id: "nevsky" | "kirpichny" | "turistskaya";
  name: string;
  address: string;
  shortAddress: string;
  phone: string;
  phoneHref: string;
  hours: string;
  coords: [number, number];
  metro: { name: string; distance: string }[];
  rating: { value: number; count: number };
  features: string[];
  reviews: Review[];
  cover: Photo;
  gallery: Photo[];
  yandexUrl: string;
};

export type MenuItem = {
  name: string;
  weight?: string;
  desc?: string;
  price?: string;
  photo?: string;
  isHit?: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  unified?: boolean;
  note?: string;
  items: MenuItem[];
};

export const RESTAURANT = {
  name: "Большая грузинская кухня",
  slogan: "Грузинские блюда по единой привлекательной цене",
  city: "Санкт-Петербург",
  vk: "https://vk.com/bgk_spb",
  vkLabel: "vk.com/bgk_spb",
};

export const PRICING = {
  day: { price: "290 ₽", time: "Пн–Пт до 18:00", note: "единая цена на все основные блюда" },
  evening: { price: "350 ₽", time: "будни после 18:00, сб, вс и праздники", note: "единая цена на все основные блюда" },
  lunch: { price: "450 ₽", time: "обеды по будням с 12:00 до 16:00", note: "салат или суп + горячее + чай/морс и хлеб" },
  note: "Единая цена не действует на разделы PRIME, гарниры, соусы и лепёшку.",
};

export const BRANCHES: Branch[] = [
  {
    id: "nevsky",
    name: "На Невском проспекте",
    address: "Санкт-Петербург, Невский просп., 54",
    shortAddress: "Невский пр., 54",
    phone: "+7 (812) 929-94-54",
    phoneHref: "tel:+78129299454",
    hours: "ежедневно 11:00–23:30",
    coords: [30.336071, 59.934384],
    metro: [
      { name: "Гостиный двор", distance: "163 м" },
      { name: "Невский проспект", distance: "295 м" },
    ],
    rating: { value: 5.0, count: 986 },
    features: ["Средний счёт 400–800 ₽", "Кофе с собой и еда навынос", "Оплата картой и по QR-коду", "Двухуровневый зал с балконом"],
    reviews: [
      {
        author: "Ирина К., Яндекс Карты",
        rating: 5,
        text: "Недавно побывали с семьей в «Большой грузинской кухне» и остались в полном восторге! С порога чувствуется атмосфера настоящего кавказского гостеприимства.",
      },
      {
        author: "Александр П., Яндекс Карты",
        rating: 5,
        text: "Очень вкусно. Брали цыплёнка шкмерули, салат с баклажанами, тбилисский салат, люля с говядиной, шашлыки и хачапури по-аджарски. За 350 рублей отлично.",
      },
    ],
    cover: { src: "/img/branches/nevsky/cover.webp", caption: "Двухуровневый зал на Невском, 54" },
    gallery: [
      { src: "/img/branches/nevsky/cover.webp", caption: "Двухуровневый зал с балконом" },
      { src: "/img/branches/nevsky/g01.webp", caption: "Тёплый зал с деревом и зеленью" },
      { src: "/img/branches/nevsky/g04.webp", caption: "Круговой зал с гирляндами" },
      { src: "/img/branches/nevsky/g05.webp", caption: "Вечерняя посадка" },
      { src: "/img/branches/nevsky/g06.webp", caption: "Разноцветные стулья и балкон" },
      { src: "/img/branches/nevsky/g07.webp", caption: "Зал с живой зеленью" },
      { src: "/img/branches/nevsky/g08.webp", caption: "Светлая дневная посадка" },
      { src: "/img/branches/nevsky/g02.webp", caption: "Столик у входа" },
      { src: "/img/branches/nevsky/g09.webp", caption: "Вход с Невского проспекта" },
      { src: "/img/branches/nevsky/g10.webp", caption: "Фасад на Невском, 54" },
      { src: "/img/branches/nevsky/g11.webp", caption: "Юные гости за обедом" },
    ],
    yandexUrl: "https://yandex.ru/maps/org/bolshaya_gruzinskaya/1083907080/",
  },
  {
    id: "kirpichny",
    name: "У Адмиралтейской",
    address: "Санкт-Петербург, Кирпичный пер., 3",
    shortAddress: "Кирпичный пер., 3",
    phone: "+7 (812) 934-92-00",
    phoneHref: "tel:+78129349200",
    hours: "ежедневно 11:00–23:30",
    coords: [30.315559, 59.935717],
    metro: [
      { name: "Адмиралтейская", distance: "19 м" },
      { name: "Гостиный двор", distance: "800 м" },
    ],
    rating: { value: 5.0, count: 898 },
    features: ["Доставка: Яндекс Еда и Delivery Club", "Оплата картой, СБП и QR-кодом", "Отдельный вход с улицы", "Залы для больших компаний"],
    reviews: [
      {
        author: "Ksu, Яндекс Карты",
        rating: 5,
        text: "Случайно зашли, и именно это место спасло наш день. Очень вкусная и сытная еда, приятные официантки. Обязательно вернёмся попробовать что-то ещё.",
      },
      {
        author: "Vladmin, Яндекс Карты",
        rating: 4,
        text: "Провели вечер с друзьями, впечатления хорошие. Обстановка приличная, три зала, меню разнообразное, всё вкусно.",
      },
    ],
    cover: { src: "/img/branches/kirpichny/cover.webp", caption: "Уютный зал в Кирпичном пер., 3" },
    gallery: [
      { src: "/img/branches/kirpichny/cover.webp", caption: "Диваны и плетёные лампы" },
      { src: "/img/branches/kirpichny/g02.webp", caption: "Зал с винными постерами" },
      { src: "/img/branches/kirpichny/g03.webp", caption: "Красные кресла и дерево" },
      { src: "/img/branches/kirpichny/g04.webp", caption: "Основной зал" },
      { src: "/img/branches/kirpichny/g05.webp", caption: "Мягкие диваны у окна" },
      { src: "/img/branches/kirpichny/g06.webp", caption: "Столик у окна с видом на переулок" },
      { src: "/img/branches/kirpichny/g07.webp", caption: "Фасад в Кирпичном пер., 3" },
      { src: "/img/branches/kirpichny/g08.webp", caption: "Вход и летняя веранда" },
      { src: "/img/branches/kirpichny/g09.webp", caption: "Семейный обед" },
      { src: "/img/branches/kirpichny/g10.webp", caption: "Большая компания за столом" },
    ],
    yandexUrl: "https://yandex.ru/maps/org/44925903745/",
  },
  {
    id: "turistskaya",
    name: "На Туристской",
    address: "Санкт-Петербург, Туристская ул., 34, этаж 1",
    shortAddress: "Туристская ул., 34",
    phone: "+7 (921) 865-00-50",
    phoneHref: "tel:+79218650050",
    hours: "ежедневно 11:00–23:00",
    coords: [30.211771, 60.007722],
    metro: [
      { name: "Беговая", distance: "2,6 км" },
      { name: "Комендантский пр.", distance: "3,4 км" },
    ],
    rating: { value: 4.3, count: 77 },
    features: ["Светлый просторный зал", "Сцена и большой экран", "Рядом ТРК «Охта Молл»", "Мягкие диваны и кресла"],
    reviews: [
      {
        author: "Дмитрий К., Яндекс Карты",
        rating: 5,
        text: "Всё как я люблю! Огромное светлое помещение, много воздуха и мест, удобные столы и диванчики. Будни до 18:00 по 290, вечером и в выходные по 350.",
      },
      {
        author: "Ангелина С., Яндекс Карты",
        rating: 5,
        text: "Приятно удивлены: еда вкусная и горячая, салаты отличные, хрустящие баклажаны шикарны, шашлык нежный и сочный, подача хорошая.",
      },
    ],
    cover: { src: "/img/branches/turistskaya/cover.webp", caption: "Просторный зал на Туристской, 34" },
    gallery: [
      { src: "/img/branches/turistskaya/cover.webp", caption: "Красные шторы и кресла" },
      { src: "/img/branches/turistskaya/g01.webp", caption: "Светлый просторный зал" },
      { src: "/img/branches/turistskaya/g02.webp", caption: "Диваны и зелень" },
      { src: "/img/branches/turistskaya/g04.webp", caption: "Мягкая посадка" },
      { src: "/img/branches/turistskaya/g05.webp", caption: "Белые кресла и дерево" },
      { src: "/img/branches/turistskaya/g08.webp", caption: "Столик с хачапури" },
      { src: "/img/branches/turistskaya/g06.webp", caption: "Рядом ТРК «Охта Молл»" },
      { src: "/img/branches/turistskaya/g07.webp", caption: "Неоновая вывеска ресторана" },
    ],
    yandexUrl: "https://yandex.ru/maps/org/147563464231/",
  },
];

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: "hits",
    title: "Хиты и фото",
    items: [],
  },
  {
    id: "cold",
    title: "Холодные закуски",
    unified: true,
    items: [
      { name: "Пхали из свёклы", weight: "150 г", photo: "/img/dishes/pkhali.webp" },
      { name: "Пхали из зелёной фасоли", weight: "150 г" },
      { name: "Рулетики из баклажанов с сыром", weight: "170 г", photo: "/img/dishes/eggplant-rolls.webp" },
      { name: "Куриный паштет", weight: "100/60 г" },
      { name: "Овощная тарелка", weight: "330 г" },
      { name: "Соленья", weight: "300 г" },
      { name: "Курица сациви", weight: "200 г" },
      { name: "Баклажанная икра", weight: "200/80 г" },
      { name: "Чаки с овощами и зеленью", weight: "100/70/110 г", desc: "домашний сыр, зелень, огурцы, редис, кинза, грузинская лепёшка" },
    ],
  },
  {
    id: "salads",
    title: "Салаты",
    unified: true,
    items: [
      { name: "Салат с хрустящими баклажанами и фетой", weight: "230 г", isHit: true, photo: "/img/dishes/salad-eggplant.webp", desc: "жареные баклажаны, спелые томаты, фета, кинза, сладкий чили" },
      { name: "Тёплый салат с говядиной и баклажанами", weight: "200 г", photo: "/img/dishes/beef-salad.webp" },
      { name: "Салат по-грузински", weight: "275 г" },
      { name: "Цезарь по-грузински с цыплёнком", weight: "210 г", photo: "/img/dishes/caesar.webp" },
      { name: "Салат Тбилиси с говядиной и красной фасолью", weight: "200 г" },
      { name: "Салат со свёклой, имеретинским сыром и орехами", weight: "240 г" },
      { name: "Овощной салат", weight: "220 г", photo: "/img/dishes/salads-duo.webp" },
      { name: "Салат с форелью", weight: "245 г" },
      { name: "Салат с пастрами", weight: "260 г" },
    ],
  },
  {
    id: "hot-appetizers",
    title: "Горячие закуски",
    unified: true,
    items: [
      { name: "Жареный сулугуни с ягодным соусом", weight: "160 г" },
      { name: "Запечённые баклажаны с томатами и сыром", weight: "190 г" },
      { name: "Аджапсандал", weight: "300 г", photo: "/img/dishes/adjapsandali.webp", desc: "баклажаны, болгарский перец, томаты, чеснок, зелень" },
      { name: "Лобио «Харкалия»", weight: "330/100/80 г", desc: "фасоль, томаты, чеснок, зелень, маринованная капуста, лепёшка" },
      { name: "Гренки с копчёным сулугуни и чесноком", weight: "150 г" },
      { name: "Грибы с сыром", weight: "200 г" },
      { name: "Долма", weight: "250/50 г" },
    ],
  },
  {
    id: "soups",
    title: "Супы",
    unified: true,
    items: [
      { name: "Харчо", weight: "350 г", photo: "/img/dishes/kharcho.webp", desc: "пряный суп с говядиной, рисом, грецким орехом и ткемали" },
      { name: "Чихиртма", weight: "320 г", desc: "курица, яйцо, кинза, чеснок, специи" },
      { name: "Борщ в горшочке", weight: "350/50 г" },
      { name: "Рыбный суп", weight: "300 г" },
      { name: "Суп с мини-хинкали", weight: "300 г", photo: "/img/dishes/soup-khinkali.webp" },
    ],
  },
  {
    id: "pastry",
    title: "Хинкали и выпечка",
    unified: true,
    items: [
      { name: "Хинкали с говядиной и свининой (4 шт)", weight: "430 г", isHit: true, photo: "/img/dishes/khinkali-plate.webp", desc: "варёные или жареные, ручной лепки" },
      { name: "Хинкали с сыром (4 шт)", weight: "380 г", photo: "/img/dishes/khinkali-blue.webp" },
      { name: "Хинкали с бараниной", weight: "4 шт" },
      { name: "Хачапури по-аджарски", weight: "500 г", photo: "/img/dishes/adjaruli.webp", desc: "лодочка с рассольным сыром, маслом и желтком" },
      { name: "Хачапури по-мегрельски", weight: "500 г", photo: "/img/dishes/megruli.webp", desc: "сырный пирог с сулугуни и запечённой корочкой" },
      { name: "Хачапури по-имеретински", weight: "500 г" },
      { name: "Хачапури на шампуре", weight: "230 г", photo: "/img/dishes/khachapuri-skewer.webp" },
      { name: "Лобиани", weight: "210 г", photo: "/img/dishes/lobiani.webp", desc: "дрожжевое тесто, фасоль, лук, специи, зелень" },
      { name: "Кубдари со свининой или цыплёнком", weight: "390 г" },
      { name: "Чебуреки с мясом или сыром (2 шт)", weight: "180 г" },
      { name: "Хлеб шоти из тандыра", weight: "100 г", photo: "/img/dishes/shoti.webp" },
      { name: "Лепёшка грузинская", price: "50 ₽" },
    ],
  },
  {
    id: "hot",
    title: "Горячие блюда",
    unified: true,
    items: [
      { name: "Оджахури со свининой", weight: "330 г", isHit: true, photo: "/img/dishes/odzhakhuri.webp", desc: "свинина, картофель, черри, кинза, подаётся в кеци" },
      { name: "Оджахури с курицей", weight: "320 г" },
      { name: "Чкмерули", weight: "240 г", desc: "курица в сливочно-чесночном соусе с кинзой" },
      { name: "Чахохбили с цыплёнком", weight: "330 г" },
      { name: "Чашушули с говядиной", weight: "320 г" },
      { name: "Чанахи с говядиной", weight: "350/80 г" },
      { name: "Солянка по-грузински", weight: "300/15 г" },
      { name: "Жаркое по-грузински", weight: "310 г" },
      { name: "Куриная печень в соусе чкмерули", weight: "350 г" },
      { name: "Куриные котлеты с пюре", weight: "160/150/30 г" },
      { name: "Котлеты по-домашнему", weight: "130/150 г" },
      { name: "Яичница с томатами", weight: "330 г" },
      { name: "Жареная картошка с грибами и сыром", weight: "400 г" },
      { name: "Эларджи", weight: "310 г", desc: "сливочная кукурузная каша с сулугуни" },
      { name: "Стейк из форели с овощами", weight: "120 г", photo: "/img/dishes/fish-dish.webp" },
    ],
  },
  {
    id: "grill",
    title: "Шашлык и мангал",
    unified: true,
    items: [
      { name: "Шашлык из свинины", weight: "170/100 г", photo: "/img/dishes/shashlik.webp", desc: "с маринованным луком и соусом" },
      { name: "Шашлык из куриного бедра", weight: "170/100 г" },
      { name: "Шашлык из индейки", weight: "170/100 г" },
      { name: "Люля-кебаб из курицы", weight: "160/100 г", photo: "/img/dishes/lyulya.webp" },
      { name: "Люля-кебаб из говядины", weight: "160/100 г" },
      { name: "Овощной шашлык", weight: "130/100 г" },
    ],
  },
  {
    id: "prime",
    title: "PRIME-специалитеты",
    note: "блюда со своей ценой",
    items: [
      { name: "Мясное ассорти", weight: "200/80 г", price: "450 ₽", desc: "копчёная куриная грудка, ветчина, буженина, бекон" },
      { name: "Ассорти грузинских сыров", weight: "200 г", price: "450 ₽", desc: "сулугуни, чечил, копчёный чечил, имеретинский" },
      { name: "Свиные рёбра с соусом барбекю", weight: "300/40 г", price: "450 ₽" },
      { name: "Тальята из мраморной говядины", weight: "130/100 г", price: "550 ₽" },
      { name: "Рибай", weight: "260 г", price: "650 ₽" },
      { name: "Стейк из форели", weight: "120 г", price: "650 ₽" },
    ],
  },
  {
    id: "sides",
    title: "Гарниры",
    note: "по 200 ₽",
    items: [
      { name: "Картофель фри", weight: "120/50 г", price: "200 ₽" },
      { name: "Молодой картофель с зеленью и чесноком", weight: "200 г", price: "200 ₽" },
      { name: "Жареные овощи", weight: "130 г", price: "200 ₽" },
      { name: "Пюре картофельное", weight: "200 г", price: "200 ₽" },
    ],
  },
  {
    id: "sauces",
    title: "Соусы",
    note: "по 110 ₽ · 50 г",
    items: ["Аджика", "Ткемали", "Сацебели", "Сметана", "Мацони", "Тартар", "Наршараб", "Кетчуп"].map((n) => ({ name: n, price: "110 ₽" })),
  },
  {
    id: "desserts",
    title: "Десерты",
    unified: true,
    items: [
      { name: "Пахлава с грецким орехом и мёдом", weight: "150/60 г", photo: "/img/dishes/baklava.webp" },
      { name: "Шоколадный брауни с мороженым", weight: "130 г", photo: "/img/dishes/brownie.webp" },
      { name: "Медовик", weight: "150 г" },
      { name: "Наполеон", weight: "200 г" },
      { name: "Мама кейк", weight: "130 г" },
      { name: "Мороженое (3 шарика)", weight: "210 г" },
    ],
  },
];

export const LUNCH_SETS = [
  { num: 1, composition: "Чихиртма, котлета домашняя с пюре, овощной салат с яйцом, грузинский хлеб", weight: "320 / 55 / 150 / 220 / 60 г" },
  { num: 2, composition: "Суп с мини-хинкали, солянка по-грузински, салат по-грузински, грузинский хлеб", weight: "300 / 300 / 275 / 60 г" },
  { num: 3, composition: "Хинкали по-домашнему (3 шт), суп харчо с фасолью, овощной салат, грузинский хлеб", weight: "300 / 180 / 50 / 170 / 60 г" },
  { num: 4, composition: "Куриный бульон с зеленью и яйцом, люля-кебаб из курицы, пхали из свёклы (3 шт), грузинский хлеб", weight: "300 / 600 / 100 / 160 / 60 г" },
];

export const DISH_GALLERY: Photo[] = [
  { src: "/img/dishes/khinkali-studio.webp", caption: "Хинкали ручной лепки и шоти из тандыра" },
  { src: "/img/dishes/adjaruli.webp", caption: "Хачапури по-аджарски" },
  { src: "/img/dishes/salad-eggplant.webp", caption: "Салат с хрустящими баклажанами и фетой" },
  { src: "/img/dishes/odzhakhuri.webp", caption: "Оджахури со свининой в кеци" },
  { src: "/img/dishes/adjapsandali.webp", caption: "Аджапсандал и овощной салат" },
  { src: "/img/dishes/pkhali.webp", caption: "Пхали из свёклы" },
  { src: "/img/dishes/beef-salad.webp", caption: "Тёплый салат с говядиной и томаты с сулугуни" },
  { src: "/img/dishes/khinkali-plate.webp", caption: "Хинкали на белой тарелке" },
  { src: "/img/dishes/megruli.webp", caption: "Хачапури по-мегрельски" },
  { src: "/img/dishes/kharcho.webp", caption: "Харчо с хлебом шоти" },
  { src: "/img/dishes/lyulya.webp", caption: "Люля-кебаб с молодым картофелем" },
  { src: "/img/dishes/eggplant-rolls.webp", caption: "Рулетики из баклажанов с сыром" },
  { src: "/img/dishes/caesar.webp", caption: "Цезарь по-грузински с цыплёнком" },
  { src: "/img/dishes/lobiani.webp", caption: "Лобиани в кеци" },
  { src: "/img/dishes/baklava.webp", caption: "Пахлава с грецким орехом" },
  { src: "/img/dishes/brownie.webp", caption: "Шоколадный брауни с мороженым" },
  { src: "/img/dishes/blini.webp", caption: "Блины со сметаной и вишней" },
  { src: "/img/dishes/lemonade.webp", caption: "Грузинский лимонад" },
  { src: "/img/dishes/spread.webp", caption: "Грузинский стол: закуски и кеци" },
];

export const MARQUEE_ITEMS = [
  "Хинкали",
  "Хачапури по-аджарски",
  "Оджахури",
  "Пхали",
  "Харчо",
  "Шашлык",
  "Аджапсандал",
  "Чкмерули",
  "Лобио",
  "Пахлава",
  "Шоти из тандыра",
  "Грузинские лимонады",
];
