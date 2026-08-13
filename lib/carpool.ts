import type { Registration } from "@/lib/types";

const CAR_COUNT = 3;
const SEATS_PER_CAR = 5;
// Não faz sentido dividir carro com quem chega/sai com mais de 4h de diferença.
const MAX_GAP_MINUTES = 240;

function arrivalTime(r: Registration): number {
  return new Date(r.arrival_at).getTime();
}

// Escolhe até 3 pessoas que podem alugar carro como "donas" de cada carro,
// espalhadas ao longo do dia (em vez de pegar as 3 primeiras que chegam juntas).
function pickAnchors(renters: Registration[]): Registration[] {
  const sorted = [...renters].sort((a, b) => arrivalTime(a) - arrivalTime(b));
  if (sorted.length <= CAR_COUNT) return sorted;

  const anchors = [sorted[0]];
  while (anchors.length < CAR_COUNT) {
    let best: Registration | null = null;
    let bestDistance = -1;

    for (const candidate of sorted) {
      if (anchors.includes(candidate)) continue;
      const distance = Math.min(
        ...anchors.map((a) => Math.abs(arrivalTime(candidate) - arrivalTime(a))),
      );
      if (distance > bestDistance) {
        bestDistance = distance;
        best = candidate;
      }
    }

    if (!best) break;
    anchors.push(best);
  }

  return anchors.sort((a, b) => arrivalTime(a) - arrivalTime(b));
}

export type Car = {
  renter: Registration;
  members: Registration[];
};

export type CarpoolPlan = {
  cars: Car[];
  unassigned: Registration[];
};

// Monta até 3 carros (5 lugares cada) em volta de quem marcou que pode alugar
// carro. O mesmo grupo vale pra ida e pra volta — quem aluga é quem devolve.
export function planCarpools(registrations: Registration[]): CarpoolPlan {
  const renters = registrations.filter((r) => r.pode_alugar_carro === true);
  const anchors = pickAnchors(renters);

  const cars: Car[] = anchors.map((renter) => ({ renter, members: [renter] }));
  const assignedIds = new Set(anchors.map((a) => a.id));

  const remaining = registrations
    .filter((r) => !assignedIds.has(r.id))
    .sort((a, b) => arrivalTime(a) - arrivalTime(b));

  const unassigned: Registration[] = [];

  for (const person of remaining) {
    let bestCar: Car | null = null;
    let bestDistance = Infinity;

    for (const car of cars) {
      if (car.members.length >= SEATS_PER_CAR) continue;
      const distance = Math.abs(arrivalTime(person) - arrivalTime(car.renter));
      if (distance <= MAX_GAP_MINUTES * 60_000 && distance < bestDistance) {
        bestDistance = distance;
        bestCar = car;
      }
    }

    if (bestCar) {
      bestCar.members.push(person);
    } else {
      unassigned.push(person);
    }
  }

  return { cars, unassigned };
}
