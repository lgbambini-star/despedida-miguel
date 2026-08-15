"use client";

import { useState } from "react";
import Link from "next/link";
import type { Registration } from "@/lib/types";
import { formatTime } from "@/lib/format";

export function MessagesBoard({ registrations }: { registrations: Registration[] }) {
  const messages = registrations.filter(
    (r): r is Registration & { message: string } => !!r.message?.trim(),
  );
  const [index, setIndex] = useState(0);

  function goTo(next: number) {
    setIndex((next + messages.length) % messages.length);
  }

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
        <div className="flex flex-col gap-5">
          <div
            className="mx-auto flex w-full max-w-md items-end gap-2 rounded-2xl border border-white/10 p-5"
            style={{
              background:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 22px), #0a1712",
            }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-mint to-cyan text-sm font-bold text-[#04080f]">
              {messages[index].name.trim().charAt(0).toUpperCase()}
            </span>

            <div className="relative max-w-[85%] rounded-2xl rounded-bl-sm bg-[#075e54] px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
              <span
                aria-hidden
                className="absolute -left-1.5 bottom-0 h-3 w-3"
                style={{
                  background: "#075e54",
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                }}
              />
              <p className="text-xs font-semibold text-mint">{messages[index].name}</p>
              <p className="mt-0.5 text-[15px] leading-relaxed whitespace-pre-wrap text-white/90">
                {messages[index].message}
              </p>
              <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-white/50">
                <span>{formatTime(messages[index].created_at)}</span>
                <span className="text-cyan">✓✓</span>
              </div>
            </div>
          </div>

          {messages.length > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Mensagem anterior"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                ‹
              </button>
              <div className="flex gap-2">
                {messages.map((m, i) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Ir para a mensagem ${i + 1}`}
                    className={
                      i === index
                        ? "h-2 w-6 rounded-full bg-mint transition"
                        : "h-2 w-2 rounded-full bg-white/25 transition hover:bg-white/40"
                    }
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Próxima mensagem"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
