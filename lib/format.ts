const TIMEZONE = "America/Sao_Paulo";

const formatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIMEZONE,
});

export function formatDateTime(isoString: string): string {
  return formatter.format(new Date(isoString));
}

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIMEZONE,
});

export function formatTime(isoString: string): string {
  return timeFormatter.format(new Date(isoString));
}

const dayKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: TIMEZONE,
});

// Chave ordenável (AAAA-MM-DD) pra agrupar registros pelo dia local, sem depender do fuso do navegador.
export function dayKey(isoString: string): string {
  return dayKeyFormatter.format(new Date(isoString));
}

const dayNumberFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  timeZone: TIMEZONE,
});

export function formatDayNumber(isoString: string): string {
  return dayNumberFormatter.format(new Date(isoString));
}

const weekdayFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short",
  timeZone: TIMEZONE,
});

export function formatWeekday(isoString: string): string {
  return weekdayFormatter.format(new Date(isoString)).replace(".", "");
}
