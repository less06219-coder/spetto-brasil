# Spetto Brasil — landing page (Next.js + Framer Motion)

Landing page do Spetto Brasil, com a virada visual dia → noite ao rolar a página (bloco "Solução" é o pivô) e um contador de urgência real, calculado a partir dos horários de funcionamento.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## O que editar

Praticamente todo dado específico do negócio (endereço, telefone, horários, preços, depoimentos, FAQ, números) fica em um único arquivo:

```
lib/dados.ts
```

Os campos marcados `[PREENCHER]` precisam do dado real antes de publicar. O restante do layout/copy fica em `app/page.tsx`.

## Estrutura

```
app/
  layout.tsx     — fontes (Archivo Black + Karla) e metadata
  page.tsx        — a página inteira, seção por seção
  globals.css     — tokens de cor (dia/noite) e utilitários (.btn, vapor, clip-line)
lib/
  dados.ts        — configuração do negócio + lógica do horário/contador
components/
  Reveal.tsx      — fade/slide genérico ao entrar na tela (scroll reveal)
  Numero.tsx       — contador 0 → valor
  Galeria.tsx      — grade de fotos, com placeholder estilizado enquanto "foto" estiver vazio no DADOS
  Acordeao.tsx     — FAQ com altura animada (grid-template-rows)
  Relogio.tsx      — badge "aberto agora" + texto de urgência, atualizados a cada 30s
  BarraMobile.tsx  — CTA fixo no rodapé, só no mobile
```

## Fotos

O array `galeria` em `lib/dados.ts` está com o campo `foto` vazio em todos os itens — enquanto estiver assim, cada item mostra um espaço reservado (gradiente + emoji + "Coloque uma foto real aqui"). Assim que tiver fotos reais da casa, preencha `foto` com o caminho de um arquivo em `public/` (ex: `/fotos/salao.jpg`) ou uma URL, e a foto substitui o placeholder automaticamente.

## Por que não GSAP

Toda a animação da página é reveal no scroll, stagger, altura de accordion e uma transição de cor — o Framer Motion faz tudo isso nativamente. GSAP + ScrollTrigger somaria ~40 kB gzip sem ganho visual perceptível, e numa página de restaurante que costuma abrir em 4G isso custa conversão.

Se um dia quiser parallax de verdade na brasa (por exemplo, a brasa reagindo à velocidade de scroll, não só à posição), aí sim GSAP + ScrollTrigger compensa:

```bash
npm install gsap
```

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

## Acessibilidade

- `prefers-reduced-motion: reduce` desativa transições e animações (as seções aparecem direto, sem fade/slide).
- Accordion do FAQ usa `aria-expanded` e `aria-controls`.
- O contador de urgência usa `role="timer"` e `aria-live="polite"`.
- Foco visível em todos os elementos interativos (`:focus-visible`).

## Deploy

Qualquer host de Next.js funciona (Vercel, Netlify, etc.). Não há variáveis de ambiente — tudo vem de `lib/dados.ts`.
