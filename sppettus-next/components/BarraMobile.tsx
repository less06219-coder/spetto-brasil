"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { linkWhatsapp } from "@/lib/dados";

export function BarraMobile({ heroRef, footerRef }: { heroRef: React.RefObject<HTMLElement>; footerRef: React.RefObject<HTMLElement> }) {
  const [passouHero, setPassouHero] = useState(false);
  const [chegouFooter, setChegouFooter] = useState(false);

  useEffect(() => {
    if (!heroRef.current || !footerRef.current) return;

    const ioHero = new IntersectionObserver(
      ([entry]) => setPassouHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    const ioFooter = new IntersectionObserver(([entry]) => setChegouFooter(entry.isIntersecting), { threshold: 0 });

    ioHero.observe(heroRef.current);
    ioFooter.observe(footerRef.current);
    return () => {
      ioHero.disconnect();
      ioFooter.disconnect();
    };
  }, [heroRef, footerRef]);

  const mostrar = passouHero && !chegouFooter;

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-[60] flex gap-2.5 border-t px-4 py-3 md:hidden"
      style={{ background: "var(--bg)", borderColor: "var(--card-border)" }}
      animate={{ y: mostrar ? 0 : "110%" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <a href="#oferta" className="btn fantasma flex-1 justify-center">
        Ver preços
      </a>
      <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="btn flex-1 justify-center">
        Reservar
      </a>
    </motion.div>
  );
}
