import Link from "next/link";
import { formatDateTime } from "@/lib/format";
import type { Registration } from "@/lib/types";
import { planCarpools } from "@/lib/carpool";

export function CarpoolSuggestions({ registrations }: { registrations: Registration[] }) {
  const sortedByArrival = [...registrations].sort(
    (a, b) => new Date(a.arrival_at).getTime() - new Date(b.arrival_at).getTime(),
  );
  const renters = registrations.filter((r) => r.pode_alugar_carro === true);
  const { cars, unassigned } = planCarpools(registrations);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-2xl font-semibold">Sugestão de caronas 🚐</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Até 3 carros, 5 pessoas cada, alugados no nome de quem marcou que pode alugar —
          a mesma pessoa pega o carro na chegada e devolve na volta.
        </p>
      </div>

      {sortedByArrival.length === 0 && (
        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
          <p>Ninguém se cadastrou ainda.</p>
          <Link href="/cadastro" className="mt-2 inline-block underline">
            Seja o primeiro
          </Link>
        </div>
      )}

      {sortedByArrival.length > 0 && renters.length === 0 && (
        <p className="text-sm text-zinc-500">
          Ninguém marcou ainda que pode alugar carro. Assim que alguém marcar &quot;Sim&quot; no
          cadastro, os carros aparecem aqui.
        </p>
      )}

      {cars.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          {cars.map((car, i) => (
            <div
              key={car.renter.id}
              className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4"
            >
              <div>
                <p className="font-semibold">Carro {i + 1} 🚗</p>
                <p className="text-xs text-zinc-500">
                  Alugado por <span className="font-medium text-zinc-700">{car.renter.name}</span>
                </p>
              </div>
              <ul className="flex flex-col gap-2 text-sm">
                {car.members.map((m) => (
                  <li key={m.id} className="rounded-lg bg-zinc-50 px-3 py-2">
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-zinc-500">
                      Chegada: {formatDateTime(m.arrival_at)} · Volta: {formatDateTime(m.departure_at)}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-zinc-400">{car.members.length}/5 lugares</p>
            </div>
          ))}
        </div>
      )}

      {unassigned.length > 0 && (
        <div className="rounded-xl border border-dashed border-red-300 bg-red-50 p-4">
          <p className="font-semibold text-red-700">😅 Se ferrou, vai ter que pegar um táxi ou ônibus</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {unassigned.map((p) => (
              <li key={p.id} className="rounded-full bg-white px-3 py-1 text-sm text-red-700 shadow-sm">
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {sortedByArrival.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold">Todos os voos</h3>
          <ul className="mt-3 flex flex-col gap-3">
            {sortedByArrival.map((r) => (
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
