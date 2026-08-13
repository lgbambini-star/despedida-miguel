import Link from "next/link";
import type { Registration } from "@/lib/types";
import { groupByAnimal } from "@/lib/zoo";

export function Zoo({ registrations }: { registrations: Registration[] }) {
  const enclosures = groupByAnimal(registrations);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold">O zoológico 🦁</h2>
        <p className="mt-1 text-sm text-zinc-600">
          {registrations.length} de 14 bichos já soltos no recinto.
        </p>
      </div>

      {enclosures.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
          <p>O zoológico ainda está vazio.</p>
          <Link href="/cadastro" className="mt-2 inline-block underline">
            Seja o primeiro bicho a entrar
          </Link>
        </div>
      ) : (
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
    </div>
  );
}
