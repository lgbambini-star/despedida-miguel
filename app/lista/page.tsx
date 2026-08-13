import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/format";
import type { Registration } from "@/lib/types";

export default async function ListaPage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: true });

  const registrations = (data ?? []) as Registration[];

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-semibold">Quem já confirmou</h1>
        <p className="mt-1 text-sm text-zinc-600">
          {registrations.length} de 14 pessoas cadastradas.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600">Não consegui carregar a lista agora. Tenta recarregar.</p>
      )}

      {!error && registrations.length === 0 && (
        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
          <p>Ninguém se cadastrou ainda.</p>
          <Link href="/cadastro" className="mt-2 inline-block underline">
            Seja o primeiro
          </Link>
        </div>
      )}

      <ul className="flex flex-col gap-3">
        {registrations.map((r) => (
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
    </main>
  );
}
