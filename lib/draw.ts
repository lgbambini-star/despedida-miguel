import { PLAYERS } from "@/lib/data/players";
import { ANIMALS } from "@/lib/data/animals";
import type { FunnyAnimal, FunnyPlayer } from "@/lib/types";

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/** Sorteia um jogador entre os ainda não atribuídos a ninguém. Retorna null se todos já saíram. */
export function drawPlayer(takenPlayerNames: string[]): FunnyPlayer | null {
  const taken = new Set(takenPlayerNames);
  const available = PLAYERS.filter((p) => !taken.has(p.name));
  if (available.length === 0) return null;
  return pickRandom(available);
}

/** Sorteia um animal entre os ainda não atribuídos a ninguém. Retorna null se todos já saíram. */
export function drawAnimal(takenAnimalNames: string[]): FunnyAnimal | null {
  const taken = new Set(takenAnimalNames);
  const available = ANIMALS.filter((a) => !taken.has(a.name));
  if (available.length === 0) return null;
  return pickRandom(available);
}
