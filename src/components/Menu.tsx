import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, CaretLeft, CaretRight, Flame } from "@phosphor-icons/react";
import { Reveal, SectionHeading } from "./ui";
import { DISH_GALLERY, LUNCH_SETS, MENU_SECTIONS, PRICING } from "../data/content";
import type { Photo } from "../data/content";

const TABS = [...MENU_SECTIONS, { id: "lunch", title: "Обеды", items: [] }];

export default function Menu({ onPhoto }: { onPhoto: (photos: Photo[], index: number) => void }) {
  const [active, setActive] = useState("hits");
  const section = MENU_SECTIONS.find((s) => s.id === active);
  const tabsRef = useRef<HTMLDivElement>(null);
  const hitsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (delta: number) => {
    tabsRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  const scrollHits = (delta: number) => {
    hitsRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section id="menu" className="border-y border-line bg-bg">
      <div className="mx-auto max-w-[1280px] px-5 py-24 md:px-8 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Меню с фотографиями"
            title="От пхали до рибая"
            sub="Больше восьмидесяти блюд: хинкали ручной лепки, хачапури из тандыра, кеци и мангал. Листайте фотографии хитов, выбирайте раздел и приходите голодными."
          />
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => scrollTabs(-240)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-red-600/60 hover:text-red-600"
              aria-label="Прокрутить разделы меню влево"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              onClick={() => scrollTabs(240)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-red-600/60 hover:text-red-600"
              aria-label="Прокрутить разделы меню вправо"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        <div className="relative mt-12">
          <div
            ref={tabsRef}
            className="menu-scrollbar flex gap-2.5 overflow-x-auto pb-4 pt-1.5 px-1 scroll-smooth"
            role="tablist"
            aria-label="Разделы меню"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                onClick={() => setActive(t.id)}
                className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  active === t.id
                    ? "bg-red-600 text-white shadow-sm"
                    : "border border-line-strong bg-white text-ink-soft hover:border-red-600/50 hover:text-red-600"
                }`}
              >
                {t.title}
              </button>
            ))}
            <span aria-hidden="true" className="w-6 shrink-0" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {active === "hits" && (
              <div className="relative mt-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-faint">Фотографии хитов ({DISH_GALLERY.length})</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scrollHits(-280)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-red-600/60 hover:text-red-600"
                      aria-label="Предыдущие блюда"
                    >
                      <CaretLeft size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => scrollHits(280)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-red-600/60 hover:text-red-600"
                      aria-label="Следующие блюда"
                    >
                      <CaretRight size={16} weight="bold" />
                    </button>
                  </div>
                </div>

                <div
                  ref={hitsRef}
                  className="menu-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 pt-2 scroll-smooth md:mx-0 md:px-2"
                >
                  {DISH_GALLERY.map((p, i) => (
                    <button
                      key={p.src}
                      onClick={() => onPhoto(DISH_GALLERY, i)}
                      className="group w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-card text-left shadow-card transition-all hover:-translate-y-1 hover:border-red-500/50 hover:shadow-lg sm:w-[270px]"
                    >
                      <span className="relative block overflow-hidden">
                        <img
                          src={p.src}
                          alt={p.caption}
                          loading="lazy"
                          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink backdrop-blur">
                          <Camera size={16} />
                        </span>
                      </span>
                      <span className="block px-4 py-3 text-sm text-ink-soft">{p.caption}</span>
                    </button>
                  ))}
                  <span aria-hidden="true" className="w-4 shrink-0" />
                </div>
              </div>
            )}

        {active === "lunch" && (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {LUNCH_SETS.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <article className="h-full rounded-2xl border border-line bg-card p-6 shadow-card">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl text-ink">Обед №{s.num}</h3>
                    <span className="font-display text-2xl text-red-600">{PRICING.lunch.price}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.composition}</p>
                  <p className="mt-3 text-xs text-faint">Выход: {s.weight}</p>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {section && section.items.length > 0 && (
          <div className="mt-10">
            {section.unified ? (
              <p className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
                <Flame size={16} weight="fill" />
                Единая цена: {PRICING.day.price} в будни до 18:00 и {PRICING.evening.price} вечером и в выходные
              </p>
            ) : (
              <p className="mb-6 text-sm text-muted">{section.note}</p>
            )}
            <ul className="grid gap-x-12 md:grid-cols-2">
              {section.items.map((item) => (
                <li key={item.name} className="flex items-start gap-4 border-b border-line py-4">
                  {item.photo ? (
                    <button
                      onClick={() => onPhoto([{ src: item.photo!, caption: item.name }], 0)}
                      className="mt-0.5 shrink-0 overflow-hidden rounded-xl border border-line"
                      aria-label={`Фото блюда «${item.name}»`}
                    >
                      <img
                        src={item.photo}
                        alt={item.name}
                        loading="lazy"
                        className="h-16 w-16 object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </button>
                  ) : (
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-red-500/70" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[15px] font-medium text-ink">
                        {item.name}
                        {item.isHit && (
                          <span className="ml-2 rounded-full bg-red-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-600">
                            хит
                          </span>
                        )}
                      </h3>
                      <span className="shrink-0 text-right">
                        {item.price ? (
                          <span className="text-sm font-semibold text-red-600">{item.price}</span>
                        ) : section.unified ? (
                          <>
                            <span className="text-base font-bold text-red-600">290 ₽</span>
                            <span className="ml-1.5 text-xs text-faint">/ 350 ₽ вечером</span>
                          </>
                        ) : null}
                      </span>
                    </div>
                    {item.desc && <p className="mt-1 text-[13px] leading-relaxed text-muted">{item.desc}</p>}
                    {item.weight && <p className="mt-1 text-xs text-faint">{item.weight}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
