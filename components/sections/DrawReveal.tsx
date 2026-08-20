import Link from "next/link";
import type { FunnyAnimal, FunnyPlayer } from "@/lib/types";
import { POSITION_LABEL } from "@/lib/lineup";

export function DrawReveal({ player, animal }: { player: FunnyPlayer; animal: FunnyAnimal }) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-mint/30 bg-mint/10 p-6">
      <div>
        <p className="font-semibold text-mint">Cadastro feito! 🎉</p>
        <p className="mt-1 text-sm text-white/80">O sorteio rolou, e o resultado foi...</p>
      </div>

      <div className="animate-float flex flex-col gap-1 rounded-xl border border-orange/30 bg-orange/10 p-4 text-center shadow-[0_4px_24px_rgba(255,107,53,0.15)]">
        <span className="text-3xl">⚽</span>
        <p className="text-[11px] tracking-widest text-white/50 uppercase">
          {POSITION_LABEL[player.position]}
        </p>
        <p className="font-display text-xl text-orange">{player.name}</p>
        <p className="mt-1 text-sm text-white/70">{player.description}</p>
      </div>

      <div className="animate-float2 flex flex-col gap-1 rounded-xl border border-cyan/30 bg-cyan/10 p-4 text-center shadow-[0_4px_24px_rgba(0,180,216,0.15)]">
        <span className="text-3xl">{animal.emoji}</span>
        <p className="text-[11px] tracking-widest text-white/50 uppercase">{animal.category}</p>
        <p className="font-display text-xl text-cyan">{animal.name}</p>
        <p className="mt-1 text-sm text-white/70">{animal.description}</p>
      </div>

      <p className="text-sm text-white/80">
        Já dá pra ver seu nome na{" "}
        <Link href="/lista" className="text-mint underline">
          lista de quem confirmou
        </Link>
        , sua posição na{" "}
        <Link href="/campo" className="text-mint underline">
          escalação
        </Link>{" "}
        e seu bicho no{" "}
        <Link href="/zoologico" className="text-mint underline">
          zoológico
        </Link>
        .
      </p>
    </div>
  );
}
