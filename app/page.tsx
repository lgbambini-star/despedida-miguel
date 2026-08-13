import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { RegistrationsList } from "@/components/sections/RegistrationsList";
import { CarpoolSuggestions } from "@/components/sections/CarpoolSuggestions";
import { SoccerField } from "@/components/sections/SoccerField";
import { BandStage } from "@/components/sections/BandStage";
import { Zoo } from "@/components/sections/Zoo";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Registration } from "@/lib/types";

const EXPLORE_LINKS = [
  { href: "#confirmados", label: "Quem já confirmou" },
  { href: "#caronas", label: "Sugestões de carona 🚐" },
  { href: "#campo", label: "Escalação ⚽" },
  { href: "#palco", label: "A banda 🎸" },
  { href: "#zoologico", label: "O zoológico 🦁" },
];

export default async function Home() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("registrations").select("*");
  const registrations = (data ?? []) as Registration[];

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative flex min-h-[100dvh] flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-b from-sky-400 via-cyan-500 to-teal-600 px-6 py-16 text-center text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-yellow-300/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 -left-20 h-56 w-56 rounded-full bg-white/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-white/10"
          style={{
            clipPath:
              "polygon(0% 40%, 10% 30%, 25% 45%, 40% 25%, 55% 40%, 70% 20%, 85% 40%, 100% 25%, 100% 100%, 0% 100%)",
          }}
        />

        <div className="relative flex flex-col items-center gap-3">
          <span className="text-xs font-semibold tracking-[0.3em] text-white/80 uppercase">
            04 a 08 de setembro de 2026 · Praia do Rosa
          </span>
          <h1 className="text-4xl font-extrabold drop-shadow-sm sm:text-5xl">
            Despedida do Miguel 🏖️
          </h1>
          <p className="max-w-md text-white/90">
            14 amigos, voos de todo canto, uma praia só. Confirma sua chegada e entra na
            escalação, na banda e no zoológico da viagem.
          </p>
        </div>

        <div className="relative flex flex-col items-center gap-2">
          <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">Faltam</p>
          <Countdown />
        </div>

        <Link
          href="/cadastro"
          className="relative rounded-full bg-white px-8 py-4 text-lg font-bold text-cyan-700 shadow-lg transition hover:scale-105"
        >
          Preencher meu cadastro
        </Link>

        <div className="relative flex flex-wrap justify-center gap-2 pt-2">
          {EXPLORE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {error && (
        <p className="mx-auto w-full max-w-2xl px-6 py-12 text-center text-sm text-red-600">
          Não consegui carregar as respostas do grupo agora. Tenta recarregar.
        </p>
      )}

      {!error && (
        <>
          <section id="confirmados" className="mx-auto w-full max-w-2xl scroll-mt-6 px-6 py-14">
            <RegistrationsList registrations={registrations} />
          </section>

          <section
            id="caronas"
            className="mx-auto w-full max-w-2xl scroll-mt-6 border-t border-zinc-100 px-6 py-14"
          >
            <CarpoolSuggestions registrations={registrations} />
          </section>

          <section
            id="campo"
            className="mx-auto w-full max-w-2xl scroll-mt-6 border-t border-zinc-100 px-6 py-14"
          >
            <SoccerField registrations={registrations} />
          </section>

          <section
            id="palco"
            className="mx-auto w-full max-w-2xl scroll-mt-6 border-t border-zinc-100 px-6 py-14"
          >
            <BandStage registrations={registrations} />
          </section>

          <section
            id="zoologico"
            className="mx-auto w-full max-w-2xl scroll-mt-6 border-t border-zinc-100 px-6 py-14"
          >
            <Zoo registrations={registrations} />
          </section>
        </>
      )}
    </div>
  );
}
