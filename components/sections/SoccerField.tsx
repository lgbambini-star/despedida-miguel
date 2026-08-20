import Link from "next/link";
import type { PlayerPosition, Registration } from "@/lib/types";
import {
  computeLineup,
  POSITION_LABEL,
  POSITION_ORDER,
  type LineupSlot,
} from "@/lib/lineup";

function PositionSlot({ slot, position }: { slot: LineupSlot; position: PlayerPosition }) {
  if (slot) {
    return (
      <div className="flex min-w-[84px] flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/8 px-3 py-2 text-center backdrop-blur-sm">
        <span className="text-lg">👕</span>
        <span className="text-xs leading-tight font-semibold text-white">{slot.player}</span>
        <span className="text-[11px] leading-tight text-white/60">{slot.name}</span>
      </div>
    );
  }

  return (
    <div className="flex min-w-[84px] flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-white/20 px-3 py-3 text-center text-white/50">
      <span className="text-lg">⚪</span>
      <span className="text-[11px] leading-tight">{POSITION_LABEL[position]}</span>
    </div>
  );
}

export function SoccerField({ registrations }: { registrations: Registration[] }) {
  const { starters, bench } = computeLineup(registrations);
  const startersFilled = POSITION_ORDER.reduce(
    (count, pos) => count + starters[pos].filter(Boolean).length,
    0,
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-center font-display text-2xl">Escalação da viagem ⚽</h2>
        <p className="mt-1 text-sm text-white/60">
          {startersFilled} de 11 titulares definidos — cada pessoa entra em campo na posição
          do jogador que saiu no sorteio ao se cadastrar.
        </p>
      </div>

      {registrations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-white/50">
          <p>O campo ainda está vazio.</p>
          <Link href="/cadastro" className="mt-2 inline-block text-mint underline">
            Seja o primeiro a entrar em campo
          </Link>
        </div>
      ) : (
        <>
          <div className="relative overflow-hidden rounded-2xl border-4 border-mint/20 bg-gradient-to-b from-[#031810] via-[#04120d] to-bg px-4 py-8 shadow-inner">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 left-1/4 h-40 w-40 rounded-full bg-mint/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-4 rounded-lg border-2 border-mint/15"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-mint/15"
            />

            <div className="relative flex flex-col gap-8">
              {POSITION_ORDER.map((position) => (
                <div key={position} className="flex flex-wrap justify-center gap-3">
                  {starters[position].map((slot, i) => (
                    <PositionSlot key={i} slot={slot} position={position} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <section>
            <h3 className="font-display text-xl">Banco de reservas</h3>
            {bench.length === 0 ? (
              <p className="mt-2 text-sm text-white/40">Ninguém no banco por enquanto.</p>
            ) : (
              <ul className="mt-3 flex flex-wrap gap-2">
                {bench.map((r) => (
                  <li
                    key={r.id}
                    className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/70"
                  >
                    {r.player} — {r.name}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
