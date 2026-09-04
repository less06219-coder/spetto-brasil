"use client";

import { useState } from "react";

interface ItemFaq {
  pergunta: string;
  resposta: string;
}

export function Acordeao({ itens }: { itens: ItemFaq[] }) {
  const [abertoIndex, setAbertoIndex] = useState<number | null>(null);

  return (
    <div className="mt-9 grid max-w-[760px] gap-3">
      {itens.map((item, i) => {
        const aberto = abertoIndex === i;
        const respId = `faq-resp-${i}`;
        return (
          <div
            key={item.pergunta}
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
          >
            <button
              className="flex w-full items-center justify-between gap-3 px-5 py-[18px] text-left font-corpo font-bold"
              aria-expanded={aberto}
              aria-controls={respId}
              onClick={() => setAbertoIndex(aberto ? null : i)}
            >
              <span>{item.pergunta}</span>
              <span
                className="flex-shrink-0 text-xl text-[var(--acento)] transition-transform duration-300"
                style={{ transform: aberto ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <div
              id={respId}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: aberto ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="mx-5 mb-[18px] text-[15px] leading-relaxed text-[var(--sub)]">{item.resposta}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
