import Link from "next/link";
import type { Registration } from "@/lib/types";
import { instrumentEmoji } from "@/lib/band";

export function BandStage({ registrations }: { registrations: Registration[] }) {
  const sorted = [...registrations].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-display text-2xl">A banda da viagem 🎸</h2>
        <p className="mt-1 text-sm text-white/60">
          {sorted.length} de 14 integrantes já escalados na banda.
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-white/50">
          <p>O palco ainda está vazio.</p>
          <Link href="/cadastro" className="mt-2 inline-block text-mint underline">
            Seja o primeiro a subir no palco
          </Link>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border-4 border-white/10 bg-gradient-to-b from-[#0a0518] via-[#0d0320] to-bg px-4 py-10 shadow-inner">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 left-1/4 h-40 w-40 rounded-full bg-pink/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 right-1/4 h-40 w-40 rounded-full bg-cyan/30 blur-3xl"
          />

          <div className="relative flex flex-wrap justify-center gap-4">
            {sorted.map((r) => (
              <div
                key={r.id}
                className="flex min-w-[100px] flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/8 px-3 py-3 text-center backdrop-blur-sm"
              >
                <span className="text-2xl">{instrumentEmoji(r.instrument)}</span>
                <span className="text-xs leading-tight font-semibold text-white">
                  {r.instrument}
                </span>
                <span className="text-[11px] leading-tight text-white/60">{r.name}</span>
              </div>
            ))}
          </div>

          <div
            aria-hidden
            className="relative mt-8 h-2 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>
      )}
    </div>
  );
}
