import Link from "next/link";
import { Countdown } from "@/components/Countdown";

const EXPLORE_LINKS = [
  { href: "/lista", label: "Quem já confirmou" },
  { href: "/logistica", label: "Sugestões de carona 🚐" },
  { href: "/campo", label: "Escalação ⚽" },
  { href: "/palco", label: "A banda 🎸" },
  { href: "/zoologico", label: "O zoológico 🦁" },
];

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-b from-sky-400 via-cyan-500 to-teal-600 px-6 py-16 text-center text-white">
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
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
