import { notFound } from "next/navigation";
import { BackHomeLink } from "@/components/BackHomeLink";
import { RevealSequence } from "@/components/sections/RevealSequence";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { PLAYERS } from "@/lib/data/players";
import { ANIMALS } from "@/lib/data/animals";

export const revalidate = 0;

export default async function RevelacaoPage({ params }: PageProps<"/revelacao/[id]">) {
  const { id } = await params;

  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from("registrations").select("*").eq("id", id).single();

  if (!data) notFound();

  const player = PLAYERS.find((p) => p.name === data.player);
  const animal = ANIMALS.find((a) => a.name === data.animal);

  if (!player || !animal) notFound();

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-6 py-12">
      <BackHomeLink />
      <RevealSequence name={data.name} player={player} animal={animal} />
    </main>
  );
}
