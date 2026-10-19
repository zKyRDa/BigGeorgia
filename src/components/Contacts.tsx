import { ArrowUpRight, Clock, MapPin, Phone } from "@phosphor-icons/react";
import { Reveal, SectionHeading, VkBadge } from "./ui";
import { BRANCHES, RESTAURANT } from "../data/content";

export default function Contacts({ onBook }: { onBook: (id: (typeof BRANCHES)[number]["id"]) => void }) {
  return (
    <section id="contacts" className="border-t border-line bg-bg">
      <div className="mx-auto max-w-[1280px] px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          eyebrow="Контакты"
          title="Мы рядом, где бы вы ни гуляли"
          sub="Позвоните, напишите ВКонтакте или просто приходите: в будни до 18:00 всё меню по 290 ₽."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {BRANCHES.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-3xl border border-line bg-card p-6 shadow-card">
                <h3 className="font-display text-xl text-ink">{b.shortAddress}</h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-muted">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-red-600" />
                  {b.address}
                </p>
                <a href={b.phoneHref} className="mt-3 flex items-center gap-2 text-lg font-semibold text-ink transition-colors hover:text-red-600">
                  <Phone size={17} className="text-red-600" />
                  {b.phone}
                </a>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                  <Clock size={15} className="text-red-600" />
                  {b.hours}
                </p>
                <div className="mt-6 flex gap-3 border-t border-line pt-4">
                  <button
                    onClick={() => onBook(b.id)}
                    className="flex-1 rounded-full bg-red-soft px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                  >
                    Бронь
                  </button>
                  <a
                    href={b.yandexUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line-strong px-4 py-2.5 text-sm text-ink transition-colors hover:border-red-600/50 hover:text-red-600"
                  >
                    Карта
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-card p-6 shadow-card md:flex-row md:items-center md:p-8">
            <div>
              <h3 className="font-display text-2xl text-ink">Сообщество «{RESTAURANT.vkLabel}»</h3>
              <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted">
                Анонсы сезонных блюд, новости о четвёртом ресторане на Балканской, 17 и живые фотографии из залов.
              </p>
            </div>
            <a
              href={RESTAURANT.vk}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand-teal hover:text-brand-teal"
            >
              <VkBadge />
              Подписаться
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
