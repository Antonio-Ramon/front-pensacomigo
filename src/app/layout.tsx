import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Newsreader, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/prose.css";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-theme="papel"
      // o script de tema muda data-theme antes da hidratação; divergência esperada
      suppressHydrationWarning
      className={`${newsreader.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* script síncrono no topo do body: aplica o tema salvo antes de qualquer pintura */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("pc-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}',
          }}
        />
        <NextTopLoader color="var(--accent)" height={2} showSpinner={false} shadow={false} />
        {children}
      </body>
    </html>
  );
}
