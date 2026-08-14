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
      <div className="rounded-xl border border-mint/30 bg-mint/10 p-6">
        <p className="font-semibold text-mint">Cadastro feito! 🎉</p>
        <p className="mt-1 text-sm text-white/80">
          Já dá pra ver seu nome na{" "}
          <a href="/lista" className="text-mint underline">
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
        <label htmlFor="name" className="text-sm font-medium text-white/80">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-mint/60 focus:ring-1 focus:ring-mint/30 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="arrivalAt" className="text-sm font-medium text-white/80">
          Voo de chegada (data e horário)
        </label>
        <input
          id="arrivalAt"
          name="arrivalAt"
          type="datetime-local"
          required
          className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-mint/60 focus:ring-1 focus:ring-mint/30 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="departureAt" className="text-sm font-medium text-white/80">
          Voo de volta (data e horário)
        </label>
        <input
          id="departureAt"
          name="departureAt"
          type="datetime-local"
          required
          className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-mint/60 focus:ring-1 focus:ring-mint/30 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="player" className="text-sm font-medium text-white/80">
          Jogador da Seleção Brasileira na Copa de 2002 que você seria
        </label>
        <select
          id="player"
          name="player"
          required
          defaultValue=""
          className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-mint/60 focus:ring-1 focus:ring-mint/30 focus:outline-none"
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
        <label htmlFor="instrument" className="text-sm font-medium text-white/80">
          Instrumento que tocaria numa banda
        </label>
        <input
          id="instrument"
          name="instrument"
          type="text"
          required
          className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-mint/60 focus:ring-1 focus:ring-mint/30 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="animal" className="text-sm font-medium text-white/80">
          Animal que você seria
        </label>
        <input
          id="animal"
          name="animal"
          type="text"
          required
          className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-mint/60 focus:ring-1 focus:ring-mint/30 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="destiladoCombo" className="text-sm font-medium text-white/80">
          Qual o destilado para o combo?
        </label>
        <select
          id="destiladoCombo"
          name="destiladoCombo"
          required
          defaultValue=""
          className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-mint/60 focus:ring-1 focus:ring-mint/30 focus:outline-none"
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
        <label htmlFor="podeAlugarCarro" className="text-sm font-medium text-white/80">
          Tem possibilidade de alugar carro?
        </label>
        <select
          id="podeAlugarCarro"
          name="podeAlugarCarro"
          required
          defaultValue=""
          className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-mint/60 focus:ring-1 focus:ring-mint/30 focus:outline-none"
        >
          <option value="" disabled>
            Escolha uma opção
          </option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
      </div>

      {state.error && <p className="text-sm text-pink-300">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-full bg-gradient-to-r from-orange to-pink px-5 py-3 font-medium text-white shadow-[0_8px_32px_rgba(255,0,110,0.35)] transition hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {isPending ? "Enviando..." : "Enviar cadastro"}
      </button>
    </form>
  );
}
