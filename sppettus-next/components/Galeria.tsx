import { Reveal } from "@/components/Reveal";

interface ItemGaleria {
  legenda: string;
  emoji: string;
  foto: string;
}

export function Galeria({ itens }: { itens: ItemGaleria[] }) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
      {itens.map((item, i) => (
        <Reveal delay={i * 0.06} key={item.legenda}>
          <div
            className="relative flex aspect-[4/3] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed p-3 text-center"
            style={{
              borderColor: "var(--card-border)",
              background:
                "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--acento) 22%, transparent), transparent 60%), var(--card-bg)",
              color: "var(--sub)",
            }}
          >
            {item.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.foto} alt={item.legenda} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <>
                <span className="text-[34px]">{item.emoji}</span>
                <span className="text-xs font-bold uppercase tracking-wide">{item.legenda}</span>
                <span className="text-[11px] opacity-75">Coloque uma foto real aqui</span>
              </>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
