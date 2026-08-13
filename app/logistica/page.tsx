import { BackHomeLink } from "@/components/BackHomeLink";
import { CarpoolSuggestions } from "@/components/sections/CarpoolSuggestions";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Registration } from "@/lib/types";

export default async function LogisticaPage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("registrations").select("*");

  const registrations = (data ?? []) as Registration[];

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-6 py-12">
      <BackHomeLink />
      {error ? (
        <p className="text-sm text-red-600">Não consegui carregar os dados agora. Tenta recarregar.</p>
      ) : (
        <CarpoolSuggestions registrations={registrations} />
      )}
    </main>
  );
}
