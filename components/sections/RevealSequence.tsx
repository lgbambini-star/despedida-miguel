"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CardImage } from "@/components/CardImage";
import type { FunnyAnimal, FunnyPlayer } from "@/lib/types";
import { PLAYERS } from "@/lib/data/players";
import { ANIMALS } from "@/lib/data/animals";

const SPIN_INTERVAL_MS = 110;
const SPIN_ROUNDS = 12;
const RESULT_PAUSE_MS = 1600;

const PLAYER_CARD_SIZE = { width: 536, height: 776 };
const ANIMAL_CARD_SIZE = { width: 552, height: 728 };

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
  const [spinImage, setSpinImage] = useState<string>(player.image);

  useEffect(() => {
    if (stage !== "player-spin" && stage !== "animal-spin") return;

    const pool = stage === "player-spin" ? PLAYERS : ANIMALS;
    let round = 0;
    const interval = setInterval(() => {
      round += 1;
      setSpinImage(pool[Math.floor(Math.random() * pool.length)].image);
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
        <div className="flex flex-col items-center gap-2">
          <p className="text-[11px] tracking-widest text-white/50 uppercase">
            {stage === "player-spin" ? "Sorteando seu jogador..." : "Seu jogador"}
          </p>
          <div className="mx-auto w-full max-w-[240px]">
            {stage === "player-spin" ? (
              <Image
                key={spinImage}
                src={spinImage}
                alt="Sorteando jogador"
                width={PLAYER_CARD_SIZE.width}
                height={PLAYER_CARD_SIZE.height}
                priority
                className="h-auto w-full rounded-2xl opacity-70"
              />
            ) : (
              <CardImage
                key={player.image}
                src={player.image}
                alt={player.name}
                width={PLAYER_CARD_SIZE.width}
                height={PLAYER_CARD_SIZE.height}
                priority
                className="h-auto w-full rounded-2xl animate-pop shadow-[0_8px_32px_rgba(255,107,53,0.35)]"
              />
            )}
          </div>
        </div>
      )}

      {showAnimalCard && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-[11px] tracking-widest text-white/50 uppercase">
            {stage === "animal-spin" ? "Sorteando seu animal..." : "Seu animal"}
          </p>
          <div className="mx-auto w-full max-w-[240px]">
            {stage === "animal-spin" ? (
              <Image
                key={spinImage}
                src={spinImage}
                alt="Sorteando animal"
                width={ANIMAL_CARD_SIZE.width}
                height={ANIMAL_CARD_SIZE.height}
                className="h-auto w-full rounded-2xl opacity-70"
              />
            ) : (
              <CardImage
                key={animal.image}
                src={animal.image}
                alt={animal.name}
                width={ANIMAL_CARD_SIZE.width}
                height={ANIMAL_CARD_SIZE.height}
                className="h-auto w-full rounded-2xl animate-pop shadow-[0_8px_32px_rgba(0,180,216,0.35)]"
              />
            )}
          </div>
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
