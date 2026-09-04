import { Reveal } from "@/components/Reveal";
import { IconeGaleria, type ChaveIconeGaleria } from "@/components/IconesGaleria";

interface ItemGaleria {
  legenda: string;
  icone: ChaveIconeGaleria;
  foto: string;
}

export function Galeria({ itens }: { itens: ItemGaleria[] }) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
      {itens.map((item, i) => (
        <Reveal delay={i * 0.06} key={item.legenda}>
          <div
            className="relative flex aspect-[4/3] flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl border p-3 text-center transition-all duration-300 hover:-translate-y-1"
            style={{
              borderColor: "var(--card-border)",
              background:
                "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--acento) 18%, transparent), transparent 60%), var(--card-bg)",
              color: "var(--sub)",
            }}
          >
            {item.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.foto} alt={item.legenda} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <>
                <span className="h-[52px] w-[52px]">
                  <IconeGaleria chave={item.icone} />
                </span>
                <span className="text-xs font-bold uppercase tracking-wide">{item.legenda}</span>
              </>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
