# Prompt para o Claude Code — Site da Despedida de Solteiro do Miguel

> Cole o conteúdo abaixo (da linha "Contexto" em diante) no Claude Code. Ele foi escrito
> para ser lido como um briefing completo. As decisões de stack estão propositalmente
> abertas para o Claude Code escolher o caminho mais simples — mas com restrições claras.

---

## Contexto

Quero construir um site para organizar uma viagem de despedida de solteiro de um amigo
chamado **Miguel**. Somos um grupo de **14 pessoas** viajando de **São Paulo para a Praia
do Rosa (Santa Catarina)** em **setembro de 2026**.

O ponto central é que **cada pessoa chega e volta em voos e horários diferentes**:
- **Chegadas:** entre 04/09/2026 e 05/09/2026
- **Voltas:** entre 07/09/2026 e 08/09/2026

O site tem dois objetivos: **organizar a logística** da viagem e **ser divertido**, com
um perfil temático de cada integrante do grupo.

## Requisitos essenciais

- **Link único e aberto**, que eu vou compartilhar no grupo de WhatsApp. Qualquer pessoa
  com o link pode preencher e visualizar. Sem login, sem senha, sem controle de acesso.
- **Dados persistentes**: quando alguém preenche o cadastro, os dados ficam salvos de forma
  permanente e ficam visíveis para todos os outros. Uma pessoa preenche hoje, e amanhã os
  dados continuam lá para o grupo inteiro ver.
- **Precisa ser hospedável** num link real que eu possa mandar no grupo (não pode ser algo
  que roda só na minha máquina).

## Decisões técnicas (escolha o mais simples)

Escolha a stack de **backend, banco de dados e hospedagem** que for mais simples de
desenvolver e publicar, respeitando os requisitos acima (persistência real + link público).
Sugira o que você acha melhor antes de começar e me explique rapidamente o porquê. Priorize:

- Algo com **plano gratuito** suficiente para 14 pessoas e baixo tráfego.
- **Mínima configuração manual** da minha parte (quanto menos eu precisar mexer em painel,
  melhor). Se precisar que eu crie alguma conta ou pegue alguma chave de API, me guie passo
  a passo.
- Frontend moderno e responsivo (o pessoal vai abrir no celular).

## Modelo de dados — o cadastro de cada pessoa

Cada integrante preenche um formulário com:

1. **Nome**
2. **Voo de chegada** — data e horário
3. **Voo de volta** — data e horário
4. **Jogador da Seleção Brasileira na Copa do Mundo de 2022** que essa pessoa seria
5. **Instrumento** que tocaria se o grupo fosse uma banda
6. **Animal** que essa pessoa seria

## Seções / telas do site

### 1. Capa (home)
- Nome da viagem / despedida do Miguel, com identidade visual de viagem/praia.
- **Contagem regressiva** para a data da viagem.
- Botão de destaque: "Preencher meu cadastro".

### 2. Formulário de cadastro
- Coleta os 6 campos do modelo de dados acima.
- Ao enviar, salva no banco e a pessoa passa a aparecer nas telas de visualização.

### 3. Linha do tempo de chegadas e voltas (logística)
- Visualização de **quem está presente em cada dia** (04, 05, 06, 07 e 08/09), calculada a
  partir das datas de chegada e volta de cada um. Deve deixar claro, por exemplo, em que
  dia o grupo está completo (todos os 14 presentes).
- **Sugestão de caronas**: agrupar pessoas com horários de chegada próximos (e o mesmo para
  a volta), já que o trajeto aeroporto de Floripa → Praia do Rosa é longo (~2h) e faz
  sentido dividir transfer/Uber. Pode ser uma sugestão simples baseada em janelas de horário.

### 4. Escalação da viagem (campo de futebol) ⚽
- Um **campo de futebol** com as posições de um time. Conforme cada pessoa se cadastra e
  escolhe seu jogador da Copa 2022, ela **"entra em campo"** na posição correspondente ao
  jogador escolhido (nome do jogador + nome da pessoa).
- **Cada jogador é único**: se um jogador já foi escolhido por alguém, ele **não pode ser
  escolhido de novo**. No formulário, mostre quais jogadores já estão ocupados / desabilite-os
  para os próximos que forem preencher.
- Como são 14 pessoas e um time tem 11 titulares, use **banco de reservas** para os demais.
- Efeito desejado: o campo começa vazio e vai enchendo à medida que o pessoal cadastra —
  cria expectativa no grupo.

### 5. A banda da viagem (palco) 🎸
- Uma **tela dedicada com um palco**, onde os instrumentos escolhidos vão aparecendo,
  mostrando quem toca o quê. Vai formando "a banda da viagem" conforme o pessoal preenche.

### 6. O zoológico 🦁
- Uma tela mostrando os **animais escolhidos** por cada pessoa, estilo zoológico.
- **Animais podem repetir.** Quando o mesmo animal for escolhido por mais de uma pessoa,
  agrupe todos na **mesma "jaula"/recinto** no visual (ex: a jaula do "leão" com todas as
  pessoas que escolheram leão juntas ali).
- Capriche no clima divertido (emojis dos animais, cards com "placa de zoológico", etc).

## Direção de design / vibe

- Clima de **viagem, praia e turma de amigos** — descontraído, colorido, divertido, nada
  corporativo.
- **Mobile-first**: a maioria vai abrir no celular pelo link do WhatsApp.
- As três telas temáticas (campo, palco, zoológico) são o coração da graça do site — vale
  investir no capricho visual delas.

## Como quero desenvolver

- **Não construa tudo de uma vez.** Comece propondo a stack e a estrutura do projeto, e me
  explique o plano antes de sair codando.
- Sugiro esta ordem de construção, mas fique à vontade para ajustar:
  1. Estrutura do projeto + backend/banco + formulário de cadastro salvando de verdade.
  2. Telas de visualização básicas (lista de quem já preencheu) para eu validar que a
     persistência funciona.
  3. Linha do tempo / logística.
  4. As telas temáticas (campo, palco, zoológico), uma de cada vez.
  5. Capa, contagem regressiva e polimento visual.
- Vou desenvolver junto com você, testando a cada etapa. Prefiro passos pequenos e validados
  a um entregável gigante de uma vez só.

## Detalhes a confirmar comigo durante o desenvolvimento

- A lista oficial dos 26 convocados da Seleção Brasileira para a Copa de 2022 (para popular
  as opções de jogador no formulário) — me confirme a lista que você vai usar.
- O nome/título que vai na capa da viagem.
