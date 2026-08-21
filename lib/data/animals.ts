import type { FunnyAnimal } from "@/lib/types";

// Lista fechada para o sorteio automático de animal no cadastro. Cada animal só pode ser sorteado uma vez.
export const ANIMALS: FunnyAnimal[] = [
  // Mamíferos
  {
    name: "Preguiça de shopping",
    category: "Mamíferos",
    description: "Sobe no elevador e já reclama que cansou.",
    emoji: "🦥",
    image: "/cards/animais/1-preguica-de-shopping.png",
  },
  {
    name: "Capivara VIP",
    category: "Mamíferos",
    description: "Entra na piscina dos outros e ainda pede a conta.",
    emoji: "🐹",
    image: "/cards/animais/2-capivara-vip.png",
  },
  {
    name: "Tatu-bola",
    category: "Mamíferos",
    description: "Qualquer problema, se enrola e finge que não existe.",
    emoji: "🐾",
    image: "/cards/animais/3-tatu-bola.png",
  },
  {
    name: "Quati ladrão",
    category: "Mamíferos",
    description: "Pega tudo que vê pela frente e ainda olha com cara de paisagem.",
    emoji: "🦝",
    image: "/cards/animais/4-quati-ladrao.png",
  },
  {
    name: "Porco-espinho carente",
    category: "Mamíferos",
    description: "Chega perto pra abraçar e só fura todo mundo.",
    emoji: "🦔",
    image: "/cards/animais/5-porco-espinho-carente.png",
  },
  {
    name: "Tamanduá-bandeira",
    category: "Mamíferos",
    description: "Língua maior que o corpo e ainda assim não resolve nada.",
    emoji: "🐾",
    image: "/cards/animais/6-tamandua-bandeira.png",
  },
  // Aves
  {
    name: "Urubu de asymptote",
    category: "Aves",
    description: "Só aparece quando a coisa já tá fedendo.",
    emoji: "🦅",
    image: "/cards/animais/7-urubu-de-asymptote.png",
  },
  {
    name: "Pombo de praça",
    category: "Aves",
    description: "Caga em tudo que é sagrado e ainda anda de peito estufado.",
    emoji: "🕊️",
    image: "/cards/animais/8-pombo-de-praca.png",
  },
  {
    name: "Gavião de Instagram",
    category: "Aves",
    description: "Fica de olho em tudo, mas nunca desce pro rolê.",
    emoji: "🦉",
    image: "/cards/animais/9-gaviao-de-instagram.png",
  },
  {
    name: "Galinha d'angola",
    category: "Aves",
    description: "Grita por qualquer merda e depois finge que foi mal-entendido.",
    emoji: "🐔",
    image: "/cards/animais/10-galinha-d-angola.png",
  },
  {
    name: "Avestruz político",
    category: "Aves",
    description: "Enterra a cabeça e jura que o problema sumiu.",
    emoji: "🦤",
    image: "/cards/animais/11-avestruz-politico.png",
  },
  // Répteis e Anfíbios
  {
    name: "Jacaré de sorriso",
    category: "Répteis e Anfíbios",
    description: "Ri pra você o tempo todo, mas tá só esperando a chance.",
    emoji: "🐊",
    image: "/cards/animais/12-jacare-de-sorriso.png",
  },
  {
    name: "Cobra de grama",
    category: "Répteis e Anfíbios",
    description: "Rasteja em silêncio e só aparece quando já mordeu.",
    emoji: "🐍",
    image: "/cards/animais/13-cobra-de-grama.png",
  },
  {
    name: "Sapo de canteiro",
    category: "Répteis e Anfíbios",
    description: "Incha o peito, faz barulho e no final não entrega nada.",
    emoji: "🐸",
    image: "/cards/animais/14-sapo-de-canteiro.png",
  },
  {
    name: "Lagarto de muro",
    category: "Répteis e Anfíbios",
    description: "Sobe em qualquer discussão e depois cai de boca aberta.",
    emoji: "🦎",
    image: "/cards/animais/15-lagarto-de-muro.png",
  },
  // Insetos e Outros
  {
    name: "Barata de apartamento",
    category: "Insetos e Outros",
    description: "Sobrevive a tudo e ainda te julga quando você grita.",
    emoji: "🪳",
    image: "/cards/animais/16-barata-de-apartamento.png",
  },
  {
    name: "Mosquito de madrugada",
    category: "Insetos e Outros",
    description: "Te acha no escuro e ainda faz festa no ouvido.",
    emoji: "🦟",
    image: "/cards/animais/17-mosquito-de-madrugada.png",
  },
  {
    name: "Formiga carreteira",
    category: "Insetos e Outros",
    description: "Carrega o triplo do peso e ainda reclama do horário.",
    emoji: "🐜",
    image: "/cards/animais/18-formiga-carreteira.png",
  },
];
