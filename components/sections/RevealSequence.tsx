"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { FunnyAnimal, FunnyPlayer } from "@/lib/types";
import { PLAYERS } from "@/lib/data/players";
import { ANIMALS } from "@/lib/data/animals";
import { POSITION_LABEL } from "@/lib/lineup";

const SPIN_INTERVAL_MS = 90;
const SPIN_ROUNDS = 14;
const RESULT_PAUSE_MS = 1800;

type Stage = "intro" | "player-spin" | "player-result" | "animal-spin" | "animal-result" | "done";

export function RevealSequence({
  name,
  player,
  animal,
}: {
  name: string;
  player: FunnyPlayer;
  animal: FunnyAnimal;
}) {
  const [stage, setStage] = useState<Stage>("intro");
  const [spinLabel, setSpinLabel] = useState("");

  useEffect(() => {
    if (stage !== "player-spin" && stage !== "animal-spin") return;

    const pool = stage === "player-spin" ? PLAYERS : ANIMALS;
    let round = 0;
    const interval = setInterval(() => {
      round += 1;
      setSpinLabel(pool[Math.floor(Math.random() * pool.length)].name);
      if (round >= SPIN_ROUNDS) {
        clearInterval(interval);
        setStage(stage === "player-spin" ? "player-result" : "animal-result");
      }
    }, SPIN_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (stage === "intro") {
      const t = setTimeout(() => setStage("player-spin"), 900);
      return () => clearTimeout(t);
    }
    if (stage === "player-result") {
      const t = setTimeout(() => setStage("animal-spin"), RESULT_PAUSE_MS);
      return () => clearTimeout(t);
    }
    if (stage === "animal-result") {
      const t = setTimeout(() => setStage("done"), RESULT_PAUSE_MS);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const showPlayerCard = stage !== "intro";
  const playerRevealed = stage === "player-result" || stage === "animal-spin" || stage === "animal-result" || stage === "done";
  const showAnimalCard = stage === "animal-spin" || stage === "animal-result" || stage === "done";

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div>
        <p className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase">
          Revelação da despedida
        </p>
        <h1 className="mt-2 font-display text-3xl">O Advogado mais admirado do Brasil 📸</h1>
        <p className="mt-2 text-white/70">
          {name}, bora ver no que você virou pra viagem do Miguel.
        </p>
      </div>

      {stage === "intro" && <p className="animate-pulse text-white/60">Sorteando...</p>}

      {showPlayerCard && (
        <div className="flex w-full flex-col items-center gap-1 rounded-xl border border-orange/30 bg-orange/10 p-6 shadow-[0_4px_24px_rgba(255,107,53,0.15)]">
          <span className="text-4xl">⚽</span>
          <p className="text-[11px] tracking-widest text-white/50 uppercase">Seu jogador</p>
          <p className="font-display text-2xl text-orange">
            {stage === "player-spin" ? spinLabel : player.name}
          </p>
          {playerRevealed && (
            <>
              <p className="text-xs tracking-wide text-white/50 uppercase">
                {POSITION_LABEL[player.position]}
              </p>
              <p className="mt-1 text-sm text-white/70">{player.description}</p>
            </>
          )}
        </div>
      )}

      {showAnimalCard && (
        <div className="animate-float flex w-full flex-col items-center gap-1 rounded-xl border border-cyan/30 bg-cyan/10 p-6 shadow-[0_4px_24px_rgba(0,180,216,0.15)]">
          <span className="text-4xl">{stage === "animal-spin" ? "🎲" : animal.emoji}</span>
          <p className="text-[11px] tracking-widest text-white/50 uppercase">Seu animal</p>
          <p className="font-display text-2xl text-cyan">
            {stage === "animal-spin" ? spinLabel : animal.name}
          </p>
          {stage !== "animal-spin" && (
            <>
              <p className="text-xs tracking-wide text-white/50 uppercase">{animal.category}</p>
              <p className="mt-1 text-sm text-white/70">{animal.description}</p>
            </>
          )}
        </div>
      )}

      {stage === "done" && (
        <div className="flex flex-col items-center gap-3">
          <p className="font-semibold text-mint">Cadastro completo! 🎉</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/lista" className="text-mint underline">
              Lista de confirmados
            </Link>
            <Link href="/campo" className="text-mint underline">
              Escalação
            </Link>
            <Link href="/zoologico" className="text-mint underline">
              Zoológico
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
