import { VkBadge } from "./ui";
import { OrnamentRule } from "./ui";
import { BRANCHES, RESTAURANT } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-red-700 text-white">
      <OrnamentRule />
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <img src="/img/brand/logo.webp" alt="" className="h-10 w-10 rounded-full border border-white/30 object-cover" />
          <div>
            <p className="font-display text-lg text-white">{RESTAURANT.name}</p>
            <p className="text-xs text-white/70">{RESTAURANT.slogan}</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80" aria-label="Навигация в подвале">
          <a href="#price" className="transition-colors hover:text-white">Цены</a>
          <a href="#menu" className="transition-colors hover:text-white">Меню</a>
          <a href="#branches" className="transition-colors hover:text-white">Рестораны</a>
          <a href={RESTAURANT.vk} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            <VkBadge small />
            ВКонтакте
          </a>
        </nav>
        <p className="text-xs leading-relaxed text-white/60">
          © 2026 · {BRANCHES.length} ресторана в Санкт-Петербурге
          <br />
          Цены и меню: официальное меню сети
        </p>
      </div>
    </footer>
  );
}
