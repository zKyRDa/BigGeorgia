import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarBlank, CheckCircle, Clock, Users, X } from "@phosphor-icons/react";
import { BRANCHES } from "../data/content";
import type { Branch } from "../data/content";
import GlideSelect from "./GlideSelect";
import type { GlideSelectOption } from "./GlideSelect";

const BRANCH_OPTIONS: GlideSelectOption[] = BRANCHES.map((b) => ({
  value: b.id,
  label: b.shortAddress,
  tag: `м. ${b.metro[0].name}`,
}));

const GUEST_OPTIONS: GlideSelectOption[] = [
  { value: "1", label: "1 гость", tag: "1 персона" },
  { value: "2", label: "2 гостя", tag: "Для двоих" },
  { value: "3", label: "3 гостя", tag: "3 персоны" },
  { value: "4", label: "4 гостя", tag: "4 персоны" },
  { value: "5", label: "5 гостей", tag: "5 персон" },
  { value: "6", label: "6 гостей", tag: "6 персон" },
  { value: "7", label: "7 гостей", tag: "7 персон" },
  { value: "8", label: "8 гостей", tag: "8 персон" },
  { value: "9+", label: "Больше восьми гостей", tag: "Банкет" },
];

type Form = {
  branchId: Branch["id"];
  date: string;
  time: string;
  guests: string;
  name: string;
  phone: string;
  comment: string;
};

const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 11; h <= 22; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`, `${String(h).padStart(2, "0")}:30`);
  }
  slots.push("23:00");
  return slots;
})();

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("ru-RU", { day: "numeric", month: "long", weekday: "short" });
}

export default function BookingModal({
  open,
  initialBranch,
  onClose,
}: {
  open: boolean;
  initialBranch: Branch["id"];
  onClose: () => void;
}) {
  const [form, setForm] = useState<Form>(() => ({
    branchId: initialBranch,
    date: todayISO(),
    time: "19:00",
    guests: "2",
    name: "",
    phone: "",
    comment: "",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<null | { code: string; stored: "server" | "local" }>(null);

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, branchId: initialBranch }));
      setDone(null);
      setErrors({});
    }
  }, [open, initialBranch]);

  const branch = useMemo(() => BRANCHES.find((b) => b.id === form.branchId)!, [form.branchId]);

  const set = (k: keyof Form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<keyof Form, string>> = {};
    if (!form.date || form.date < todayISO()) errs.date = "Выберите дату не раньше сегодняшней";
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = "Представьтесь, пожалуйста";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10) errs.phone = "Нужен номер, чтобы подтвердить бронь";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    const code = `BGK-${Math.floor(1000 + Math.random() * 9000)}`;
    let stored: "server" | "local" = "local";
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, code, createdAt: new Date().toISOString() }),
      });
      if (res.ok) stored = "server";
    } catch {
      stored = "local";
    }
    try {
      const prev = JSON.parse(localStorage.getItem("bgk-bookings") ?? "[]");
      prev.push({ ...form, code, createdAt: new Date().toISOString() });
      localStorage.setItem("bgk-bookings", JSON.stringify(prev));
    } catch {
      /* приватный режим: просто не сохраняем историю */
    }
    setSending(false);
    setDone({ code, stored });
  };

  const inputCls = (err?: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-red-500 ${
      err ? "border-red-600" : "border-line-strong"
    }`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Бронирование стола"
        >
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto my-8 max-w-lg rounded-3xl border border-line bg-white p-6 shadow-card md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-3xl text-ink">Бронь стола</h3>
                <p className="mt-1 text-sm text-muted">Заявка уйдёт в ресторан, подтверждение по телефону.</p>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-red-600/50 hover:text-red-600"
                aria-label="Закрыть форму бронирования"
              >
                <X size={18} />
              </button>
            </div>

            {done ? (
              <div className="mt-8 rounded-2xl border border-red-500/40 bg-red-soft p-6 text-center">
                <CheckCircle size={44} weight="duotone" className="mx-auto text-red-600" />
                <p className="mt-4 font-display text-2xl text-ink">Заявка {done.code} принята</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {branch.shortAddress}, {fmtDate(form.date)} в {form.time}, гостей: {form.guests}.
                  Ресторан позвонит на {form.phone} для подтверждения.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Отлично
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                <div>
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-faint">Ресторан</span>
                  <GlideSelect
                    options={BRANCH_OPTIONS}
                    value={form.branchId}
                    onChange={(val) => setForm((f) => ({ ...f, branchId: val as Branch["id"] }))}
                    fullWidth
                    size="lg"
                    radius={12}
                    accentColor="#c1121f"
                    surfaceColor="#ffffff"
                    highlightColor="#fbeeef"
                    textColor="#1a1b1e"
                    triggerClassName="w-full justify-between rounded-xl border border-line-strong bg-white px-4 py-3 text-sm text-ink outline-none transition-colors hover:border-red-500/70 focus:border-red-600 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-faint">
                      <CalendarBlank size={14} /> Дата
                    </span>
                    <input type="date" min={todayISO()} value={form.date} onChange={set("date")} className={inputCls(errors.date)} />
                    {errors.date && <span className="mt-1 block text-xs text-red-600">{errors.date}</span>}
                  </label>
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-faint">
                      <Clock size={14} /> Время
                    </span>
                    <select value={form.time} onChange={set("time")} className={inputCls()}>
                      {TIME_SLOTS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-faint">
                    <Users size={14} /> Гостей
                  </span>
                  <GlideSelect
                    options={GUEST_OPTIONS}
                    value={form.guests}
                    onChange={(val) => setForm((f) => ({ ...f, guests: val }))}
                    fullWidth
                    size="lg"
                    radius={12}
                    accentColor="#c1121f"
                    surfaceColor="#ffffff"
                    highlightColor="#fbeeef"
                    textColor="#1a1b1e"
                    triggerClassName="w-full justify-between rounded-xl border border-line-strong bg-white px-4 py-3 text-sm text-ink outline-none transition-colors hover:border-red-500/70 focus:border-red-600 shadow-sm"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-faint">Имя</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Как к вам обращаться"
                      autoComplete="name"
                      className={inputCls(errors.name)}
                    />
                    {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name}</span>}
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-faint">Телефон</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+7 (___) ___-__-__"
                      autoComplete="tel"
                      className={inputCls(errors.phone)}
                    />
                    {errors.phone && <span className="mt-1 block text-xs text-red-600">{errors.phone}</span>}
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-faint">Пожелания</span>
                  <textarea
                    value={form.comment}
                    onChange={set("comment")}
                    rows={2}
                    placeholder="Столик у окна, детский стул, день рождения"
                    className={`${inputCls()} resize-none`}
                  />
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
                >
                  <CalendarBlank size={18} weight="bold" />
                  {sending ? "Отправляем..." : "Отправить заявку"}
                </button>
                <p className="text-center text-xs text-faint">Или позвоните напрямую: {branch.phone}</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
