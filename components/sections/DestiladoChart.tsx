import type { Registration } from "@/lib/types";
import { DESTILADOS } from "@/lib/data/destilados";

// Cores na mesma ordem categórica fixa usada no resto do app (cada destilado
// sempre com a mesma cor, independente de quantas pessoas escolheram).
const COLORS: Record<string, string> = {
  Vodka: "#2a78d6",
  Whisky: "#eb6834",
  Gin: "#1baf7a",
  Rum: "#eda100",
  Tequila: "#e87ba4",
  Cachaça: "#008300",
  "Não vou beber": "#4a3aa7",
};
const UNANSWERED_LABEL = "Ainda não respondeu";
const UNANSWERED_COLOR = "#c3c2b7";
const TRACK_COLOR = "#ffffff";

const SIZE = 176;
const STROKE = 26;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 3;

export function DestiladoChart({ registrations }: { registrations: Registration[] }) {
  const total = registrations.length;
  if (total === 0) return null;

  const counts = new Map<string, number>();
  for (const r of registrations) {
    const key = r.destilado_combo ?? UNANSWERED_LABEL;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const categories = [...DESTILADOS, UNANSWERED_LABEL]
    .map((label) => ({
      label,
      count: counts.get(label) ?? 0,
      color: COLORS[label] ?? UNANSWERED_COLOR,
    }))
    .filter((c) => c.count > 0);

  let cursor = 0;
  const segments = categories.map((c) => {
    const length = (c.count / total) * CIRCUMFERENCE;
    const offset = cursor;
    cursor += length;
    return { ...c, length, offset };
  });

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide">
        Preferência de destilado
      </h3>
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
            <span className="text-2xl font-bold text-zinc-900">{total}</span>
            <span className="text-[10px] tracking-wide text-zinc-500 uppercase">confirmados</span>
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
              <span className="text-zinc-700">{s.label}</span>
              <span className="text-zinc-400">
                {Math.round((s.count / total) * 100)}% ({s.count})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
