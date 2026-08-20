"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./layout.module.css";

/** Pill "admin →" do header — só aparece para admin logado. */
export function AdminLink() {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/sessao")
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => setAdmin(!!s?.admin))
      .catch(() => {});
  }, []);

  if (!admin) return null;
  return (
    <Link href="/escrivaninha" className={styles.navAdmin}>
      admin <ArrowRight size={11} />
    </Link>
  );
}
