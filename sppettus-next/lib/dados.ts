// ---------------------------------------------------------------------------
// Edite apenas este arquivo para atualizar textos, preços, horários e
// contatos do site. Campos marcados [PREENCHER] precisam do dado real.
// ---------------------------------------------------------------------------

export type Servico = "almoco" | "jantar";

export interface JanelaHorario {
  dias: number[]; // 0=domingo ... 6=sábado
  abre: string; // "HH:MM"
  fecha: string; // "HH:MM"
}

export const dados = {
  negocio: {
    nome: "Spetto Brasil",
    slogan: "Cada refeição feita com sabor e carinho. A nossa família atende a sua.",
    enderecoRua: "Av. Mato Grosso, 2864 - Jardim Primavera",
    enderecoCidade: "Lucas do Rio Verde",
    enderecoUF: "MT",
    enderecoCep: "78455-000",
    enderecoPais: "Brasil",
    bairro: "Jardim Primavera, Lucas do Rio Verde - MT",
    telefoneWhatsapp: "5500000000000", // [PREENCHER] formato internacional, só números — confirmar se é o mesmo contato do Instagram/WhatsApp da casa
    instagram: "https://instagram.com/spettobrasil", // [PREENCHER: confirmar se este perfil é desta unidade]
    notaGoogle: "4.8", // [PREENCHER]
    qtdAvaliacoes: "(320 avaliações)", // [PREENCHER]
    reservaAviso: "Sem precisar avisar com uma semana de antecedência.", // [PREENCHER]
  },

  horarios: {
    almoco: { dias: [1, 2, 3, 4, 5, 6], abre: "11:30", fecha: "14:30" } as JanelaHorario,
    jantar: { dias: [2, 3, 4, 5, 6, 0], abre: "18:30", fecha: "23:00" } as JanelaHorario,
    almocoDiasTexto: "seg a sáb",
    jantarDiasTexto: "ter a dom",
  },

  numeros: [
    { valor: 12, legenda: "anos de brasa acesa" },
    { valor: 37, legenda: "tipos de espetinho no cardápio" },
    { valor: 4.8, legenda: "nota média no Google", decimal: true },
    { valor: 500, sufixo: "+", legenda: "pratos de almoço por semana" },
  ], // [PREENCHER: números reais]

  galeria: [
    { legenda: "Self-service", emoji: "🍽️", foto: "" },
    { legenda: "Espetinhos na brasa", emoji: "🍢", foto: "" },
    { legenda: "Nosso salão", emoji: "🏠", foto: "" },
    { legenda: "Marmita pra viagem", emoji: "🥡", foto: "" },
    { legenda: "Equipe Spetto", emoji: "👨‍🍳", foto: "" },
    { legenda: "Amigos e família", emoji: "🎉", foto: "" },
  ], // [PREENCHER: troque "foto" por um link ou arquivo de imagem real — enquanto vazio, mostra um espaço reservado]

  depoimentos: [
    { nome: "[PREENCHER: nome]", contexto: "Cliente do almoço", texto: "O prato sai rápido e ainda chega quente na mesa. Nunca vi a fila travar." },
    { nome: "[PREENCHER: nome]", contexto: "Cliente do jantar", texto: "Levei o grupo do trabalho inteiro sem avisar antes. Coube todo mundo e o espeto não parou de vir." },
    { nome: "[PREENCHER: nome]", contexto: "Cliente frequente", texto: "É o único lugar que eu confio de dia e de noite, sem trocar de restaurante." },
  ], // [PREENCHER: depoimentos reais, com autorização do cliente]

  oferta: [
    {
      tag: "Turno dia",
      nome: "Self-Service por Quilo",
      preco: "[PREENCHER]",
      periodo: "/kg",
      itens: [
        "Saladas e pratos variados na balança",
        "Prato Feito também disponível, sem pesar",
        "Marmita pra viagem, com o mesmo tempero",
        "Você monta o prato, paga só pelo que vai comer",
      ],
      disponibilidade: "Seg a sáb, 11h30–14h30",
      cta: "Reservar mesa pro almoço",
    },
    {
      tag: "Turno noite",
      nome: "Espetinhos na Brasa",
      preco: "[PREENCHER]",
      periodo: "/espeto",
      itens: [
        "Espetinhos preparados na hora, no ponto que você pedir",
        "Acompanhamentos da casa",
        "Ambiente pra reunir amigos e família",
        "Opção vegetariana disponível",
      ],
      disponibilidade: "Ter a dom, a partir das 18h30",
      cta: "Reservar mesa",
    },
  ], // [PREENCHER: preços e itens reais]

  faq: [
    { pergunta: "Preciso reservar para o almoço?", resposta: "Não é obrigatório, o balcão é pensado pra fila andar rápido. Mas se seu grupo tem mais de 6 pessoas, avise pelo WhatsApp que a gente já deixa a mesa pronta." },
    { pergunta: "Os espetinhos têm opção vegetariana?", resposta: "Sim, temos espetos de legumes e queijo na brasa preparados do mesmo jeito, na hora." },
    { pergunta: "Tem estacionamento?", resposta: "[PREENCHER: informação real sobre estacionamento]" },
    { pergunta: "Aceita cartão e Pix?", resposta: "Sim, aceitamos cartão de crédito, débito e Pix. Não trabalhamos com vale-refeição no jantar." },
    { pergunta: "Tem marmita pra viagem?", resposta: "Sim, a marmita sai com o mesmo tempero caseiro do self-service. [PREENCHER: se também atende por app de delivery]" },
  ], // [PREENCHER: respostas reais]
};

// Endereço completo e links do mapa são calculados a partir dos campos
// estruturados acima — preencha só enderecoRua/Cidade/UF/Cep e os três
// (texto do rodapé, link "Como chegar" e mapa embutido) atualizam juntos.
export function enderecoCompleto(): string {
  const { enderecoRua, enderecoCidade, enderecoUF, enderecoCep, enderecoPais } = dados.negocio;
  return `${enderecoRua}, ${enderecoCidade} - ${enderecoUF}, ${enderecoCep}, ${enderecoPais}`;
}

export function linkMapa(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto())}`;
}

export function linkMapaEmbed(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(enderecoCompleto())}&output=embed`;
}

const DIAS_SCHEMA = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
  (d) => `https://schema.org/${d}`
);

export function construirJsonLd() {
  const qtdMatch = String(dados.negocio.qtdAvaliacoes).match(/\d+/);
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: dados.negocio.nome,
    telephone: `+${dados.negocio.telefoneWhatsapp}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: dados.negocio.enderecoRua,
      addressLocality: dados.negocio.enderecoCidade,
      addressRegion: dados.negocio.enderecoUF,
      postalCode: dados.negocio.enderecoCep,
      addressCountry: "BR",
    },
    servesCuisine: ["Brasileira", "Churrasco"],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dados.horarios.almoco.dias.map((d) => DIAS_SCHEMA[d]),
        opens: dados.horarios.almoco.abre,
        closes: dados.horarios.almoco.fecha,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dados.horarios.jantar.dias.map((d) => DIAS_SCHEMA[d]),
        opens: dados.horarios.jantar.abre,
        closes: dados.horarios.jantar.fecha,
      },
    ],
  };
  if (qtdMatch) {
    jsonLd.aggregateRating = { "@type": "AggregateRating", ratingValue: dados.negocio.notaGoogle, reviewCount: qtdMatch[0] };
  }
  return jsonLd;
}

export type Dados = typeof dados;

export function linkWhatsapp(mensagem = "Oi! Vim pela página do Spetto Brasil e queria reservar uma mesa."): string {
  return `https://wa.me/${dados.negocio.telefoneWhatsapp}?text=${encodeURIComponent(mensagem)}`;
}

interface Evento {
  tipo: Servico;
  inicio: Date;
  fim: Date;
}

function construirEventos(diasAFrente = 9): Evento[] {
  const eventos: Evento[] = [];
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  for (let d = 0; d < diasAFrente; d++) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + d);
    const diaSemana = data.getDay();

    (["almoco", "jantar"] as Servico[]).forEach((tipo) => {
      const cfg = dados.horarios[tipo];
      if (cfg.dias.includes(diaSemana)) {
        const [ah, am] = cfg.abre.split(":").map(Number);
        const [fh, fm] = cfg.fecha.split(":").map(Number);
        const inicio = new Date(data);
        inicio.setHours(ah, am, 0, 0);
        const fim = new Date(data);
        fim.setHours(fh, fm, 0, 0);
        eventos.push({ tipo, inicio, fim });
      }
    });
  }

  return eventos.sort((a, b) => a.inicio.getTime() - b.inicio.getTime());
}

export interface StatusServico {
  aberto: boolean;
  tipo: Servico | null;
  alvo: Date | null;
}

export function calcularStatus(agora: Date = new Date()): StatusServico {
  const eventos = construirEventos();
  const atual = eventos.find((e) => agora >= e.inicio && agora < e.fim);
  if (atual) return { aberto: true, tipo: atual.tipo, alvo: atual.fim };

  const proximo = eventos.find((e) => e.inicio > agora);
  return { aberto: false, tipo: proximo ? proximo.tipo : null, alvo: proximo ? proximo.inicio : null };
}

export function formatarContagem(msRestante: number): string {
  const totalMin = Math.max(0, Math.floor(msRestante / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h <= 0) return `${m}min`;
  return `${h}h ${String(m).padStart(2, "0")}min`;
}
