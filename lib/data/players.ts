import type { FunnyPlayer } from "@/lib/types";

// Lista fechada para o sorteio automático de jogador no cadastro.
export const PLAYERS: FunnyPlayer[] = [
  // Goleiros
  {
    name: "Mão de boneca de pano",
    position: "GOL",
    description: "Não segura nem bebê. Se você der uma criança para ele cuidar, ele deixa escapar.",
    image: "/cards/jogadores/mao-de-boneca-de-pano.png",
  },
  {
    name: "Castigo de professora",
    position: "GOL",
    description: "Está sempre no cantinho.",
    image: "/cards/jogadores/castigo-de-professora.png",
  },
  {
    name: "Colação de grau",
    position: "GOL",
    description: "É um canudo atrás do outro.",
    image: "/cards/jogadores/colacao-de-grau.png",
  },
  {
    name: "Ex-presidente",
    position: "GOL",
    description: "Não sai do gol de jeito nenhum.",
    image: "/cards/jogadores/ex-presidente.png",
  },
  {
    name: "Voier",
    position: "GOL",
    description: "Não pula na bola, apenas observa o gol acontecer.",
    image: "/cards/jogadores/voyeur.png",
  },
  {
    name: "Urologista",
    position: "GOL",
    description: "Coloca a luva e pega com firmeza.",
    image: "/cards/jogadores/urologista.png",
  },
  // Defesa (Zagueiros e Laterais)
  {
    name: "Zagueiro IML",
    position: "DEF",
    description: "Não quer saber de bola, só vai direto no corpo.",
    image: "/cards/jogadores/iml.png",
  },
  {
    name: "Zagueiro Sopa de gesso",
    position: "DEF",
    description: "Totalmente duro e sem flexibilidade. Mais duro que salame de colônia.",
    image: "/cards/jogadores/sopa-de-gesso.png",
  },
  {
    name: "Zagueiro Elise Matsunaga",
    position: "DEF",
    description: "Fatiou e esquartejou o ataque adversário.",
    image: "/cards/jogadores/elise-matsunaga.png",
  },
  {
    name: "Lateral Cão castrado",
    position: "DEF",
    description: "Aquele lateral que não cruza mais.",
    image: "/cards/jogadores/cao-castrado.png",
  },
  {
    name: "Lateral Caxumba",
    position: "DEF",
    description: "Quando desce para o apoio, é um perigo total.",
    image: "/cards/jogadores/caxumba.png",
  },
  // Meio-Campo (Volantes e Meias)
  {
    name: "Volante Caçamba",
    position: "MEI",
    description: "Só joga e toca para trás.",
    image: "/cards/jogadores/cacamba.png",
  },
  {
    name: "Volante Refrigerante de 3 litros",
    position: "MEI",
    description: "Quando passa do meio-campo, perde o gás completamente.",
    image: "/cards/jogadores/refrigerante-3-litros.png",
  },
  {
    name: "Meia Soldado de guerra",
    position: "MEI",
    description: "Ele avança para o ataque, mas ninguém sabe se ele volta.",
    image: "/cards/jogadores/soldado-de-guerra.png",
  },
  {
    name: "Meia Calcinha da Pabllo Vittar",
    position: "MEI",
    description: "Desaparece e some do jogo nos momentos de pressão.",
    image: "/cards/jogadores/calcinha-pabllo-vittar.png",
  },
  // Ataque
  {
    name: "Atacante Vitamina C",
    position: "ATA",
    description: "Corre o jogo inteiro, mas não faz mal a nenhum adversário.",
    image: "/cards/jogadores/vitamina-c.png",
  },
  {
    name: "Atacante Triatleta",
    position: "ATA",
    description: "Corre, pedala, mas na hora H, só nada.",
    image: "/cards/jogadores/triatleta.png",
  },
];
