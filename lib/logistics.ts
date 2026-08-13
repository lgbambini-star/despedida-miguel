import type { Registration } from "@/lib/types";

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
});

export type CarpoolGroup = {
  time: string;
  people: Registration[];
};

const CARPOOL_WINDOW_MINUTES = 90;

function groupByProximity(
  items: { registration: Registration; at: Date }[],
): CarpoolGroup[] {
  const sorted = [...items].sort((a, b) => a.at.getTime() - b.at.getTime());
  const groups: { anchor: Date; entries: typeof sorted }[] = [];

  for (const item of sorted) {
    const lastGroup = groups[groups.length - 1];
    const withinWindow =
      lastGroup &&
      item.at.getTime() - lastGroup.anchor.getTime() <= CARPOOL_WINDOW_MINUTES * 60_000;

    if (withinWindow) {
      lastGroup.entries.push(item);
    } else {
      groups.push({ anchor: item.at, entries: [item] });
    }
  }

  return groups
    .filter((g) => g.entries.length > 1)
    .map((g) => ({
      time: timeFormatter.format(g.entries[0].at),
      people: g.entries.map((e) => e.registration),
    }));
}

export function suggestArrivalCarpools(registrations: Registration[]): CarpoolGroup[] {
  return groupByProximity(
    registrations.map((r) => ({ registration: r, at: new Date(r.arrival_at) })),
  );
}

export function suggestDepartureCarpools(registrations: Registration[]): CarpoolGroup[] {
  return groupByProximity(
    registrations.map((r) => ({ registration: r, at: new Date(r.departure_at) })),
  );
}
