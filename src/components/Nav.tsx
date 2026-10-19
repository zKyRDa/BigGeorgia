import { useEffect, useState } from "react";
import { CalendarBlank, List, X } from "@phosphor-icons/react";
import { RESTAURANT } from "../data/content";

const LINKS = [
  { href: "#price", label: "Цены" },
  { href: "#menu", label: "Меню" },
  { href: "#branches", label: "Рестораны" },
];

export default function Nav({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-white/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <img
            src="/img/brand/logo.webp"
            alt="Логотип «Большая грузинская кухня»"
            className="h-11 w-11 shrink-0 rounded-full border border-line object-cover"
            width={44}
            height={44}
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg text-ink">Большая грузинская кухня</span>
            <span className="block text-[11px] uppercase tracking-[0.22em] text-faint">Санкт-Петербург · 3 адреса</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink-soft transition-colors hover:text-red-600">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onBook}
            className="hidden items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-700 hover:shadow-glow sm:inline-flex"
          >
            <CalendarBlank size={17} weight="bold" />
            Забронировать стол
          </button>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white/95 px-5 py-5 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Мобильная навигация">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base text-ink-soft">
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onBook();
              }}
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              <CalendarBlank size={17} weight="bold" />
              Забронировать стол
            </button>
            <p className="text-xs text-faint">{RESTAURANT.name} · сеть грузинских ресторанов</p>
          </nav>
        </div>
      )}
    </header>
  );
}
