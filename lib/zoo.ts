import type { Registration } from "@/lib/types";
import { ANIMALS } from "@/lib/data/animals";

const ANIMAL_BY_NAME = new Map(ANIMALS.map((a) => [a.name.toLowerCase(), a]));

const EMOJI_FALLBACK_RULES: [RegExp, string][] = [
  [/le[aã]o/, "🦁"],
  [/tigre/, "🐯"],
  [/urso/, "🐻"],
  [/macac/, "🐒"],
  [/gorila/, "🦍"],
  [/elefante/, "🐘"],
  [/girafa/, "🦒"],
  [/zebra/, "🦓"],
  [/cachorro|cão|cachorra/, "🐶"],
  [/gat[oa]/, "🐱"],
  [/coelho/, "🐰"],
  [/raposa/, "🦊"],
  [/lobo/, "🐺"],
  [/panda/, "🐼"],
  [/coala/, "🐨"],
  [/jacar[eé]|crocodilo/, "🐊"],
  [/cobra|serpente/, "🐍"],
  [/tubar[aã]o/, "🦈"],
  [/golfinho/, "🐬"],
  [/baleia/, "🐳"],
  [/peixe/, "🐟"],
  [/tartaruga/, "🐢"],
  [/[aá]guia/, "🦅"],
  [/coruja/, "🦉"],
  [/papagaio|arara/, "🦜"],
  [/ping[uü]im/, "🐧"],
  [/cavalo/, "🐴"],
  [/vaca|boi/, "🐮"],
  [/porco/, "🐷"],
  [/ovelha/, "🐑"],
  [/cabra/, "🐐"],
  [/galinha|galo/, "🐔"],
  [/pato/, "🐥"],
  [/abelha/, "🐝"],
  [/borboleta/, "🦋"],
  [/aranha/, "🕷️"],
  [/formiga/, "🐜"],
  [/rato|camundongo/, "🐭"],
  [/esquilo/, "🐿️"],
  [/morcego/, "🦇"],
  [/hipop[oó]tamo/, "🦛"],
  [/rinoceronte/, "🦏"],
  [/camelo/, "🐫"],
  [/canguru/, "🦘"],
  [/pregui[cç]a/, "🦥"],
  [/on[cç]a|leopardo/, "🐆"],
  [/lontra/, "🦦"],
  [/tex[uo]go/, "🦡"],
  [/pav[aã]o/, "🦚"],
  [/flamingo/, "🦩"],
  [/unic[oó]rnio/, "🦄"],
  [/drag[aã]o/, "🐉"],
  [/capivara/, "🐹"],
];

export function animalEmoji(animal: string): string {
  const normalized = animal.toLowerCase();
  const known = ANIMAL_BY_NAME.get(normalized);
  if (known) return known.emoji;
  for (const [pattern, emoji] of EMOJI_FALLBACK_RULES) {
    if (pattern.test(normalized)) return emoji;
  }
  return "🐾";
}

export type ZooEnclosure = {
  animal: string;
  emoji: string;
  category: string | null;
  people: Registration[];
};

export function groupByAnimal(registrations: Registration[]): ZooEnclosure[] {
  const sorted = [...registrations].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  const groups = new Map<string, ZooEnclosure>();

  for (const registration of sorted) {
    const trimmed = registration.animal.trim();
    const key = trimmed.toLowerCase();
    const known = ANIMAL_BY_NAME.get(key);
    const display = known ? known.name : trimmed.charAt(0).toUpperCase() + trimmed.slice(1);

    const existing = groups.get(key);
    if (existing) {
      existing.people.push(registration);
    } else {
      groups.set(key, {
        animal: display,
        emoji: animalEmoji(trimmed),
        category: known?.category ?? null,
        people: [registration],
      });
    }
  }

  return [...groups.values()].sort((a, b) => b.people.length - a.people.length);
}
