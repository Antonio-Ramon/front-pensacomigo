export default function Home() {
  return (
    <main
      style={{
        maxWidth: "var(--container)",
        margin: "0 auto",
        padding: "var(--sp-8) var(--gutter)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-display)",
          fontWeight: "var(--w-light)",
          lineHeight: "var(--lh-display)",
          letterSpacing: "var(--tracking-display)",
          margin: 0,
        }}
      >
        Pensa Comigo
      </h1>
      <p style={{ color: "var(--soft)", fontSize: "var(--fs-lede)" }}>
        A fé que te obriga a pensar. — feed chega na fase 2.
      </p>
    </main>
  );
}
