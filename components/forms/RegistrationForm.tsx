"use client";

import { useActionState, useMemo } from "react";
import { createRegistration, type RegistrationFormState } from "@/app/cadastro/actions";
import { PLAYERS_2002 } from "@/lib/data/players-2002";
import { DESTILADOS } from "@/lib/data/destilados";

const initialState: RegistrationFormState = {};

const POSITION_LABEL: Record<string, string> = {
  GOL: "Goleiro",
  DEF: "Defensor",
  MEI: "Meio-campo",
  ATA: "Atacante",
};

export function RegistrationForm({ takenPlayers }: { takenPlayers: string[] }) {
  const [state, formAction, isPending] = useActionState(createRegistration, initialState);

  const taken = useMemo(
    () => new Set(state.takenPlayers ?? takenPlayers),
    [state.takenPlayers, takenPlayers],
  );

  if (state.success) {
    return (
      <div className="rounded-lg border border-green-300 bg-green-50 p-6 text-green-900">
        <p className="font-semibold">Cadastro feito! 🎉</p>
        <p className="mt-1 text-sm">
          Já dá pra ver seu nome na{" "}
          <a href="/lista" className="underline">
            lista de quem confirmou
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="arrivalAt" className="text-sm font-medium">
          Voo de chegada (data e horário)
        </label>
        <input
          id="arrivalAt"
          name="arrivalAt"
          type="datetime-local"
          required
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="departureAt" className="text-sm font-medium">
          Voo de volta (data e horário)
        </label>
        <input
          id="departureAt"
          name="departureAt"
          type="datetime-local"
          required
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="player" className="text-sm font-medium">
          Jogador da Seleção Brasileira na Copa de 2002 que você seria
        </label>
        <select
          id="player"
          name="player"
          required
          defaultValue=""
          className="rounded-md border border-zinc-300 px-3 py-2"
        >
          <option value="" disabled>
            Escolha um jogador
          </option>
          {PLAYERS_2002.map((p) => (
            <option key={p.name} value={p.name} disabled={taken.has(p.name)}>
              {p.name} ({POSITION_LABEL[p.position]})
              {taken.has(p.name) ? " — já escolhido" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="instrument" className="text-sm font-medium">
          Instrumento que tocaria numa banda
        </label>
        <input
          id="instrument"
          name="instrument"
          type="text"
          required
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="animal" className="text-sm font-medium">
          Animal que você seria
        </label>
        <input
          id="animal"
          name="animal"
          type="text"
          required
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="destiladoCombo" className="text-sm font-medium">
          Qual o destilado para o combo?
        </label>
        <select
          id="destiladoCombo"
          name="destiladoCombo"
          required
          defaultValue=""
          className="rounded-md border border-zinc-300 px-3 py-2"
        >
          <option value="" disabled>
            Escolha um destilado
          </option>
          {DESTILADOS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="podeAlugarCarro" className="text-sm font-medium">
          Tem possibilidade de alugar carro?
        </label>
        <select
          id="podeAlugarCarro"
          name="podeAlugarCarro"
          required
          defaultValue=""
          className="rounded-md border border-zinc-300 px-3 py-2"
        >
          <option value="" disabled>
            Escolha uma opção
          </option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-full bg-black px-5 py-3 font-medium text-white disabled:opacity-50"
      >
        {isPending ? "Enviando..." : "Enviar cadastro"}
      </button>
    </form>
  );
}
