# Spetto Brasil — landing page

Landing page para o Spetto Brasil (self-service por quilo de dia, espetinhos na brasa à noite), em Lucas do Rio Verde - MT. A página muda visualmente de dia para noite conforme o usuário rola, no bloco "Solução" — reforçando os dois turnos da casa.

Duas versões, para momentos diferentes:

## [`sppettus-landing.html`](./sppettus-landing.html)

Arquivo único, sem instalação e sem build. Abra direto no navegador ou hospede de graça (Netlify Drop, Vercel, GitHub Pages). Toda a configuração do negócio (endereço, horários, preços, depoimentos, FAQ) fica no objeto `DADOS`, no fim do arquivo.

## [`sppettus-next/`](./sppettus-next)

Projeto React/Next.js + Framer Motion, para quando quiser evoluir a página com mais estrutura:

```bash
cd sppettus-next
npm install
npm run dev
```

Configuração do negócio em `sppettus-next/lib/dados.ts`. Detalhes de estrutura, acessibilidade e deploy no [README do projeto](./sppettus-next/README.md).

## O que falta preencher

Campos marcados `[PREENCHER]` nos dois arquivos de dados precisam da informação real: WhatsApp, Instagram (confirmar se `@spettobrasil` é a mesma unidade), preços, depoimentos, estacionamento, delivery, e fotos reais da casa (a seção "Nosso espaço" está com espaços reservados até lá).
