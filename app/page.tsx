import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-semibold">Despedida do Miguel 🏖️</h1>
      <p className="max-w-md text-zinc-600">
        Página inicial provisória — a capa de verdade (contagem regressiva, identidade visual)
        vem na última fase. Por enquanto, dá pra testar o cadastro:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/cadastro"
          className="rounded-full bg-black px-6 py-3 font-medium text-white"
        >
          Preencher meu cadastro
        </Link>
        <Link
          href="/lista"
          className="rounded-full border border-zinc-300 px-6 py-3 font-medium"
        >
          Ver quem já confirmou
        </Link>
        <Link
          href="/logistica"
          className="rounded-full border border-zinc-300 px-6 py-3 font-medium"
        >
          Linha do tempo / logística
        </Link>
      </div>
    </div>
  );
}
