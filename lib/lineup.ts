import type { PlayerPosition, Registration } from "@/lib/types";
import { PLAYERS } from "@/lib/data/players";

const POSITION_BY_PLAYER = new Map<string, PlayerPosition>(
  PLAYERS.map((p) => [p.name, p.position]),
);

// Formação 4-4-2: 1 goleiro, 4 zagueiros/laterais, 4 meias, 2 atacantes = 11 titulares.
const STARTING_SLOTS: Record<PlayerPosition, number> = {
  GOL: 1,
  DEF: 4,
  MEI: 4,
  ATA: 2,
};

export const POSITION_ORDER: PlayerPosition[] = ["ATA", "MEI", "DEF", "GOL"];

export type LineupSlot = Registration | null;

export type Lineup = {
  starters: Record<PlayerPosition, LineupSlot[]>;
  bench: Registration[];
};

export function computeLineup(registrations: Registration[]): Lineup {
  const sorted = [...registrations].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  const byPosition: Record<PlayerPosition, Registration[]> = {
    GOL: [],
    DEF: [],
    MEI: [],
    ATA: [],
  };

  for (const registration of sorted) {
    const position = POSITION_BY_PLAYER.get(registration.player);
    if (position) byPosition[position].push(registration);
  }

  const starters = {} as Record<PlayerPosition, LineupSlot[]>;
  const bench: Registration[] = [];

  for (const position of POSITION_ORDER) {
    const people = byPosition[position];
    const slotCount = STARTING_SLOTS[position];
    const slots: LineupSlot[] = Array.from(
      { length: slotCount },
      (_, i) => people[i] ?? null,
    );
    starters[position] = slots;
    bench.push(...people.slice(slotCount));
  }

  bench.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  return { starters, bench };
}

export const POSITION_LABEL: Record<PlayerPosition, string> = {
  GOL: "Goleiro",
  DEF: "Zagueiro/Lateral",
  MEI: "Meio-campo",
  ATA: "Atacante",
};
