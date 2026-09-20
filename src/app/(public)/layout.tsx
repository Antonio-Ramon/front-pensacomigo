import { Header, LinksPublicos, NavPublica } from "@/components/layout/Header";
import { AdminLink } from "@/components/layout/AdminLink";
import { MenuMobile } from "@/components/layout/MenuMobile";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header acoes={<AdminLink />} menu={<MenuMobile><LinksPublicos /></MenuMobile>}>
        <NavPublica />
      </Header>
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
