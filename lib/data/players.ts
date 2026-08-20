import type { FunnyPlayer } from "@/lib/types";

// Lista fechada para o sorteio automático de jogador no cadastro.
export const PLAYERS: FunnyPlayer[] = [
  // Goleiros
  {
    name: "Mão de boneca de pano",
    position: "GOL",
    description: "Não segura nem bebê. Se você der uma criança para ele cuidar, ele deixa escapar.",
  },
  {
    name: "Castigo de professora",
    position: "GOL",
    description: "Está sempre no cantinho.",
  },
  {
    name: "Colação de grau",
    position: "GOL",
    description: "É um canudo atrás do outro.",
  },
  {
    name: "Ex-presidente",
    position: "GOL",
    description: "Não sai do gol de jeito nenhum.",
  },
  {
    name: "Voier",
    position: "GOL",
    description: "Não pula na bola, apenas observa o gol acontecer.",
  },
  {
    name: "Urologista",
    position: "GOL",
    description: "Coloca a luva e pega com firmeza.",
  },
  // Defesa (Zagueiros e Laterais)
  {
    name: "Zagueiro IML",
    position: "DEF",
    description: "Não quer saber de bola, só vai direto no corpo.",
  },
  {
    name: "Zagueiro Sopa de gesso",
    position: "DEF",
    description: "Totalmente duro e sem flexibilidade. Mais duro que salame de colônia.",
  },
  {
    name: "Zagueiro Elise Matsunaga",
    position: "DEF",
    description: "Fatiou e esquartejou o ataque adversário.",
  },
  {
    name: "Lateral Cão castrado",
    position: "DEF",
    description: "Aquele lateral que não cruza mais.",
  },
  {
    name: "Lateral Caxumba",
    position: "DEF",
    description: "Quando desce para o apoio, é um perigo total.",
  },
  // Meio-Campo (Volantes e Meias)
  {
    name: "Volante Caçamba",
    position: "MEI",
    description: "Só joga e toca para trás.",
  },
  {
    name: "Volante Refrigerante de 3 litros",
    position: "MEI",
    description: "Quando passa do meio-campo, perde o gás completamente.",
  },
  {
    name: "Meia Soldado de guerra",
    position: "MEI",
    description: "Ele avança para o ataque, mas ninguém sabe se ele volta.",
  },
  {
    name: "Meia Calcinha da Pabllo Vittar",
    position: "MEI",
    description: "Desaparece e some do jogo nos momentos de pressão.",
  },
  // Ataque
  {
    name: "Atacante Vitamina C",
    position: "ATA",
    description: "Corre o jogo inteiro, mas não faz mal a nenhum adversário.",
  },
  {
    name: "Atacante Triatleta",
    position: "ATA",
    description: "Corre, pedala, mas na hora H, só nada.",
  },
];
