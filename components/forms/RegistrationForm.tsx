"use client";

import { useActionState } from "react";
import { createRegistration, type RegistrationFormState } from "@/app/cadastro/actions";
import { DESTILADOS } from "@/lib/data/destilados";

const initialState: RegistrationFormState = {};

export function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(createRegistration, initialState);

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

      <p className="text-sm text-white/60">
        🎲 Ao confirmar, abre a tela de revelação com o jogador e o animal que você{" "}
        <strong>ganhou no sorteio</strong>.
      </p>

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

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-white/80">
          Escreva uma mensagem para nosso advogado mais admirado
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-mint/60 focus:ring-1 focus:ring-mint/30 focus:outline-none"
        />
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
