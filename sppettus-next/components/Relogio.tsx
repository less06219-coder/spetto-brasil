"use client";

import { useEffect, useState } from "react";
import { calcularStatus, formatarContagem, linkWhatsapp, StatusServico } from "@/lib/dados";

function useStatusServico(): StatusServico {
  const [status, setStatus] = useState<StatusServico>(() => calcularStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(calcularStatus()), 30_000);
    return () => clearInterval(id);
  }, []);

  return status;
}

export function BadgeStatus() {
  const status = useStatusServico();

  if (!status.alvo) {
    return (
      <span className="badge inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider" style={{ borderColor: "var(--card-border)", color: "var(--sub)" }}>
        <span className="h-[7px] w-[7px] rounded-full" style={{ background: "var(--fumaca)" }} />
        <span className="hidden sm:inline">Fechado</span>
      </span>
    );
  }

  const texto = status.tipo === "almoco" ? "Aberto — almoço" : "Aberto — jantar";

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
      style={{ borderColor: "var(--card-border)", color: status.aberto ? "var(--acento)" : "var(--sub)" }}
    >
      <span
        className={`h-[7px] w-[7px] rounded-full ${status.aberto ? "badge-ponto-aberto" : ""}`}
        style={{
          background: status.aberto ? "#4CAF6D" : "var(--fumaca)",
        }}
      />
      <span className="hidden sm:inline">{status.aberto ? texto : "Fechado"}</span>
    </span>
  );
}

export function TextoUrgencia() {
  const status = useStatusServico();
  const [restante, setRestante] = useState("");

  useEffect(() => {
    function atualizar() {
      if (!status.alvo) return;
      setRestante(formatarContagem(status.alvo.getTime() - Date.now()));
    }
    atualizar();
    const id = setInterval(atualizar, 30_000);
    return () => clearInterval(id);
  }, [status.alvo]);

  if (!status.alvo) {
    return <span>Consulte nossos horários no rodapé.</span>;
  }

  if (status.aberto) {
    return status.tipo === "almoco" ? (
      <>O balcão está servindo agora — fecha em <b className="text-[var(--acento)]">{restante}</b></>
    ) : (
      <>A brasa está acesa agora — última chamada em <b className="text-[var(--acento)]">{restante}</b></>
    );
  }

  return status.tipo === "almoco" ? (
    <>O balcão abre em <b className="text-[var(--acento)]">{restante}</b></>
  ) : (
    <>A brasa acende em <b className="text-[var(--acento)]">{restante}</b></>
  );
}

export function BotaoWhatsapp({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a className={className} href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
