"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface NumeroProps {
  valor: number;
  legenda: string;
  sufixo?: string;
  decimal?: boolean;
  delay?: number;
}

export function Numero({ valor, legenda, sufixo = "", decimal = false, delay = 0 }: NumeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-40px" });
  const reduzMovimento = useReducedMotion();
  const [exibido, setExibido] = useState(0);

  useEffect(() => {
    if (!emVista) return;
    if (reduzMovimento) {
      setExibido(valor);
      return;
    }
    const duracao = 1200;
    const inicio = performance.now();
    let quadro: number;

    function passo(agora: number) {
      const t = Math.min(1, (agora - inicio) / duracao);
      const ease = 1 - Math.pow(1 - t, 3);
      setExibido(valor * ease);
      if (t < 1) quadro = requestAnimationFrame(passo);
    }
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [emVista, valor, reduzMovimento]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={reduzMovimento ? undefined : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="font-display text-[clamp(32px,5vw,52px)] text-[var(--acento)]">
        {decimal ? exibido.toFixed(1) : Math.round(exibido)}
        {sufixo}
      </div>
      <div className="mt-1.5 text-sm text-[var(--sub)]">{legenda}</div>
    </motion.div>
  );
}
