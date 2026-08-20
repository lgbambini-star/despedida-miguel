"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { drawAnimal, drawPlayer } from "@/lib/draw";

export type RegistrationFormState = {
  error?: string;
};

async function fetchTakenPlayers(): Promise<string[]> {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from("registrations").select("player");
  return (data ?? []).map((row) => row.player as string);
}

const MAX_DRAW_ATTEMPTS = 5;

export async function createRegistration(
  _prevState: RegistrationFormState,
  formData: FormData,
): Promise<RegistrationFormState> {
  const name = String(formData.get("name") || "").trim();
  const arrivalAt = String(formData.get("arrivalAt") || "");
  const departureAt = String(formData.get("departureAt") || "");
  const destiladoCombo = String(formData.get("destiladoCombo") || "").trim();
  const podeAlugarCarroRaw = String(formData.get("podeAlugarCarro") || "");
  const message = String(formData.get("message") || "").trim();

  if (
    !name ||
    !arrivalAt ||
    !departureAt ||
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
  let revelacaoId: string | null = null;

  for (let attempt = 0; attempt < MAX_DRAW_ATTEMPTS; attempt++) {
    const takenPlayers = await fetchTakenPlayers();
    const drawnPlayer = drawPlayer(takenPlayers);

    if (!drawnPlayer) {
      return { error: "Todos os jogadores já foram sorteados! Fala com quem tá organizando." };
    }

    const drawnAnimal = drawAnimal();

    const { data, error } = await supabase
      .from("registrations")
      .insert({
        name,
        arrival_at: arrival.toISOString(),
        departure_at: departure.toISOString(),
        player: drawnPlayer.name,
        animal: drawnAnimal.name,
        destilado_combo: destiladoCombo,
        pode_alugar_carro: podeAlugarCarro,
        message: message || null,
      })
      .select("id")
      .single();

    if (!error) {
      revelacaoId = data.id as string;
      break;
    }

    if (error.code === "23505") {
      // Outra pessoa sorteou o mesmo jogador ao mesmo tempo — tenta de novo.
      continue;
    }

    return { error: "Não deu pra salvar, tenta de novo em instantes." };
  }

  if (!revelacaoId) {
    return { error: "Deu ruim no sorteio, tenta enviar de novo." };
  }

  revalidatePath("/");
  revalidatePath("/cadastro");
  revalidatePath("/lista");
  revalidatePath("/logistica");
  revalidatePath("/campo");
  revalidatePath("/zoologico");
  redirect(`/revelacao/${revelacaoId}`);
}
