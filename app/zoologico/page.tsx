import Link from "next/link";
import { BackHomeLink } from "@/components/BackHomeLink";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Registration } from "@/lib/types";
import { groupByAnimal } from "@/lib/zoo";

export default async function ZoologicoPage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: true });

  const registrations = (data ?? []) as Registration[];
  const enclosures = groupByAnimal(registrations);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-12">
      <BackHomeLink />
      <div>
        <h1 className="text-2xl font-semibold">O zoológico 🦁</h1>
        <p className="mt-1 text-sm text-zinc-600">
          {registrations.length} de 14 bichos já soltos no recinto.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600">Não consegui carregar o zoológico agora. Tenta recarregar.</p>
      )}

      {!error && registrations.length === 0 && (
        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
          <p>O zoológico ainda está vazio.</p>
          <Link href="/cadastro" className="mt-2 inline-block underline">
            Seja o primeiro bicho a entrar
          </Link>
        </div>
      )}

      {!error && enclosures.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {enclosures.map((enclosure) => (
            <div
              key={enclosure.animal}
              className="overflow-hidden rounded-2xl border-[6px] border-amber-800/70 bg-gradient-to-b from-lime-100 to-amber-100 shadow-md"
            >
              <div className="flex items-center justify-between gap-2 bg-amber-800/90 px-3 py-1.5">
                <p className="truncate text-xs font-bold tracking-wide text-amber-50 uppercase">
                  🏷️ {enclosure.animal}
                </p>
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                  {enclosure.people.length}
                </span>
              </div>
              <div className="flex flex-col items-center gap-3 px-4 py-5">
                <span className="text-4xl">{enclosure.emoji}</span>
                <ul className="flex flex-wrap justify-center gap-2">
                  {enclosure.people.map((p) => (
                    <li
                      key={p.id}
                      className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm"
                    >
                      {p.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
