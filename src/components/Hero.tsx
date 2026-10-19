import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, CalendarBlank, ForkKnife, MapPin, Star } from "@phosphor-icons/react";
import { Eyebrow, OrnamentRule } from "./ui";
import { PRICING } from "../data/content";

export default function Hero({ onBook }: { onBook: () => void }) {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="ornament-bg relative overflow-hidden bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-20%] h-[560px] w-[560px] rounded-full bg-red-500/10 blur-[130px]"
      />
      <div className="mx-auto grid min-h-[100dvh] max-w-[1280px] items-center gap-12 px-5 pb-16 pt-[110px] md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow>Сеть грузинских ресторанов · Санкт-Петербург</Eyebrow>
          <h1 className="font-display text-5xl leading-[1.04] tracking-tight text-ink sm:text-6xl xl:text-7xl">
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              Большая
            </motion.span>
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              грузинская
            </motion.span>
            <motion.span
              className="block text-red-600"
              initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}
            >
              кухня
            </motion.span>
          </h1>
          <motion.p
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted"
            initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            Хинкали ручной лепки, хачапури из тандыра и оджахури в кеци. Все основные блюда
            по одной цене, а гостеприимство как в Тбилиси.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onBook}
              className="inline-flex items-center gap-2.5 rounded-full bg-red-600 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-red-700 hover:shadow-glow active:scale-[0.98]"
            >
              <CalendarBlank size={19} weight="bold" />
              Забронировать стол
            </button>
            <a
              href="#menu"
              className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-7 py-3.5 text-base text-ink transition-colors hover:border-red-600/50 hover:text-red-600 active:scale-[0.98]"
            >
              <ForkKnife size={19} />
              Смотреть меню
            </a>
          </motion.div>

          <motion.dl
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <dt className="min-h-8 text-[11px] uppercase tracking-[0.18em] text-faint">Будни до 18:00</dt>
              <dd className="mt-1 font-display text-4xl text-red-600">{PRICING.day.price}</dd>
            </div>
            <div>
              <dt className="min-h-8 text-[11px] uppercase tracking-[0.18em] text-faint">Вечер и выходные</dt>
              <dd className="mt-1 font-display text-4xl text-red-600">{PRICING.evening.price}</dd>
            </div>
            <div>
              <dt className="min-h-8 text-[11px] uppercase tracking-[0.18em] text-faint">Адресов в городе</dt>
              <dd className="mt-1 font-display text-4xl text-ink">3</dd>
            </div>
          </motion.dl>
        </motion.div>

        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[28px] border border-line shadow-card">
            <img
              src="/img/hero/main.webp"
              alt="Хинкали и хачапури по-аджарски в ресторане «Большая грузинская кухня»"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/5.4]"
              width={1500}
              height={1700}
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
            <OrnamentRule className="absolute inset-x-0 top-4" />
            <p className="absolute bottom-5 left-6 right-6 font-display text-xl text-white">
              Хинкали и хачапури по-аджарски
            </p>
          </div>

          <motion.div
            className="absolute -right-3 -top-5 flex h-28 w-28 rotate-6 flex-col items-center justify-center rounded-full bg-red-600 text-center text-white shadow-glow sm:-right-6"
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 14 }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">всё по</span>
            <span className="font-display text-3xl leading-none">290 ₽</span>
            <span className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-white/85">будни до 18:00</span>
          </motion.div>

          <motion.div
            className="absolute -left-4 top-10 flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:-left-8"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-soft text-red-600">
              <Star size={20} weight="fill" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">5.0 на Яндекс Картах</span>
              <span className="block text-xs text-muted">более 1800 оценок гостей</span>
            </span>
          </motion.div>

          <motion.div
            className="absolute -right-3 bottom-10 flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:-right-6"
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-soft text-red-600">
              <MapPin size={20} weight="duotone" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">Невский, 54 · Кирпичный, 3</span>
              <span className="block text-xs text-muted">и Туристская, 34</span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#price"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.22em] text-faint transition-colors hover:text-red-600 md:flex"
        aria-label="Прокрутить к ценам"
      >
        <ArrowDown size={14} className="animate-bounce" />
        одна цена на всё
      </a>
    </section>
  );
}
