import { PRICING } from "../data/content";

export default function PriceRibbon() {
  return (
    <div className="bg-red-600 py-5" role="note" aria-label="Единая цена на блюда">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-5 text-center md:px-8">
        <p className="font-display text-xl text-white md:text-2xl">
          Все основные блюда: <span className="font-semibold underline decoration-white/50 decoration-2 underline-offset-4">{PRICING.day.price}</span> в будни до 18:00
        </p>
        <span aria-hidden="true" className="hidden h-2 w-2 rotate-45 bg-white/70 md:block" />
        <p className="font-display text-xl text-white md:text-2xl">
          <span className="font-semibold underline decoration-white/50 decoration-2 underline-offset-4">{PRICING.evening.price}</span> вечером и в выходные
        </p>
      </div>
    </div>
  );
}
