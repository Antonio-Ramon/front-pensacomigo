import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/Toaster";
import { AvisoErroLogin } from "@/components/layout/AvisoErroLogin";
import { FaviconDoTema } from "@/components/layout/FaviconDoTema";
import { Newsreader, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { TEMA_PADRAO, faviconDoTema, appleIconDoTema } from "@/lib/tema";
import "@/styles/tokens.css";
import "@/styles/prose.css";
import "./globals.css";

// Fonte variável com eixo óptico (opsz): em corpo pequeno o desenho fica mais
// encorpado e suaviza o serrilhado no Windows, onde font-smoothing não atua.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Pensa Comigo", template: "%s · Pensa Comigo" },
  description: "Meditações cristãs reflexivas — a fé que te obriga a pensar.",
  // ícone do tema padrão; o script inline troca para o tema salvo antes da primeira pintura
  icons: {
    icon: { url: faviconDoTema(TEMA_PADRAO), type: "image/png" },
    apple: { url: appleIconDoTema(TEMA_PADRAO), type: "image/png" },
  },
};

// Roda antes de qualquer pintura: aplica o tema salvo no <html> e aponta os ícones
// para ele, evitando o flash do favicon do tema padrão.
const SCRIPT_TEMA = `try{var t=localStorage.getItem("pc-theme");if(t&&["papel","tinta","terra"].indexOf(t)>=0){document.documentElement.dataset.theme=t;document.querySelectorAll('link[rel="icon"]').forEach(function(l){l.href="/favicons/"+t+"-96.png"});document.querySelectorAll('link[rel="apple-touch-icon"]').forEach(function(l){l.href="/favicons/"+t+"-180.png"})}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-theme={TEMA_PADRAO}
      // o script de tema muda data-theme antes da hidratação; divergência esperada
      suppressHydrationWarning
      className={`${newsreader.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* script síncrono no topo do body: aplica o tema salvo antes de qualquer pintura */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
        <NextTopLoader color="var(--accent)" height={2} showSpinner={false} shadow={false} />
        {children}
        <Toaster />
        <AvisoErroLogin />
        <FaviconDoTema />
      </body>
    </html>
  );
}
