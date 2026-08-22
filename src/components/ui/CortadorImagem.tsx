"use client";

import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import styles from "./cortadorimagem.module.css";

const ROTULOS: Record<string, string> = { [16 / 9]: "16:9", [4 / 3]: "4:3", [1]: "1:1" };

/**
 * Corte livre antes do upload (CONTEXT.md: WebP no browser).
 * Seleção livre com alças; um guia tracejado marca o formato ideal (16:9 por padrão),
 * que pode ser travado. Devolve um File webp já recortado — quem chama decide quando subir.
 */
export function CortadorImagem({
  url,
  aspecto = 16 / 9,
  onConfirmar,
  onCancelar,
}: {
  url: string;
  aspecto?: number;
  onConfirmar: (arquivo: File) => void;
  onCancelar: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [area, setArea] = useState<PixelCrop | null>(null);
  const [travado, setTravado] = useState(false);
  const [processando, setProcessando] = useState(false);

  const rotuloAspecto = ROTULOS[aspecto] ?? aspecto.toFixed(2);

  function selecaoIdeal(largura: number, altura: number, larguraPct = 90) {
    return centerCrop(
      makeAspectCrop({ unit: "%", width: larguraPct }, aspecto, largura, altura),
      largura,
      altura,
    );
  }

  function aoCarregar(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const inicial = selecaoIdeal(width, height);
    setCrop(inicial);
    setArea(convertToPixelCrop(inicial, width, height));
  }

  function travar(ligado: boolean) {
    setTravado(ligado);
    if (ligado && imgRef.current) {
      const { width, height } = imgRef.current;
      const ajustado = selecaoIdeal(width, height, crop?.width);
      setCrop(ajustado);
      setArea(convertToPixelCrop(ajustado, width, height));
    }
  }

  // Guia tracejado: o maior retângulo no aspecto ideal que cabe na seleção atual.
  function guia() {
    if (travado || !area?.width || !area?.height) return null;
    const razao = area.width / area.height;
    const estilo =
      razao > aspecto
        ? { width: `${(aspecto / razao) * 100}%`, height: "100%" }
        : { width: "100%", height: `${(razao / aspecto) * 100}%` };
    return (
      <div className={styles.guia} style={estilo}>
        <span>{rotuloAspecto}</span>
      </div>
    );
  }

  async function confirmar() {
    const img = imgRef.current;
    if (!img || !area?.width || !area?.height) return;
    setProcessando(true);
    const sx = img.naturalWidth / img.width;
    const sy = img.naturalHeight / img.height;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(area.width * sx);
    canvas.height = Math.round(area.height * sy);
    canvas
      .getContext("2d")!
      .drawImage(
        img,
        area.x * sx,
        area.y * sy,
        area.width * sx,
        area.height * sy,
        0,
        0,
        canvas.width,
        canvas.height,
      );
    canvas.toBlob(
      (blob) => {
        setProcessando(false);
        if (blob) onConfirmar(new File([blob], "imagem.webp", { type: "image/webp" }));
      },
      "image/webp",
      0.85,
    );
  }

  return (
    <div role="dialog" aria-modal="true" className={styles.veu} onClick={onCancelar}>
      <div className={styles.caixa} onClick={(e) => e.stopPropagation()}>
        <p className={styles.titulo}>AJUSTAR IMAGEM</p>
        <div className={styles.palco}>
          <ReactCrop
            crop={crop}
            aspect={travado ? aspecto : undefined}
            onChange={(px, pct) => {
              setCrop(pct);
              setArea(px);
            }}
            renderSelectionAddon={guia}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={url} alt="" className={styles.imagem} onLoad={aoCarregar} />
          </ReactCrop>
        </div>
        <label className={styles.travar}>
          <input type="checkbox" checked={travado} onChange={(e) => travar(e.target.checked)} />
          <span>travar no formato ideal ({rotuloAspecto})</span>
        </label>
        <div className={styles.acoes}>
          <button type="button" className={styles.cancelar} onClick={onCancelar}>
            Cancelar
          </button>
          <button type="button" className={styles.confirmar} disabled={processando} onClick={confirmar}>
            {processando ? "Processando…" : "Usar imagem"}
          </button>
        </div>
      </div>
    </div>
  );
}
