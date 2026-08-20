"use client";

import { useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import styles from "./cortadorimagem.module.css";

/**
 * Corte/zoom antes do upload (CONTEXT.md: react-easy-crop + WebP no browser).
 * Devolve um File webp já recortado — quem chama decide quando subir.
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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [processando, setProcessando] = useState(false);

  async function confirmar() {
    if (!area) return;
    setProcessando(true);
    const img = new Image();
    img.src = url;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(area.width);
    canvas.height = Math.round(area.height);
    canvas
      .getContext("2d")!
      .drawImage(img, area.x, area.y, area.width, area.height, 0, 0, canvas.width, canvas.height);
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
          <Cropper
            image={url}
            crop={crop}
            zoom={zoom}
            aspect={aspecto}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, px) => setArea(px)}
          />
        </div>
        <label className={styles.zoom}>
          <span>zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
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
