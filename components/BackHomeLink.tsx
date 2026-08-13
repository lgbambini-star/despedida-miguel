import Link from "next/link";

export function BackHomeLink() {
  return (
    <Link
      href="/"
      className="inline-flex w-fit items-center gap-1 text-sm text-zinc-500 transition hover:text-zinc-800"
    >
      ← Voltar para a página inicial
    </Link>
  );
}
