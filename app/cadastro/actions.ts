"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type RegistrationFormState = {
  error?: string;
  success?: boolean;
  takenPlayers?: string[];
};

async function fetchTakenPlayers(): Promise<string[]> {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from("registrations").select("player");
  return (data ?? []).map((row) => row.player as string);
}

export async function createRegistration(
  _prevState: RegistrationFormState,
  formData: FormData,
): Promise<RegistrationFormState> {
  const name = String(formData.get("name") || "").trim();
  const arrivalAt = String(formData.get("arrivalAt") || "");
  const departureAt = String(formData.get("departureAt") || "");
  const player = String(formData.get("player") || "");
  const instrument = String(formData.get("instrument") || "").trim();
  const animal = String(formData.get("animal") || "").trim();
  const destiladoCombo = String(formData.get("destiladoCombo") || "").trim();
  const podeAlugarCarroRaw = String(formData.get("podeAlugarCarro") || "");

  if (
    !name ||
    !arrivalAt ||
    !departureAt ||
    !player ||
    !instrument ||
    !animal ||
    !destiladoCombo ||
    (podeAlugarCarroRaw !== "sim" && podeAlugarCarroRaw !== "nao")
  ) {
    return { error: "Preenche todos os campos antes de enviar." };
  }

  const podeAlugarCarro = podeAlugarCarroRaw === "sim";

  const arrival = new Date(arrivalAt);
  const departure = new Date(departureAt);

  if (Number.isNaN(arrival.getTime()) || Number.isNaN(departure.getTime())) {
    return { error: "Data ou horário inválido." };
  }

  if (departure <= arrival) {
    return { error: "A volta precisa ser depois da chegada." };
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from("registrations").insert({
    name,
    arrival_at: arrival.toISOString(),
    departure_at: departure.toISOString(),
    player,
    instrument,
    animal,
    destilado_combo: destiladoCombo,
    pode_alugar_carro: podeAlugarCarro,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        error: `${player} já foi escolhido por outra pessoa. Escolhe outro jogador.`,
        takenPlayers: await fetchTakenPlayers(),
      };
    }
    return { error: "Não deu pra salvar, tenta de novo em instantes." };
  }

  revalidatePath("/cadastro");
  revalidatePath("/lista");
  revalidatePath("/logistica");
  revalidatePath("/campo");
  revalidatePath("/palco");
  revalidatePath("/zoologico");
  return { success: true };
}
