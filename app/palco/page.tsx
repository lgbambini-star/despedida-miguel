import { BackHomeLink } from "@/components/BackHomeLink";
import { BandStage } from "@/components/sections/BandStage";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Registration } from "@/lib/types";

export default async function PalcoPage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("registrations").select("*");

  const registrations = (data ?? []) as Registration[];

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-12">
      <BackHomeLink />
      {error ? (
        <p className="text-sm text-pink-300">Não consegui carregar o palco agora. Tenta recarregar.</p>
      ) : (
        <BandStage registrations={registrations} />
      )}
    </main>
  );
}
