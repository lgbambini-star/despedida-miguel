import type { Registration } from "@/lib/types";
import { DESTILADO_EMOJI, topDestilados } from "@/lib/destiladoStats";

const RANK_LABEL = ["TOP 1", "TOP 2", "TOP 3"];
const RANK_ACCENT = [
  { text: "text-mint", border: "border-mint/30", chip: "bg-mint/15", badge: "bg-mint text-bg" },
  { text: "text-orange", border: "border-orange/30", chip: "bg-orange/15", badge: "bg-orange text-bg" },
  { text: "text-cyan", border: "border-cyan/30", chip: "bg-cyan/15", badge: "bg-cyan text-bg" },
];
const FLOAT_CLASS = ["animate-float", "animate-float2", "animate-float3"];
const MAX_NAMES = 8;

export function HeroSpotlight({ registrations }: { registrations: Registration[] }) {
  if (registrations.length === 0) return null;

  const sorted = [...registrations].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
  const visible = sorted.slice(0, MAX_NAMES);
  const overflow = sorted.length - visible.length;
  const top = topDestilados(registrations, 3);

  return (
    <div className="relative flex w-full max-w-sm flex-col gap-4">
      <div className="animate-float rounded-2xl border border-white/10 bg-white/6 px-5 py-4 shadow-[0_4px_24px_rgba(0,255,176,0.12)] backdrop-blur-lg">
        <p className="font-display text-3xl text-mint">
          {sorted.length}
          <span className="text-base text-white/40"> /14</span>
        </p>
        <p className="text-[11px] tracking-widest text-white/50 uppercase">já confirmados</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {visible.map((r) => (
            <li
              key={r.id}
              className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[11px] font-medium text-white/80"
            >
              {r.name}
            </li>
          ))}
          {overflow > 0 && (
            <li className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[11px] font-medium text-white/50">
              +{overflow}
            </li>
          )}
        </ul>
      </div>

      {top.map((d, i) => (
        <div
          key={d.label}
          className={`flex items-center gap-3 rounded-2xl border ${RANK_ACCENT[i].border} bg-white/6 px-4 py-3 backdrop-blur-lg ${FLOAT_CLASS[i]}`}
        >
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${RANK_ACCENT[i].chip}`}
          >
            {DESTILADO_EMOJI[d.label] ?? "🍹"}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold text-white">{d.label}</span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wide ${RANK_ACCENT[i].badge}`}
              >
                {RANK_LABEL[i]}
              </span>
            </div>
            <p className="text-xs text-white/40">Preferência do grupo</p>
          </div>
          <span className={`font-display text-lg ${RANK_ACCENT[i].text}`}>{d.count}</span>
        </div>
      ))}
    </div>
  );
}
