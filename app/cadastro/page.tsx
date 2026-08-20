import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { BackHomeLink } from "@/components/BackHomeLink";

export default function CadastroPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-6 py-12">
      <BackHomeLink />
      <div>
        <h1 className="font-display text-2xl">Seu cadastro</h1>
        <p className="mt-1 text-sm text-white/60">
          Preenche os dados da sua viagem pra despedida do Miguel.
        </p>
      </div>
      <RegistrationForm />
    </main>
  );
}
