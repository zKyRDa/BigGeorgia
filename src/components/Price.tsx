import { motion } from "motion/react";
import { Coffee, MoonStars, SunHorizon } from "@phosphor-icons/react";
import { Reveal, SectionHeading } from "./ui";
import { PRICING } from "../data/content";

const CARDS = [
  { icon: SunHorizon, ...PRICING.day, title: "Днём в будни" },
  { icon: MoonStars, ...PRICING.evening, title: "Вечером и в выходные" },
  { icon: Coffee, ...PRICING.lunch, title: "Бизнес-обед" },
];

export default function Price() {
  return (
    <section id="price" className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          eyebrow="Честная арифметика"
          title="Одна цена на всё меню"
          sub="Никаких звёздочек и мелкого шрифта: основные блюда стоят одинаково, будь то хинкали, хачапури или оджахури."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group h-full rounded-3xl border border-line bg-card p-8 shadow-card transition-colors hover:border-red-500/50"
              >
                <div className="flex items-start justify-between">
                  <c.icon size={30} className="text-red-600" weight="duotone" />
                  <span className="text-xs uppercase tracking-[0.18em] text-faint">{c.time}</span>
                </div>
                <p className="mt-8 font-display text-7xl tracking-tight text-red-600">{c.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <span className="font-medium text-ink">{c.title}.</span> {c.note}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[70ch] text-sm leading-relaxed text-faint">
            {PRICING.note} Обед по будням с 12:00 до 16:00: четыре сета на выбор, в каждом суп или салат,
            горячее, грузинский хлеб и чай либо морс.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
