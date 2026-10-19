import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  CalendarBlank,
  Clock,
  Images,
  MapPin,
  Phone,
  Quotes,
  X,
} from "@phosphor-icons/react";
import { MetroBadge, RatingStars, Reveal, SectionHeading } from "./ui";
import { BRANCHES } from "../data/content";
import type { Branch, Photo } from "../data/content";

export default function Branches({
  onBook,
  onOpen,
}: {
  onBook: (branchId: Branch["id"]) => void;
  onOpen: (branchId: Branch["id"]) => void;
}) {
  return (
    <section id="branches" className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          eyebrow="Три адреса"
          title="Выберите свой ресторан"
          sub="Центр у Невского и Адмиралтейской и просторный зал на Туристской. Везде одно меню, одна цена и одно гостеприимство."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {BRANCHES.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.1} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/50 hover:shadow-xl">
                <button
                  onClick={() => onOpen(b.id)}
                  className="relative block overflow-hidden text-left"
                  aria-label={`Фотографии ресторана: ${b.address}`}
                >
                  <img
                    src={b.cover.src}
                    alt={b.cover.caption}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
                  <span className="absolute bottom-4 left-5 flex items-center gap-2 text-xs text-white/95">
                    <Images size={16} />
                    {b.gallery.length} фото интерьера
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs backdrop-blur">
                    <span className="font-semibold text-red-600">{b.rating.value.toFixed(1)}</span>
                    <span className="text-ink-soft"> · {b.rating.count} оценок</span>
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-6">
                  <RatingStars value={b.rating.value} />
                  <h3 className="mt-3 font-display text-2xl text-ink">{b.name}</h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                    <MapPin size={15} className="shrink-0 text-red-600" />
                    {b.address}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {b.metro.map((m) => (
                      <MetroBadge key={m.name} {...m} />
                    ))}
                  </div>
                  <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                    <p className="flex items-center gap-2 text-muted">
                      <Clock size={15} className="text-red-600" />
                      {b.hours}
                    </p>
                    <a href={b.phoneHref} className="flex items-center gap-2 font-medium text-ink transition-colors hover:text-red-600">
                      <Phone size={15} className="text-red-600" />
                      {b.phone}
                    </a>
                  </div>
                  <div className="mt-6 flex gap-3 pt-1">
                    <button
                      onClick={() => onBook(b.id)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      <CalendarBlank size={16} weight="bold" />
                      Забронировать
                    </button>
                    <button
                      onClick={() => onOpen(b.id)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm text-ink transition-colors hover:border-red-600/50 hover:text-red-600"
                    >
                      Как выглядит
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BranchModal({
  branch,
  onClose,
  onBook,
  onPhoto,
}: {
  branch: Branch | null;
  onClose: () => void;
  onBook: (branchId: Branch["id"]) => void;
  onPhoto: (photos: Photo[], index: number) => void;
}) {
  return (
    <AnimatePresence>
      {branch && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/50 p-4 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Ресторан ${branch.address}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-line bg-white shadow-card"
          >
            <div className="relative">
              <img src={branch.cover.src} alt={branch.cover.caption} className="h-52 w-full object-cover md:h-64" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur transition-colors hover:bg-red-600"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 text-sm text-white/95">
                  <RatingStars value={branch.rating.value} />
                  <span>
                    {branch.rating.value.toFixed(1)} · {branch.rating.count} оценок на Яндекс Картах
                  </span>
                </div>
                <h3 className="mt-1 font-display text-3xl text-white">{branch.address}</h3>
              </div>
            </div>

            <div className="grid gap-10 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-faint">Как выглядит ресторан</h4>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {branch.gallery.map((p, i) => (
                    <button
                      key={p.src}
                      onClick={() => onPhoto(branch.gallery, i)}
                      className="group overflow-hidden rounded-xl border border-line"
                      aria-label={p.caption}
                    >
                      <img
                        src={p.src}
                        alt={p.caption}
                        loading="lazy"
                        className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                      />
                    </button>
                  ))}
                </div>

                <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-faint">Отзывы гостей</h4>
                <div className="mt-4 space-y-4">
                  {branch.reviews.map((r) => (
                    <blockquote key={r.author} className="rounded-2xl border border-line bg-surface p-5">
                      <Quotes size={18} className="text-red-600" weight="fill" />
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.text}</p>
                      <footer className="mt-3 text-xs text-faint">
                        {r.author} · оценка {r.rating}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>

              <aside className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-faint">Особенности</h4>
                  <ul className="mt-4 space-y-2.5">
                    {branch.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-red-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2.5 rounded-2xl border border-line bg-surface p-5 text-sm">
                  <p className="flex items-center gap-2 text-muted">
                    <MapPin size={16} className="shrink-0 text-red-600" />
                    {branch.address}
                  </p>
                  <p className="flex items-center gap-2 text-muted">
                    <Clock size={16} className="shrink-0 text-red-600" />
                    {branch.hours}
                  </p>
                  <a href={branch.phoneHref} className="flex items-center gap-2 font-medium text-ink hover:text-red-600">
                    <Phone size={16} className="shrink-0 text-red-600" />
                    {branch.phone}
                  </a>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {branch.metro.map((m) => (
                      <MetroBadge key={m.name} {...m} />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onBook(branch.id)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <CalendarBlank size={17} weight="bold" />
                  Забронировать стол здесь
                </button>
                <a
                  href={branch.yandexUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-ink transition-colors hover:border-red-600/50 hover:text-red-600"
                >
                  Маршрут на Яндекс Картах
                  <ArrowUpRight size={16} />
                </a>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
