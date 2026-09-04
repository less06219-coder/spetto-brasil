"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { dados, linkWhatsapp, linkMapa, linkMapaEmbed, enderecoCompleto } from "@/lib/dados";
import { Reveal, RevealLateral } from "@/components/Reveal";
import { Numero } from "@/components/Numero";
import { Galeria } from "@/components/Galeria";
import { Acordeao } from "@/components/Acordeao";
import { BarraMobile } from "@/components/BarraMobile";
import { BadgeStatus, TextoUrgencia } from "@/components/Relogio";

// Checagem por posição de scroll, não por IntersectionObserver de "linha
// fina": aquela técnica perde a detecção em saltos rápidos de rolagem
// (Page Down, scrollbar, flick de trackpad) porque o sentinela pode pular
// a faixa de detecção entre dois quadros renderizados.
function useVirarNoiteAoRolar(sentinelaRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const sentinela = sentinelaRef.current;
    if (!sentinela) return;

    let ticando = false;
    function avaliar() {
      ticando = false;
      if (!sentinela) return;
      const cruzouLinha = sentinela.getBoundingClientRect().top < window.innerHeight * 0.5;
      document.documentElement.classList.toggle("noite", cruzouLinha);
    }
    function agendar() {
      if (ticando) return;
      ticando = true;
      requestAnimationFrame(avaliar);
    }

    avaliar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, [sentinelaRef]);
}

const linhasHeadline = [
  "De dia, prato",
  "no ponto certo.",
  "De noite, espeto",
  "na brasa.",
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const sentinelaRef = useRef<HTMLDivElement>(null);
  const reduzMovimento = useReducedMotion();

  useVirarNoiteAoRolar(sentinelaRef);

  const brasasOffsets = [
    { left: "4%", delay: "0s", dx: "-14px" },
    { left: "12%", delay: ".7s", dx: "18px" },
    { left: "20%", delay: "1.4s", dx: "-10px" },
    { left: "28%", delay: "2.1s", dx: "22px" },
    { left: "36%", delay: "2.8s", dx: "-18px" },
    { left: "44%", delay: "3.5s", dx: "12px" },
    { left: "52%", delay: "4.2s", dx: "-22px" },
    { left: "60%", delay: "4.9s", dx: "16px" },
    { left: "68%", delay: "5.6s", dx: "-12px" },
    { left: "76%", delay: "6.3s", dx: "20px" },
    { left: "84%", delay: "7s", dx: "-16px" },
    { left: "92%", delay: "7.7s", dx: "14px" },
  ];

  return (
    <>
      <div className="brasas" aria-hidden="true">
        {brasasOffsets.map((b, i) => (
          <span
            key={i}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style={{ left: b.left, animationDelay: b.delay, "--dx": b.dx } as any}
          />
        ))}
      </div>

      <header
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-[900ms]"
        style={{ background: "color-mix(in srgb, var(--bg) 88%, transparent)", borderColor: "var(--card-border)" }}
      >
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-3.5">
          <div className="font-display text-xl tracking-wide">SPETTO BRASIL</div>
          <div className="flex items-center gap-3.5">
            <BadgeStatus />
            <a className="btn" href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section ref={heroRef} className="flex min-h-[92vh] items-center overflow-hidden px-6 pb-28 pt-40">
          <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="text-[clamp(34px,5vw,58px)]">
                {linhasHeadline.map((linha, i) => (
                  <span className="clip-line" key={linha}>
                    <motion.span
                      className="block"
                      initial={reduzMovimento ? undefined : { y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.05 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {linha}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                className="mt-5 max-w-[520px] text-lg"
                style={{ color: "var(--sub)" }}
                initial={reduzMovimento ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
              >
                O Spetto Brasil muda de turno igual você: sério e ligeiro no almoço, com tempo e fumaça à noite. Mesmo
                endereço, dois compromissos.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-3.5"
                initial={reduzMovimento ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.95 }}
              >
                <a id="cta-hero-primario" className="btn" href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">
                  Reservar mesa no WhatsApp
                </a>
                <a className="btn fantasma" href="#oferta">
                  Ver cardápio e preços
                </a>
              </motion.div>

              <motion.div
                className="mt-7 flex flex-wrap items-center gap-x-[18px] gap-y-2.5 text-[13px]"
                style={{ color: "var(--sub)" }}
                initial={reduzMovimento ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <span>
                  <b style={{ color: "var(--fg)" }}>{dados.negocio.notaGoogle}</b> ★ no Google{" "}
                  {dados.negocio.qtdAvaliacoes}
                </span>
                <span className="opacity-50">·</span>
                <span>{dados.negocio.bairro}</span>
                <span className="opacity-50">·</span>
                <span>
                  Almoço {dados.horarios.almoco.abre}–{dados.horarios.almoco.fecha}
                </span>
                <span className="opacity-50">·</span>
                <span>
                  Jantar {dados.horarios.jantar.abre}–{dados.horarios.jantar.fecha}
                </span>
              </motion.div>
            </div>

            <div className="relative flex h-[420px] items-center justify-center">
              <div
                className="espeto-ilustracao relative flex aspect-square w-[min(320px,80vw)] items-center justify-center rounded-full border"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--acento) 35%, transparent), transparent 60%), var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
              >
                <span className="emoji-hero text-[96px]">🍢</span>
                <div className="vapor v1" />
                <div className="vapor v2" />
                <div className="vapor v3" />
              </div>
            </div>
          </div>
        </section>

        {/* DOR */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[1120px]">
            <Reveal as="h2" className="max-w-[640px] text-[28px] md:text-[38px]">
              Se você mora ou trabalha aqui perto, deve reconhecer isso
            </Reveal>
            <ul className="mt-11 grid max-w-[720px] gap-4 list-none p-0">
              {[
                "Perdeu 40 minutos do horário de almoço numa fila que não andava.",
                'Comeu um "prato feito" requentado achando que era isso mesmo que dava pra esperar por aquele preço.',
                "Foi atrás de espetinho bom à noite e caiu num lugar caro, devagar, ou sem gosto de nada.",
                'Teve que escolher entre "rápido" e "bom" — como se as duas coisas não pudessem estar no mesmo prato.',
                "Marcou um jantar em grupo e ninguém conseguiu concordar sobre onde ir.",
              ].map((texto, i) => (
                <Reveal as="li" delay={i * 0.06} key={texto}>
                  <div
                    className="flex items-start gap-3.5 rounded-2xl border px-5 py-[18px] text-[17px]"
                    style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                  >
                    <span className="font-display flex-shrink-0" style={{ color: "var(--brasa)" }}>
                      ✕
                    </span>
                    <span>{texto}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <div ref={sentinelaRef} aria-hidden="true" />

        {/* SOLUÇÃO — pivô dia/noite */}
        <section className="relative overflow-hidden px-6 py-24">
          <div
            className="pointer-events-none absolute right-[-10%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-[1200ms]"
            style={{
              background: "radial-gradient(circle, rgba(232,100,42,.35), transparent 70%)",
            }}
            id="brasa-glow"
          />
          <div className="relative z-10 mx-auto max-w-[1120px]">
            <Reveal as="h2" className="max-w-[820px] text-[28px] md:text-[46px]">
              O Spetto Brasil não é um restaurante. São dois, no mesmo endereço.
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[640px] text-lg" style={{ color: "var(--sub)" }}>
                De 11h30 às 14h30 o balcão de self-service está pronto e o prato sai no tempo do seu intervalo. Às
                18h30 as luzes baixam, a brasa acende e os espetinhos começam a assar. Mesma cozinha, dois
                compromissos: rápido quando você tem pressa, com tempo quando você não tem.
              </p>
            </Reveal>
            <div className="mt-11 grid max-w-[820px] grid-cols-1 gap-[22px] md:grid-cols-2">
              {[
                { tag: "Turno dia", titulo: "Self-service por quilo", texto: "Balcão variado, você monta o prato e paga pelo peso. Prato feito e marmita também saem na hora." },
                { tag: "Turno noite", titulo: "Espetinhos na brasa", texto: "Mesa com tempo, espetinho preparado na hora, ninguém com pressa de ir embora." },
              ].map((turno, i) => (
                <Reveal delay={i * 0.1} key={turno.tag}>
                  <div className="rounded-2xl border p-[22px]" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--acento)" }}>
                      {turno.tag}
                    </div>
                    <h3 className="mt-2 text-[19px] font-bold normal-case">{turno.titulo}</h3>
                    <p className="mt-2 text-[15px]" style={{ color: "var(--sub)" }}>
                      {turno.texto}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[1120px]">
            <Reveal as="h2" className="text-[28px] md:text-[38px]">
              O que muda quando você escolhe o Spetto Brasil
            </Reveal>
            <div className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                { icone: "⏱️", titulo: "Fila que anda", texto: "Sistema de balcão pensado pra sua hora de almoço, não pra testar sua paciência." },
                { icone: "🔥", titulo: "Espetinho que chega quentinho, na hora", texto: "Vai pra brasa só depois que você pede — no ponto que você pedir." },
                { icone: "⚖️", titulo: "Você paga só pelo que vai comer", texto: "Self-service por quilo: monta o prato do seu jeito, sem prato fechado sobrando comida." },
                { icone: "👥", titulo: "Ambiente que aguenta o grupo inteiro", texto: `Mesas para 2 ou para 20. ${dados.negocio.reservaAviso}` },
              ].map((b, i) => (
                <Reveal delay={i * 0.06} key={b.titulo}>
                  <div
                    className="card-beneficio rounded-[18px] border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                  >
                    <div className="icone-beneficio inline-block text-3xl">{b.icone}</div>
                    <h3 className="mt-3.5 text-[19px] font-bold normal-case">{b.titulo}</h3>
                    <p className="mt-2 text-[15px]" style={{ color: "var(--sub)" }}>
                      {b.texto}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* NÚMEROS */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[1120px]">
            <Reveal as="h2" className="text-[28px] md:text-[38px]">
              Números que a gente não inventou pra parecer bonito
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
              {dados.numeros.map((n, i) => (
                <Numero
                  key={n.legenda}
                  valor={n.valor}
                  legenda={n.legenda}
                  sufixo={"sufixo" in n ? (n as { sufixo?: string }).sufixo : undefined}
                  decimal={"decimal" in n ? (n as { decimal?: boolean }).decimal : undefined}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[1120px]">
            <Reveal as="h2" className="text-[28px] md:text-[38px]">
              Nosso espaço
            </Reveal>
            <Galeria itens={dados.galeria} />
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[1120px]">
            <Reveal as="h2" className="text-[28px] md:text-[38px]">
              Quem já sentou nas duas mesas
            </Reveal>
            <div className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-3">
              {dados.depoimentos.map((d, i) => (
                <RevealLateral lado={i % 2 === 0 ? "esq" : "dir"} delay={i * 0.08} key={d.nome + i}>
                  <div className="rounded-2xl border p-[26px]" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                    <div style={{ color: "var(--acento)", letterSpacing: "2px" }}>★★★★★</div>
                    <p className="mt-3.5 text-[15px]">&quot;{d.texto}&quot;</p>
                    <div className="mt-4 text-[13px] font-bold" style={{ color: "var(--sub)" }}>
                      {d.nome} — {d.contexto}
                    </div>
                  </div>
                </RevealLateral>
              ))}
            </div>
          </div>
        </section>

        {/* OFERTA */}
        <section id="oferta" className="px-6 py-24">
          <div className="mx-auto max-w-[1120px]">
            <Reveal as="h2" className="text-[28px] md:text-[38px]">
              Escolha o seu turno
            </Reveal>
            <div className="mt-11 grid grid-cols-1 gap-6 md:grid-cols-2">
              {dados.oferta.map((o, i) => (
                <Reveal delay={i * 0.1} key={o.nome}>
                  <div
                    className="rounded-[20px] border p-8 shadow-2xl"
                    style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--acento)" }}>
                      {o.tag}
                    </div>
                    <h3 className="mt-2.5 text-2xl font-bold normal-case">{o.nome}</h3>
                    <div className="font-display mt-3.5 text-4xl">
                      R$ {o.preco}
                      <small className="font-corpo ml-1 text-sm normal-case" style={{ color: "var(--sub)" }}>
                        {o.periodo}
                      </small>
                    </div>
                    <ul className="mt-5 grid gap-2.5 list-none p-0">
                      {o.itens.map((item) => (
                        <li key={item} className="flex gap-2 text-sm" style={{ color: "var(--sub)" }}>
                          <span className="font-bold" style={{ color: "var(--acento)" }}>
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-[18px] text-[13px]" style={{ color: "var(--sub)" }}>
                      {o.disponibilidade}
                    </div>
                    <a className="btn mt-[22px] w-full justify-center" href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">
                      {o.cta}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[1120px]">
            <Reveal as="h2" className="text-[28px] md:text-[38px]">
              Antes de perguntar no WhatsApp
            </Reveal>
            <Acordeao itens={dados.faq} />
          </div>
        </section>

        {/* URGÊNCIA */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[1120px]">
            <Reveal>
              <div
                className="flex flex-wrap items-center justify-between gap-5 rounded-[20px] border p-9"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <div>
                  <div className="text-[13px] font-bold uppercase tracking-wider" style={{ color: "var(--sub)" }}>
                    Horário ao vivo
                  </div>
                  <div className="font-display mt-1.5 text-[clamp(20px,3vw,28px)]" role="timer" aria-live="polite">
                    <TextoUrgencia />
                  </div>
                </div>
                <a className="btn" href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">
                  Reservar agora
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer ref={footerRef} className="px-6 py-[70px] pb-32">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <div className="font-display mb-3.5 text-xl">SPETTO BRASIL</div>
              <p className="mb-2 text-[15px]" style={{ color: "var(--sub)" }}>
                {dados.negocio.slogan}
              </p>
              <p className="mb-2 text-[15px]" style={{ color: "var(--sub)" }}>
                {enderecoCompleto()}
              </p>
            </div>
            <div>
              <h4 className="mb-3.5 text-[13px] font-bold uppercase tracking-wider" style={{ color: "var(--sub)" }}>
                Horários
              </h4>
              <p className="mb-2 text-[15px]" style={{ color: "var(--sub)" }}>
                Almoço: {dados.horarios.almocoDiasTexto}, {dados.horarios.almoco.abre}–{dados.horarios.almoco.fecha}
              </p>
              <p className="mb-2 text-[15px]" style={{ color: "var(--sub)" }}>
                Jantar: {dados.horarios.jantarDiasTexto}, {dados.horarios.jantar.abre}–{dados.horarios.jantar.fecha}
              </p>
            </div>
            <div>
              <h4 className="mb-3.5 text-[13px] font-bold uppercase tracking-wider" style={{ color: "var(--sub)" }}>
                Contato
              </h4>
              <a className="mb-2 block text-[15px]" style={{ color: "var(--sub)" }} href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a className="mb-2 block text-[15px]" style={{ color: "var(--sub)" }} href={dados.negocio.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a className="mb-2 block text-[15px]" style={{ color: "var(--sub)" }} href={linkMapa()} target="_blank" rel="noopener noreferrer">
                Como chegar
              </a>
            </div>
          </div>
          <div
            className="mt-10 overflow-hidden rounded-2xl border"
            style={{ borderColor: "var(--card-border)" }}
          >
            <iframe
              src={linkMapaEmbed()}
              title="Mapa até o Spetto Brasil"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[240px] w-full border-0"
            />
          </div>
          <div className="mt-11 border-t pt-6 text-xs" style={{ borderColor: "var(--card-border)", color: "var(--sub)" }}>
            © {new Date().getFullYear()} Spetto Brasil. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <BarraMobile heroRef={heroRef} footerRef={footerRef} />
    </>
  );
}
