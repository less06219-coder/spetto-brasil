"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "h2" | "h3";
}

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduzMovimento = useReducedMotion();
  const Componente = motion[as];

  return (
    <Componente
      className={className}
      initial={reduzMovimento ? undefined : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Componente>
  );
}

interface RevealLateralProps {
  children: ReactNode;
  lado: "esq" | "dir";
  delay?: number;
  className?: string;
}

export function RevealLateral({ children, lado, delay = 0, className }: RevealLateralProps) {
  const reduzMovimento = useReducedMotion();
  const x = lado === "esq" ? -30 : 30;

  return (
    <motion.div
      className={className}
      initial={reduzMovimento ? undefined : { opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
