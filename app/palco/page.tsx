import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Registration } from "@/lib/types";
import { instrumentEmoji } from "@/lib/band";

export default async function PalcoPage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: true });

  const registrations = (data ?? []) as Registration[];

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-12">
      <div>
        <h1 className="text-2xl font-semibold">A banda da viagem 🎸</h1>
        <p className="mt-1 text-sm text-zinc-600">
          {registrations.length} de 14 integrantes já escalados na banda.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600">Não consegui carregar o palco agora. Tenta recarregar.</p>
      )}

      {!error && registrations.length === 0 && (
        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
          <p>O palco ainda está vazio.</p>
          <Link href="/cadastro" className="mt-2 inline-block underline">
            Seja o primeiro a subir no palco
          </Link>
        </div>
      )}

      {!error && registrations.length > 0 && (
        <div className="relative overflow-hidden rounded-2xl border-4 border-white/10 bg-gradient-to-b from-indigo-950 via-purple-950 to-black px-4 py-10 shadow-inner">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 left-1/4 h-40 w-40 rounded-full bg-fuchsia-500/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 right-1/4 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl"
          />

          <div className="relative flex flex-wrap justify-center gap-4">
            {registrations.map((r) => (
              <div
                key={r.id}
                className="flex min-w-[100px] flex-col items-center gap-1 rounded-xl bg-white/95 px-3 py-3 text-center shadow-lg"
              >
                <span className="text-2xl">{instrumentEmoji(r.instrument)}</span>
                <span className="text-xs leading-tight font-semibold text-zinc-900">
                  {r.instrument}
                </span>
                <span className="text-[11px] leading-tight text-zinc-600">{r.name}</span>
              </div>
            ))}
          </div>

          <div
            aria-hidden
            className="relative mt-8 h-2 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>
      )}
    </main>
  );
}
