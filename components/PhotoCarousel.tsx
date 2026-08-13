"use client";

import { useState } from "react";
import Image from "next/image";

const PHOTOS = [
  "/fotos-miguel/foto-1.jpg",
  "/fotos-miguel/foto-2.jpg",
  "/fotos-miguel/foto-3.jpg",
  "/fotos-miguel/foto-4.jpg",
  "/fotos-miguel/foto-5.jpg",
];

export function PhotoCarousel() {
  const [index, setIndex] = useState(0);

  function goTo(next: number) {
    setIndex((next + PHOTOS.length) % PHOTOS.length);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-zinc-100 shadow-md sm:aspect-video sm:max-w-2xl">
        <Image
          src={PHOTOS[index]}
          alt={`Foto do Miguel ${index + 1}`}
          fill
          sizes="(min-width: 640px) 672px, 384px"
          className="object-cover"
          priority={index === 0}
        />

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Foto anterior"
          className="absolute top-1/2 left-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-lg text-white backdrop-blur-sm transition hover:bg-black/60"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Próxima foto"
          className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-lg text-white backdrop-blur-sm transition hover:bg-black/60"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir para a foto ${i + 1}`}
            className={
              i === index
                ? "h-2 w-6 rounded-full bg-zinc-800 transition"
                : "h-2 w-2 rounded-full bg-zinc-300 transition hover:bg-zinc-400"
            }
          />
        ))}
      </div>
    </div>
  );
}
