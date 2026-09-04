import type { Metadata } from "next";
import { Archivo_Black, Karla } from "next/font/google";
import { construirJsonLd } from "@/lib/dados";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-corpo",
});

export const metadata: Metadata = {
  title: "Spetto Brasil — Self-service por quilo & espetinhos na brasa",
  description:
    "De dia, self-service por quilo com prato feito e marmita. De noite, espetinhos na brasa. Dois turnos, um endereço em Lucas do Rio Verde - MT.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivoBlack.variable} ${karla.variable}`}>
      <body className="font-corpo">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(construirJsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}
