-- Rode este script inteiro no SQL Editor do Supabase (uma única vez).

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(trim(name)) > 0),
  arrival_at timestamptz not null,
  departure_at timestamptz not null,
  player text not null unique,
  instrument text not null,
  animal text not null,
  destilado_combo text,
  pode_alugar_carro boolean,
  message text,
  constraint departure_after_arrival check (departure_at > arrival_at)
);

alter table registrations enable row level security;

create policy "Public read access"
  on registrations for select
  to anon
  using (true);

create policy "Public insert access"
  on registrations for insert
  to anon
  with check (true);

-- Habilita atualização em tempo real (usado nas telas temáticas mais adiante).
alter publication supabase_realtime add table registrations;

-- MIGRAÇÃO: se a tabela "registrations" já existia (rodou o script acima antes),
-- rode só o trecho abaixo no SQL Editor do Supabase pra adicionar os campos novos.
alter table registrations
  add column if not exists destilado_combo text,
  add column if not exists pode_alugar_carro boolean,
  add column if not exists message text;
