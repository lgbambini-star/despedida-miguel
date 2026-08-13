import type { Registration } from "@/lib/types";

const TIMEZONE = "America/Sao_Paulo";

const dateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: TIMEZONE,
  hour: "2-digit",
  minute: "2-digit",
});

const weekdayFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: TIMEZONE,
  weekday: "short",
});

export const TRIP_DAYS = [
  "2026-09-04",
  "2026-09-05",
  "2026-09-06",
  "2026-09-07",
  "2026-09-08",
];

export function dateKey(isoString: string): string {
  return dateKeyFormatter.format(new Date(isoString));
}

export function formatDayLabel(day: string): string {
  const [year, month, dayOfMonth] = day.split("-").map(Number);
  // meio-dia UTC evita virada de dia por causa do fuso ao formatar o weekday
  const date = new Date(Date.UTC(year, month - 1, dayOfMonth, 12));
  const weekday = weekdayFormatter.format(date).replace(".", "");
  return `${String(dayOfMonth).padStart(2, "0")}/${String(month).padStart(2, "0")} (${weekday})`;
}

export type DayPresence = {
  day: string;
  people: Registration[];
};

export function computePresenceByDay(registrations: Registration[]): DayPresence[] {
  return TRIP_DAYS.map((day) => ({
    day,
    people: registrations.filter((r) => {
      const arrivalDay = dateKey(r.arrival_at);
      const departureDay = dateKey(r.departure_at);
      return arrivalDay <= day && departureDay >= day;
    }),
  }));
}

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
