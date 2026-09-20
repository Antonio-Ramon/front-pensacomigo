"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { ouvirPost } from "@/lib/tempoReal";

/**
 * O contador precisa ser cliente só por causa do realtime: quem abriu o post já recebeu o
 * número pelo GET (que é quem incrementa), e os próximos chegam pelo WebSocket.
 */
export function Visualizacoes({ postId, inicial }: { postId: string; inicial: number }) {
  const [total, setTotal] = useState(inicial);

  useEffect(() => ouvirPost(postId, { PostVisualizado: setTotal }), [postId]);

  return (
    <>
      <Eye size={15} /> {total}
    </>
  );
}
