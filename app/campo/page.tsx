import Link from "next/link";
import { BackHomeLink } from "@/components/BackHomeLink";
import { createServerSupabaseClient } from "@/lib/supabase/server";
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
      <div className="flex min-w-[84px] flex-col items-center gap-1 rounded-xl bg-white/95 px-3 py-2 text-center shadow-sm">
        <span className="text-lg">👕</span>
        <span className="text-xs leading-tight font-semibold text-zinc-900">{slot.player}</span>
        <span className="text-[11px] leading-tight text-zinc-600">{slot.name}</span>
      </div>
    );
  }

  return (
    <div className="flex min-w-[84px] flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-white/50 px-3 py-3 text-center text-white/70">
      <span className="text-lg">⚪</span>
      <span className="text-[11px] leading-tight">{POSITION_LABEL[position]}</span>
    </div>
  );
}

export default async function CampoPage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("registrations").select("*");

  const registrations = (data ?? []) as Registration[];
  const { starters, bench } = computeLineup(registrations);
  const startersFilled = POSITION_ORDER.reduce(
    (count, pos) => count + starters[pos].filter(Boolean).length,
    0,
  );

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-12">
      <BackHomeLink />
      <div>
        <h1 className="text-2xl font-semibold">Escalação da viagem ⚽</h1>
        <p className="mt-1 text-sm text-zinc-600">
          {startersFilled} de 11 titulares definidos — cada pessoa entra em campo na posição
          do jogador da Copa de 2002 que ela escolheu.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600">Não consegui carregar a escalação agora. Tenta recarregar.</p>
      )}

      {!error && registrations.length === 0 && (
        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
          <p>O campo ainda está vazio.</p>
          <Link href="/cadastro" className="mt-2 inline-block underline">
            Seja o primeiro a entrar em campo
          </Link>
        </div>
      )}

      {!error && registrations.length > 0 && (
        <>
          <div className="relative overflow-hidden rounded-2xl border-4 border-white/40 bg-gradient-to-b from-green-600 to-green-800 px-4 py-8 shadow-inner">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-4 rounded-lg border-2 border-white/30"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30"
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
            <h2 className="text-xl font-semibold">Banco de reservas</h2>
            {bench.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-400">Ninguém no banco por enquanto.</p>
            ) : (
              <ul className="mt-3 flex flex-wrap gap-2">
                {bench.map((r) => (
                  <li
                    key={r.id}
                    className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700"
                  >
                    {r.player} — {r.name}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}
