import { useCallback, useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import PriceRibbon from "./components/PriceRibbon";
import Price from "./components/Price";
import Menu from "./components/Menu";
import Branches, { BranchModal } from "./components/Branches";
import Footer from "./components/Footer";
import BookingModal from "./components/Booking";
import Lightbox from "./components/Lightbox";
import type { LightboxState } from "./components/Lightbox";
import { BRANCHES } from "./data/content";
import type { Branch, Photo } from "./data/content";

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingBranch, setBookingBranch] = useState<Branch["id"]>("nevsky");
  const [openBranch, setOpenBranch] = useState<Branch["id"] | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openBooking = useCallback((branchId?: Branch["id"]) => {
    if (branchId) setBookingBranch(branchId);
    setOpenBranch(null);
    setBookingOpen(true);
  }, []);

  const openPhoto = useCallback((photos: Photo[], index: number) => {
    setLightbox({ photos, index });
  }, []);

  const anyModal = bookingOpen || openBranch !== null || lightbox !== null;
  useEffect(() => {
    document.body.style.overflow = anyModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyModal]);

  const branch = BRANCHES.find((b) => b.id === openBranch) ?? null;

  return (
    <div className="min-h-[100dvh] bg-bg text-ink">
      <Nav onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking()} />
        <PriceRibbon />
        <Price />
        <Menu onPhoto={openPhoto} />
        <Branches onBook={openBooking} onOpen={setOpenBranch} />
      </main>
      <Footer />

      <BranchModal
        branch={branch}
        onClose={() => setOpenBranch(null)}
        onBook={openBooking}
        onPhoto={openPhoto}
      />
      <BookingModal open={bookingOpen} initialBranch={bookingBranch} onClose={() => setBookingOpen(false)} />
      <Lightbox state={lightbox} onClose={() => setLightbox(null)} onNav={(index) => setLightbox((s) => (s ? { ...s, index } : s))} />
    </div>
  );
}
