import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { ThemeCarousel } from "@/components/ThemeCarousel";
import { HeroSpotlight } from "@/components/HeroSpotlight";
import { DestiladoChart } from "@/components/sections/DestiladoChart";
import { CarpoolSuggestions } from "@/components/sections/CarpoolSuggestions";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Registration } from "@/lib/types";

export const revalidate = 0;

const EXPLORE_LINKS = [
  { href: "#destilados", label: "Preferência de destilado 🍹" },
  { href: "#caronas", label: "Sugestões de carona 🚐" },
  { href: "#temas", label: "Escalação, banda e zoológico 🎉" },
];

export default async function Home() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("registrations").select("*");
  const registrations = (data ?? []) as Registration[];

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative flex min-h-[100dvh] flex-col items-center justify-center gap-8 overflow-hidden bg-bg px-6 py-20 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-mint/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 -left-20 h-64 w-64 rounded-full bg-pink/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-0 h-56 w-56 rounded-full bg-cyan/15 blur-3xl"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-white/80 uppercase backdrop-blur-sm">
              🔥 O enterro do Migs
            </span>
            <h1 className="font-display text-4xl leading-tight sm:text-6xl">
              A última{" "}
              <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">
                dança
              </span>{" "}
              do Miguelito
            </h1>
            <p className="max-w-md text-white/70">
              14 amigos, voos de todo canto, uma praia só. Confirma sua chegada e entra na
              escalação, na banda e no zoológico da viagem.
            </p>

            <div className="mt-2 flex flex-col items-center gap-2 lg:items-start">
              <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                Feriado 7 de setembro · Praia do Rosa - SC
              </p>
              <p className="text-xs font-semibold tracking-wide text-white/50 uppercase">Faltam</p>
              <Countdown />
              <p className="text-xs font-semibold tracking-wide text-white/50 uppercase">
                para a seleção de animais do Miguelzio
              </p>
            </div>

            <Link
              href="/cadastro"
              className="mt-2 rounded-full bg-gradient-to-r from-orange to-pink px-8 py-4 text-lg font-bold text-white shadow-[0_8px_32px_rgba(255,0,110,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(255,0,110,0.5)]"
            >
              Preencher meu cadastro
            </Link>

            <div className="flex flex-wrap justify-center gap-2 pt-2 lg:justify-start">
              {EXPLORE_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:border-mint/40 hover:text-mint"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <HeroSpotlight registrations={registrations} />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-20 w-full overflow-hidden"
        >
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-[200%] animate-wave">
            <path
              d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,0 1440,40 L1440,80 L0,80 Z"
              fill="var(--color-bg)"
            />
          </svg>
        </div>
      </div>

      {error && (
        <p className="mx-auto w-full max-w-2xl px-6 py-12 text-center text-sm text-pink-300">
          Não consegui carregar as respostas do grupo agora. Tenta recarregar.
        </p>
      )}

      {!error && (
        <>
          <section className="mx-auto w-full max-w-2xl px-6 py-14">
            <h2 className="mb-4 text-center font-display text-2xl">O falecido 📸</h2>
            <PhotoCarousel />
          </section>

          <section
            id="destilados"
            className="mx-auto w-full max-w-2xl scroll-mt-6 border-t border-white/10 px-6 py-14"
          >
            <DestiladoChart registrations={registrations} />
          </section>

          <section
            id="caronas"
            className="mx-auto w-full max-w-2xl scroll-mt-6 border-t border-white/10 px-6 py-14"
          >
            <CarpoolSuggestions registrations={registrations} />
          </section>

          <section
            id="temas"
            className="mx-auto w-full max-w-2xl scroll-mt-6 border-t border-white/10 px-6 py-14"
          >
            <ThemeCarousel registrations={registrations} />
          </section>
        </>
      )}
    </div>
  );
}
