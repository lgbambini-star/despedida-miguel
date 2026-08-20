import Image from "next/image";
import Link from "next/link";
import type { Registration } from "@/lib/types";
import { groupByAnimal } from "@/lib/zoo";

const ACCENTS = [
  { border: "border-mint/30", chip: "bg-mint/15 text-mint", glow: "shadow-[0_4px_24px_rgba(0,255,176,0.12)]" },
  { border: "border-orange/30", chip: "bg-orange/15 text-orange", glow: "shadow-[0_4px_24px_rgba(255,107,53,0.12)]" },
  { border: "border-cyan/30", chip: "bg-cyan/15 text-cyan", glow: "shadow-[0_4px_24px_rgba(0,180,216,0.12)]" },
  { border: "border-pink/30", chip: "bg-pink/15 text-pink", glow: "shadow-[0_4px_24px_rgba(255,0,110,0.12)]" },
];

export function Zoo({ registrations }: { registrations: Registration[] }) {
  const enclosures = groupByAnimal(registrations);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-display text-2xl">O zoológico 🦁</h2>
        <p className="mt-1 text-sm text-white/60">
          {registrations.length} de 14 bichos já soltos no recinto.
        </p>
      </div>

      {enclosures.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-white/50">
          <p>O zoológico ainda está vazio.</p>
          <Link href="/cadastro" className="mt-2 inline-block text-mint underline">
            Seja o primeiro bicho a entrar
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {enclosures.map((enclosure, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <div
                key={enclosure.animal}
                className={`overflow-hidden rounded-2xl border bg-white/5 backdrop-blur-sm ${accent.border} ${accent.glow}`}
              >
                <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-white/5 px-3 py-1.5">
                  <p className="truncate text-xs font-bold tracking-wide text-white/70 uppercase">
                    🏷️ {enclosure.animal}
                  </p>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${accent.chip}`}>
                    {enclosure.people.length}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 px-4 py-5">
                  {enclosure.image ? (
                    <Image
                      src={enclosure.image}
                      alt={enclosure.animal}
                      width={552}
                      height={728}
                      className="h-auto w-32 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                    />
                  ) : (
                    <span className="text-4xl">{enclosure.emoji}</span>
                  )}
                  <ul className="flex flex-wrap justify-center gap-2">
                    {enclosure.people.map((p) => (
                      <li
                        key={p.id}
                        className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/80"
                      >
                        {p.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
