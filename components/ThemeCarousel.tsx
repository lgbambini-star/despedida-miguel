"use client";

import { useState } from "react";
import type { Registration } from "@/lib/types";
import { SoccerField } from "@/components/sections/SoccerField";
import { BandStage } from "@/components/sections/BandStage";
import { Zoo } from "@/components/sections/Zoo";

const SLIDES = [
  { id: "campo", label: "Escalação ⚽" },
  { id: "palco", label: "A banda 🎸" },
  { id: "zoologico", label: "Zoológico 🦁" },
] as const;

export function ThemeCarousel({ registrations }: { registrations: Registration[] }) {
  const [index, setIndex] = useState(0);

  function goTo(next: number) {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Tema anterior"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-lg text-zinc-600 transition hover:bg-zinc-100"
        >
          ‹
        </button>

        <div className="flex flex-1 justify-center gap-2 overflow-x-auto sm:flex-initial">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              className={
                i === index
                  ? "rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium whitespace-nowrap text-white"
                  : "rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium whitespace-nowrap text-zinc-600 transition hover:bg-zinc-100"
              }
            >
              {slide.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Próximo tema"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-lg text-zinc-600 transition hover:bg-zinc-100"
        >
          ›
        </button>
      </div>

      <div>
        {index === 0 && <SoccerField registrations={registrations} />}
        {index === 1 && <BandStage registrations={registrations} />}
        {index === 2 && <Zoo registrations={registrations} />}
      </div>
    </div>
  );
}
