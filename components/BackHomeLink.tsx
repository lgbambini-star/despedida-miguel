import Link from "next/link";

export function BackHomeLink() {
  return (
    <Link
      href="/"
      className="inline-flex w-fit items-center gap-1 text-sm text-white/60 transition hover:text-mint"
    >
      ← Voltar para a página inicial
    </Link>
  );
}
