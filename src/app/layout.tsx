import type { Metadata } from "next";
import Script from "next/script";
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
      className={`${newsreader.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* aplica o tema salvo antes da pintura, evitando flash do tema padrão */}
        <Script id="tema" strategy="beforeInteractive">
          {'try{var t=localStorage.getItem("tema");if(t)document.documentElement.dataset.theme=t}catch(e){}'}
        </Script>
        {children}
      </body>
    </html>
  );
}
