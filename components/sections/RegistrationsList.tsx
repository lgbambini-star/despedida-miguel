import Link from "next/link";
import { formatDateTime } from "@/lib/format";
import type { Registration } from "@/lib/types";

export function RegistrationsList({ registrations }: { registrations: Registration[] }) {
  const sorted = [...registrations].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold">Quem já confirmou</h2>
        <p className="mt-1 text-sm text-zinc-600">{sorted.length} de 14 pessoas cadastradas.</p>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
          <p>Ninguém se cadastrou ainda.</p>
          <Link href="/cadastro" className="mt-2 inline-block underline">
            Seja o primeiro
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {sorted.map((r) => (
            <li key={r.id} className="rounded-lg border border-zinc-200 p-4">
              <p className="font-semibold">{r.name}</p>
              <p className="mt-1 text-sm text-zinc-600">
                Chegada: {formatDateTime(r.arrival_at)} · Volta: {formatDateTime(r.departure_at)}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                ⚽ {r.player} · 🎸 {r.instrument} · 🐾 {r.animal}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                🥃 {r.destilado_combo ?? "—"} · 🚗 Aluga carro:{" "}
                {r.pode_alugar_carro === null ? "—" : r.pode_alugar_carro ? "Sim" : "Não"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
