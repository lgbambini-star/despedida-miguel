import Link from "next/link";
import type { Registration } from "@/lib/types";
import { countDestiladoVotes } from "@/lib/destiladoStats";

const TRACK_COLOR = "rgba(255,255,255,0.08)";

const SIZE = 176;
const STROKE = 26;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 3;

export function DestiladoChart({ registrations }: { registrations: Registration[] }) {
  const total = registrations.length;

  if (total === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-center font-display text-2xl">Preferência de destilado 🍹</h2>
        <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-white/50">
          <p>Ninguém respondeu ainda.</p>
          <Link href="/cadastro" className="mt-2 inline-block text-mint underline">
            Seja o primeiro
          </Link>
        </div>
      </div>
    );
  }

  const categories = countDestiladoVotes(registrations);

  let cursor = 0;
  const segments = categories.map((c) => {
    const length = (c.count / total) * CIRCUMFERENCE;
    const offset = cursor;
    cursor += length;
    return { ...c, length, offset };
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center font-display text-2xl">Preferência de destilado 🍹</h2>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="-rotate-90"
            role="img"
            aria-label="Gráfico de pizza com a preferência de destilado do grupo"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={TRACK_COLOR}
              strokeWidth={STROKE}
            />
            {segments.map((s) => (
              <circle
                key={s.label}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={s.color}
                strokeWidth={STROKE}
                strokeDasharray={`${Math.max(s.length - (segments.length > 1 ? GAP : 0), 0)} ${CIRCUMFERENCE}`}
                strokeDashoffset={-s.offset}
              >
                <title>{`${s.label}: ${s.count} de ${total} (${Math.round((s.count / total) * 100)}%)`}</title>
              </circle>
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl text-white">{total}</span>
            <span className="text-[10px] tracking-wide text-white/50 uppercase">confirmados</span>
          </div>
        </div>

        <ul className="flex flex-col gap-1.5">
          {segments.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-sm">
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-white/80">{s.label}</span>
              <span className="text-white/40">
                {Math.round((s.count / total) * 100)}% ({s.count})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
