import Link from "next/link";
import { dayKey, formatDateTime, formatDayNumber, formatTime, formatWeekday } from "@/lib/format";
import type { Registration } from "@/lib/types";
import { planCarpools } from "@/lib/carpool";

type DayGroup = {
  key: string;
  people: Registration[];
};

function groupByDay(list: Registration[], field: "arrival_at" | "departure_at"): DayGroup[] {
  const groups = new Map<string, Registration[]>();

  for (const person of list) {
    const key = dayKey(person[field]);
    const group = groups.get(key);
    if (group) {
      group.push(person);
    } else {
      groups.set(key, [person]);
    }
  }

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, people]) => ({
      key,
      people: [...people].sort(
        (a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime(),
      ),
    }));
}

function CalendarDay({ group, field }: { group: DayGroup; field: "arrival_at" | "departure_at" }) {
  const sample = group.people[0][field];

  return (
    <div className="min-w-[130px] flex-1 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="bg-white/10 py-2 text-center text-white">
        <p className="font-display text-lg leading-none">{formatDayNumber(sample)}</p>
        <p className="text-[10px] tracking-wide text-white/50 uppercase">
          set · {formatWeekday(sample)}
        </p>
      </div>
      <ul className="flex flex-col gap-1 p-2">
        {group.people.map((p) => (
          <li key={p.id} className="text-xs text-white/80">
            {p.name} <span className="text-white/40">{formatTime(p[field])}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CarpoolSuggestions({ registrations }: { registrations: Registration[] }) {
  const sortedByArrival = [...registrations].sort(
    (a, b) => new Date(a.arrival_at).getTime() - new Date(b.arrival_at).getTime(),
  );
  const renters = registrations.filter((r) => r.pode_alugar_carro === true);
  const { cars, unassigned } = planCarpools(registrations);
  const arrivalDays = groupByDay(registrations, "arrival_at");
  const departureDays = groupByDay(registrations, "departure_at");

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-center font-display text-2xl">Sugestão de caronas 🚐</h2>
        <p className="mt-1 text-sm text-white/60">
          Até 3 carros, 5 pessoas cada, alugados no nome de quem marcou que pode alugar —
          a mesma pessoa pega o carro na chegada e devolve na volta.
        </p>
      </div>

      {sortedByArrival.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-white/50">
          <p>Ninguém se cadastrou ainda.</p>
          <Link href="/cadastro" className="mt-2 inline-block text-mint underline">
            Seja o primeiro
          </Link>
        </div>
      )}

      {sortedByArrival.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wide">
            Calendário de chegadas
          </h3>
          <div className="mt-2 flex flex-wrap gap-3">
            {arrivalDays.map((group) => (
              <CalendarDay key={group.key} group={group} field="arrival_at" />
            ))}
          </div>
        </section>
      )}

      {sortedByArrival.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wide">
            Calendário de voltas
          </h3>
          <div className="mt-2 flex flex-wrap gap-3">
            {departureDays.map((group) => (
              <CalendarDay key={group.key} group={group} field="departure_at" />
            ))}
          </div>
        </section>
      )}

      {sortedByArrival.length > 0 && renters.length === 0 && (
        <p className="text-sm text-white/50">
          Ninguém marcou ainda que pode alugar carro. Assim que alguém marcar &quot;Sim&quot; no
          cadastro, os carros aparecem aqui.
        </p>
      )}

      {cars.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          {cars.map((car, i) => (
            <div
              key={car.renter.id}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <div>
                <p className="font-semibold text-cyan">Carro {i + 1} 🚗</p>
                <p className="text-xs text-white/50">
                  Alugado por <span className="font-medium text-white/80">{car.renter.name}</span>
                </p>
              </div>
              <ul className="flex flex-col gap-2 text-sm">
                {car.members.map((m) => (
                  <li key={m.id} className="rounded-lg bg-white/5 px-3 py-2">
                    <p className="font-medium text-white/85">{m.name}</p>
                    <p className="text-xs text-white/50">
                      Chegada: {formatDateTime(m.arrival_at)} · Volta: {formatDateTime(m.departure_at)}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-white/40">{car.members.length}/5 lugares</p>
            </div>
          ))}
        </div>
      )}

      {unassigned.length > 0 && (
        <div className="rounded-xl border border-dashed border-pink/30 bg-pink/10 p-4">
          <p className="font-semibold text-pink">😅 Se ferrou, vai ter que pegar um táxi ou ônibus</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {unassigned.map((p) => (
              <li key={p.id} className="rounded-full bg-white/10 px-3 py-1 text-sm text-pink-100">
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
