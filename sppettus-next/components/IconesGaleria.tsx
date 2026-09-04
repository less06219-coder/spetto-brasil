export type ChaveIconeGaleria = "prato" | "espetinho" | "salao" | "marmita" | "equipe" | "amigos";

export function IconeGaleria({ chave }: { chave: ChaveIconeGaleria }) {
  switch (chave) {
    case "prato":
      return (
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="26" fill="var(--card-bg)" stroke="var(--acento)" strokeWidth="3" />
          <circle cx="32" cy="32" r="15" fill="none" stroke="var(--acento)" strokeWidth="2" opacity="0.5" />
          <circle cx="26" cy="28" r="6" fill="var(--acento)" />
          <circle cx="38" cy="30" r="5" fill="var(--brasa)" opacity="0.85" />
          <circle cx="30" cy="38" r="4" fill="var(--acento)" opacity="0.7" />
        </svg>
      );
    case "espetinho":
      return (
        <svg viewBox="0 0 64 64">
          <line x1="10" y1="30" x2="54" y2="30" stroke="var(--fg)" strokeWidth="3" strokeLinecap="round" />
          <rect x="14" y="24" width="9" height="12" rx="2" fill="var(--acento)" transform="rotate(-8 18 30)" />
          <rect x="27" y="24" width="9" height="12" rx="2" fill="var(--brasa)" transform="rotate(6 31 30)" />
          <rect x="40" y="24" width="9" height="12" rx="2" fill="var(--acento)" transform="rotate(-6 44 30)" />
          <path d="M20 46 q3 -6 0 -11" fill="none" stroke="var(--brasa)" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
          <path d="M32 46 q3 -6 0 -11" fill="none" stroke="var(--brasa)" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
          <path d="M44 46 q3 -6 0 -11" fill="none" stroke="var(--brasa)" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
        </svg>
      );
    case "salao":
      return (
        <svg viewBox="0 0 64 64">
          <ellipse cx="32" cy="34" rx="20" ry="10" fill="var(--card-bg)" stroke="var(--acento)" strokeWidth="3" />
          <circle cx="12" cy="20" r="5" fill="var(--acento)" />
          <circle cx="52" cy="20" r="5" fill="var(--acento)" />
          <circle cx="12" cy="48" r="5" fill="var(--acento)" />
          <circle cx="52" cy="48" r="5" fill="var(--acento)" />
        </svg>
      );
    case "marmita":
      return (
        <svg viewBox="0 0 64 64">
          <rect x="14" y="24" width="36" height="24" rx="4" fill="var(--card-bg)" stroke="var(--acento)" strokeWidth="3" />
          <line x1="14" y1="31" x2="50" y2="31" stroke="var(--acento)" strokeWidth="2" />
          <path d="M25 14 q2 -5 0 -8" fill="none" stroke="var(--brasa)" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
          <path d="M32 14 q2 -5 0 -8" fill="none" stroke="var(--brasa)" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
          <path d="M39 14 q2 -5 0 -8" fill="none" stroke="var(--brasa)" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
        </svg>
      );
    case "equipe":
      return (
        <svg viewBox="0 0 64 64">
          <rect x="20" y="40" width="24" height="10" rx="2" fill="var(--acento)" />
          <circle cx="24" cy="30" r="9" fill="var(--card-bg)" stroke="var(--acento)" strokeWidth="3" />
          <circle cx="32" cy="24" r="10" fill="var(--card-bg)" stroke="var(--acento)" strokeWidth="3" />
          <circle cx="40" cy="30" r="9" fill="var(--card-bg)" stroke="var(--acento)" strokeWidth="3" />
        </svg>
      );
    case "amigos":
      return (
        <svg viewBox="0 0 64 64">
          <path d="M14 12 L26 12 L23 38 Q20 42 17 38 Z" fill="var(--card-bg)" stroke="var(--acento)" strokeWidth="3" transform="rotate(-14 20 25)" />
          <path d="M38 12 L50 12 L47 38 Q44 42 41 38 Z" fill="var(--card-bg)" stroke="var(--brasa)" strokeWidth="3" transform="rotate(14 44 25)" />
          <path d="M32 8 L32 17 M27.5 12.5 L36.5 12.5" stroke="var(--fg)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
  }
}
