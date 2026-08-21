"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export function CardImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  personName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  personName?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ver carta de ${alt} em tamanho maior`}
        className="block w-full cursor-zoom-in"
      >
        <Image src={src} alt={alt} width={width} height={height} className={className} priority={priority} />
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20"
            >
              ✕
            </button>
            <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                onClick={() => setOpen(false)}
                className="h-auto max-h-[85vh] w-auto max-w-[90vw] cursor-zoom-out rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              />
              {personName && (
                <p className="font-display text-xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {personName}
                </p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
