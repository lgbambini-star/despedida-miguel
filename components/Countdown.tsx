"use client";

import { useEffect, useState } from "react";

const TRIP_START = new Date("2026-09-04T00:00:00-03:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = TRIP_START.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return <p className="text-lg font-bold text-white">É hoje! 🎉</p>;
  }

  const units: { label: string; value: number }[] = [
    { label: "dias", value: timeLeft.days },
    { label: "horas", value: timeLeft.hours },
    { label: "min", value: timeLeft.minutes },
    { label: "seg", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2 sm:gap-3">
      {units.map((u, i) => (
        <div
          key={u.label}
          className="flex min-w-[64px] flex-col items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm"
        >
          <span
            className={`font-display text-2xl tabular-nums ${i === units.length - 1 ? "text-orange" : "text-white"}`}
          >
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-wide text-white/50 uppercase">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
