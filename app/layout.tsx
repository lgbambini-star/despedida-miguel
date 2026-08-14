import type { Metadata } from "next";
import { Abril_Fatface, Outfit } from "next/font/google";
import "./globals.css";

const abrilFatface = Abril_Fatface({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Despedida do Miguel",
  description: "Organização da viagem de despedida de solteiro do Miguel — Praia do Rosa, setembro de 2026.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${abrilFatface.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
