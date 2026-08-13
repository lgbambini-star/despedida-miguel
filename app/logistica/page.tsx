import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/format";
import type { Registration } from "@/lib/types";
import {
  computePresenceByDay,
  formatDayLabel,
  suggestArrivalCarpools,
  suggestDepartureCarpools,
} from "@/lib/logistics";

export default async function LogisticaPage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("arrival_at", { ascending: true });

  const registrations = (data ?? []) as Registration[];
  const totalRegistered = registrations.length;

  const presenceByDay = computePresenceByDay(registrations);
  const arrivalCarpools = suggestArrivalCarpools(registrations);
  const departureCarpools = suggestDepartureCarpools(registrations);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-6 py-12">
      <div>
        <h1 className="text-2xl font-semibold">Linha do tempo da viagem</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Quem está na Praia do Rosa em cada dia, com base nos voos cadastrados.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600">Não consegui carregar os dados agora. Tenta recarregar.</p>
      )}

      {!error && totalRegistered === 0 && (
        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
          <p>Ninguém se cadastrou ainda.</p>
          <Link href="/cadastro" className="mt-2 inline-block underline">
            Seja o primeiro
          </Link>
        </div>
      )}

      {totalRegistered > 0 && (
        <section className="flex flex-col gap-4">
          {presenceByDay.map(({ day, people }) => {
            const isFull = totalRegistered > 0 && people.length === totalRegistered;
            return (
              <div key={day} className="rounded-lg border border-zinc-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{formatDayLabel(day)}</p>
                  <p className="text-sm text-zinc-600">
                    {people.length} de {totalRegistered} presentes
                    {isFull ? " · 🎉 grupo completo" : ""}
                  </p>
                </div>
                {people.length === 0 ? (
                  <p className="mt-2 text-sm text-zinc-400">Ninguém ainda nesse dia.</p>
                ) : (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {people.map((p) => (
                      <li
                        key={p.id}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700"
                      >
                        {p.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>
      )}

      {totalRegistered > 1 && (
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold">Sugestão de caronas 🚐</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Gente com horários próximos (até 1h30 de diferença) pra dividir o transfer
              Floripa → Praia do Rosa.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide">
              Chegadas
            </h3>
            {arrivalCarpools.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-400">
                Nenhum grupo próximo ainda.
              </p>
            ) : (
              <ul className="mt-2 flex flex-col gap-2">
                {arrivalCarpools.map((group, i) => (
                  <li key={i} className="rounded-lg border border-zinc-200 p-3 text-sm">
                    <span className="font-medium">~{group.time}</span> —{" "}
                    {group.people.map((p) => p.name).join(", ")}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide">
              Voltas
            </h3>
            {departureCarpools.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-400">
                Nenhum grupo próximo ainda.
              </p>
            ) : (
              <ul className="mt-2 flex flex-col gap-2">
                {departureCarpools.map((group, i) => (
                  <li key={i} className="rounded-lg border border-zinc-200 p-3 text-sm">
                    <span className="font-medium">~{group.time}</span> —{" "}
                    {group.people.map((p) => p.name).join(", ")}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {totalRegistered > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Todos os voos</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {registrations.map((r) => (
              <li key={r.id} className="rounded-lg border border-zinc-200 p-4 text-sm">
                <p className="font-semibold">{r.name}</p>
                <p className="mt-1 text-zinc-600">
                  Chegada: {formatDateTime(r.arrival_at)} · Volta: {formatDateTime(r.departure_at)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
