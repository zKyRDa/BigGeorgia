import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import type { Photo } from "../data/content";

export type LightboxState = { photos: Photo[]; index: number };

export default function Lightbox({
  state,
  onClose,
  onNav,
}: {
  state: LightboxState | null;
  onClose: () => void;
  onNav: (index: number) => void;
}) {
  const nav = useCallback(
    (dir: 1 | -1) => {
      if (!state) return;
      const n = state.photos.length;
      onNav((state.index + dir + n) % n);
    },
    [state, onNav]
  );

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, nav, onClose]);

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии"
        >
          <div className="relative max-h-[82vh] max-w-[min(1040px,92vw)]" onClick={(e) => e.stopPropagation()}>
            <motion.img
              key={state.photos[state.index].src}
              src={state.photos[state.index].src}
              alt={state.photos[state.index].caption}
              initial={{ opacity: 0.4, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-[74vh] w-auto rounded-2xl border border-white/20 object-contain shadow-card"
            />
          </div>
          <p className="mt-4 max-w-[80vw] text-center text-sm text-white/70" onClick={(e) => e.stopPropagation()}>
            <span className="text-white/95">{state.photos[state.index].caption}</span>
            {state.photos.length > 1 && (
              <span className="ml-3 text-white/50">
                {state.index + 1} / {state.photos.length}
              </span>
            )}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition-colors hover:bg-red-600"
            aria-label="Закрыть просмотр"
          >
            <X size={20} />
          </button>
          {state.photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nav(-1);
                }}
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition-colors hover:bg-red-600 md:left-8"
                aria-label="Предыдущее фото"
              >
                <CaretLeft size={22} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nav(1);
                }}
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition-colors hover:bg-red-600 md:right-8"
                aria-label="Следующее фото"
              >
                <CaretRight size={22} />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
