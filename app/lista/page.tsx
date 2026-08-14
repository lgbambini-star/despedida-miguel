import { BackHomeLink } from "@/components/BackHomeLink";
import { RegistrationsList } from "@/components/sections/RegistrationsList";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Registration } from "@/lib/types";

export default async function ListaPage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("registrations").select("*");

  const registrations = (data ?? []) as Registration[];

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-12">
      <BackHomeLink />
      {error ? (
        <p className="text-sm text-pink-300">Não consegui carregar a lista agora. Tenta recarregar.</p>
      ) : (
        <RegistrationsList registrations={registrations} />
      )}
    </main>
  );
}
