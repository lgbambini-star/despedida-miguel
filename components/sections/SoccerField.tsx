import Link from "next/link";
import { CardImage } from "@/components/CardImage";
import type { PlayerPosition, Registration } from "@/lib/types";
import { PLAYERS } from "@/lib/data/players";
import {
  computeLineup,
  POSITION_LABEL,
  POSITION_ORDER,
  type LineupSlot,
} from "@/lib/lineup";

const PLAYER_BY_NAME = new Map(PLAYERS.map((p) => [p.name, p]));

function PositionSlot({ slot, position }: { slot: LineupSlot; position: PlayerPosition }) {
  if (slot) {
    const card = PLAYER_BY_NAME.get(slot.player);
    return (
      <div className="flex w-24 flex-col items-center gap-1 text-center">
        {card && (
          <CardImage
            src={card.image}
            alt={card.name}
            personName={slot.name}
            width={536}
            height={776}
            className="h-auto w-full rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
          />
        )}
        <span className="text-[11px] leading-tight font-semibold text-white">{slot.name}</span>
      </div>
    );
  }

  return (
    <div className="flex w-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-white/20 px-3 py-8 text-center text-white/50">
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
              <ul className="mt-3 flex flex-wrap gap-3">
                {bench.map((r) => {
                  const card = PLAYER_BY_NAME.get(r.player);
                  return (
                    <li key={r.id} className="flex w-20 flex-col items-center gap-1 text-center">
                      {card && (
                        <CardImage
                          src={card.image}
                          alt={card.name}
                          personName={r.name}
                          width={536}
                          height={776}
                          className="h-auto w-full rounded-lg opacity-90 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                        />
                      )}
                      <span className="text-[11px] leading-tight text-white/70">{r.name}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
