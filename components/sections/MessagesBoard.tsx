import Link from "next/link";
import type { Registration } from "@/lib/types";

export function MessagesBoard({ registrations }: { registrations: Registration[] }) {
  const messages = registrations.filter(
    (r): r is Registration & { message: string } => !!r.message?.trim(),
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center font-display text-2xl">Mensagens para o Miguel 💌</h2>

      {messages.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-white/50">
          <p>Ninguém deixou uma mensagem ainda.</p>
          <Link href="/cadastro" className="mt-2 inline-block text-mint underline">
            Seja o primeiro
          </Link>
        </div>
      )}

      {messages.length > 0 && (
        <ul className="flex flex-col gap-3">
          {messages.map((r) => (
            <li
              key={r.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <p className="text-white/85">{r.message}</p>
              <p className="mt-2 text-xs font-semibold tracking-wide text-white/40 uppercase">
                — {r.name}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
