import type { Registration } from "@/lib/types";
import { DESTILADOS } from "@/lib/data/destilados";

// Cores na mesma ordem categórica fixa usada no resto do app (cada destilado
// sempre com a mesma cor, independente de quantas pessoas escolheram).
export const DESTILADO_COLORS: Record<string, string> = {
  Vodka: "#00b4d8",
  Whisky: "#ff6b35",
  Gin: "#00ffb0",
  Rum: "#ffc857",
  Tequila: "#ff006e",
  Cachaça: "#7c5cff",
  "Não vou beber": "#4a90a4",
};

export const DESTILADO_EMOJI: Record<string, string> = {
  Vodka: "🍸",
  Whisky: "🥃",
  Gin: "🍹",
  Rum: "🥃",
  Tequila: "🍹",
  Cachaça: "🥃",
  "Não vou beber": "🚫",
};

export const UNANSWERED_LABEL = "Ainda não respondeu";
export const UNANSWERED_COLOR = "rgba(255,255,255,0.25)";

export type DestiladoCount = { label: string; count: number; color: string };

export function countDestiladoVotes(registrations: Registration[]): DestiladoCount[] {
  const counts = new Map<string, number>();
  for (const r of registrations) {
    const key = r.destilado_combo ?? UNANSWERED_LABEL;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...DESTILADOS, UNANSWERED_LABEL]
    .map((label) => ({
      label,
      count: counts.get(label) ?? 0,
      color: DESTILADO_COLORS[label] ?? UNANSWERED_COLOR,
    }))
    .filter((c) => c.count > 0);
}

export function topDestilados(registrations: Registration[], limit: number): DestiladoCount[] {
  return countDestiladoVotes(registrations)
    .filter((c) => c.label !== UNANSWERED_LABEL)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
