import Link from "next/link";
import type { Registration } from "@/lib/types";
import { DestiladoChart } from "@/components/sections/DestiladoChart";

export function RegistrationsList({ registrations }: { registrations: Registration[] }) {
  const sorted = [...registrations].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-2xl">Quem já confirmou</h2>

      {sorted.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-white/50">
          <p>Ninguém se cadastrou ainda.</p>
          <Link href="/cadastro" className="mt-2 inline-block text-mint underline">
            Seja o primeiro
          </Link>
        </div>
      ) : (
        <>
          <div className="animate-float w-fit rounded-2xl border border-mint/25 bg-white/6 px-6 py-4 shadow-[0_4px_24px_rgba(0,255,176,0.12)] backdrop-blur-lg">
            <p className="font-display text-3xl text-mint">{sorted.length}</p>
            <p className="text-xs tracking-widest text-white/50 uppercase">de 14 confirmados</p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {sorted.map((r) => (
              <li
                key={r.id}
                className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-sm"
              >
                {r.name}
              </li>
            ))}
          </ul>

          <DestiladoChart registrations={sorted} />
        </>
      )}
    </div>
  );
}
