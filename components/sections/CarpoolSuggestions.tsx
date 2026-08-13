import Link from "next/link";
import { formatDateTime } from "@/lib/format";
import type { Registration } from "@/lib/types";
import { suggestArrivalCarpools, suggestDepartureCarpools } from "@/lib/logistics";

export function CarpoolSuggestions({ registrations }: { registrations: Registration[] }) {
  const sorted = [...registrations].sort(
    (a, b) => new Date(a.arrival_at).getTime() - new Date(b.arrival_at).getTime(),
  );
  const arrivalCarpools = suggestArrivalCarpools(registrations);
  const departureCarpools = suggestDepartureCarpools(registrations);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-2xl font-semibold">Sugestão de caronas 🚐</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Gente com horários próximos (até 1h30 de diferença) pra dividir o transfer
          Floripa → Praia do Rosa.
        </p>
      </div>

      {sorted.length === 0 && (
        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
          <p>Ninguém se cadastrou ainda.</p>
          <Link href="/cadastro" className="mt-2 inline-block underline">
            Seja o primeiro
          </Link>
        </div>
      )}

      {sorted.length > 1 && (
        <section className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide">
              Chegadas
            </h3>
            {arrivalCarpools.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-400">Nenhum grupo próximo ainda.</p>
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
              <p className="mt-2 text-sm text-zinc-400">Nenhum grupo próximo ainda.</p>
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

      {sorted.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold">Todos os voos</h3>
          <ul className="mt-3 flex flex-col gap-3">
            {sorted.map((r) => (
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
    </div>
  );
}
