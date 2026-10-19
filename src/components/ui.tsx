import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Star, Train } from "@phosphor-icons/react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-red-600">
      <span className="h-px w-8 bg-red-600/70" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {sub ? <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted">{sub}</p> : null}
    </Reveal>
  );
}

export function OrnamentRule({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`ornament-strip w-full opacity-90 ${className}`} />;
}

export function RatingStars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Оценка ${value} из 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          weight="fill"
          className={i <= Math.round(value) ? "text-red-500" : "text-line-strong"}
          size={14}
        />
      ))}
    </span>
  );
}

export function VkBadge({ small = false }: { small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-md bg-brand-teal font-semibold text-white ${
        small ? "h-5 w-7 text-[10px]" : "h-6 w-9 text-xs"
      }`}
    >
      VK
    </span>
  );
}

export function MetroBadge({ name, distance }: { name: string; distance: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
      <Train size={14} className="text-red-600" weight="duotone" />
      <span className="text-ink-soft">{name}</span>
      <span className="text-faint">{distance}</span>
    </span>
  );
}
