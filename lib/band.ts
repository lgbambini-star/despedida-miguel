const EMOJI_RULES: [RegExp, string][] = [
  [/guitarra|violão|violao/, "🎸"],
  [/baixo/, "🎸"],
  [/bateria|tambor/, "🥁"],
  [/teclado|piano/, "🎹"],
  [/vocal|voz|cantor|canto/, "🎤"],
  [/sax/, "🎷"],
  [/trompete|trombone|metais/, "🎺"],
  [/violino|viola\b/, "🎻"],
  [/flauta/, "🪈"],
  [/dj|eletrônic|eletronic/, "🎧"],
  [/pandeiro|percuss|congas|atabaque/, "🪘"],
];

export function instrumentEmoji(instrument: string): string {
  const normalized = instrument.toLowerCase();
  for (const [pattern, emoji] of EMOJI_RULES) {
    if (pattern.test(normalized)) return emoji;
  }
  return "🎶";
}
