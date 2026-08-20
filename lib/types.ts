export type PlayerPosition = "GOL" | "DEF" | "MEI" | "ATA";

export interface FunnyPlayer {
  name: string;
  position: PlayerPosition;
  description: string;
}

export type AnimalCategory = "Mamíferos" | "Aves" | "Répteis e Anfíbios" | "Insetos e Outros";

export interface FunnyAnimal {
  name: string;
  category: AnimalCategory;
  description: string;
  emoji: string;
}

export interface Registration {
  id: string;
  created_at: string;
  name: string;
  arrival_at: string;
  departure_at: string;
  player: string;
  instrument: string;
  animal: string;
  destilado_combo: string | null;
  pode_alugar_carro: boolean | null;
  message: string | null;
}
