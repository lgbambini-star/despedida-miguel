export type PlayerPosition = "GOL" | "DEF" | "MEI" | "ATA";

export interface Player2002 {
  name: string;
  position: PlayerPosition;
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
}
