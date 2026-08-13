import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { BackHomeLink } from "@/components/BackHomeLink";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function CadastroPage() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from("registrations").select("player");
  const takenPlayers = (data ?? []).map((row) => row.player as string);

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-6 py-12">
      <BackHomeLink />
      <div>
        <h1 className="text-2xl font-semibold">Seu cadastro</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Preenche os dados da sua viagem pra despedida do Miguel.
        </p>
      </div>
      <RegistrationForm takenPlayers={takenPlayers} />
    </main>
  );
}
