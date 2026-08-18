import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          padding: "var(--sp-6) var(--gutter)",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
