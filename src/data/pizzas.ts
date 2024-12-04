import type { Pizza } from '../types';

export const PIZZAS: Pizza[] = [
  {
    id: 1,
    name: "Margherita",
    description: "La classique italienne avec sauce tomate, mozzarella et basilic frais",
    image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1350&q=80",
    prices: {
      small: 9,
      medium: 12,
      large: 15
    },
    ingredients: ["sauce tomate", "mozzarella", "basilic"],
    category: "classiques",
    vegetarian: true
  },
  {
    id: 2,
    name: "Regina",
    description: "Sauce tomate, mozzarella, jambon, champignons frais",
    image_url: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=1350&q=80",
    prices: {
      small: 11,
      medium: 14,
      large: 17
    },
    ingredients: ["sauce tomate", "mozzarella", "jambon", "champignons"],
    category: "classiques",
    vegetarian: false
  },
  {
    id: 3,
    name: "4 Fromages",
    description: "Sauce tomate, mozzarella, gorgonzola, chèvre, parmesan",
    image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1350&q=80",
    prices: {
      small: 12,
      medium: 15,
      large: 18
    },
    ingredients: ["sauce tomate", "mozzarella", "gorgonzola", "chèvre", "parmesan"],
    category: "fromages",
    vegetarian: true
  },
  {
    id: 4,
    name: "Calzone",
    description: "Pizza pliée avec sauce tomate, mozzarella, jambon, œuf",
    image_url: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=1350&q=80",
    prices: {
      small: 11,
      medium: 14,
      large: 17
    },
    ingredients: ["sauce tomate", "mozzarella", "jambon", "œuf"],
    category: "spécialités",
    vegetarian: false
  },
  {
    id: 5,
    name: "Végétarienne",
    description: "Sauce tomate, mozzarella, poivrons, oignons, champignons, olives",
    image_url: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&w=1350&q=80",
    prices: {
      small: 11,
      medium: 14,
      large: 17
    },
    ingredients: ["sauce tomate", "mozzarella", "poivrons", "oignons", "champignons", "olives"],
    category: "végétariennes",
    vegetarian: true
  },
  {
    id: 6,
    name: "Diavola",
    description: "Sauce tomate, mozzarella, salami piquant, poivrons, piments",
    image_url: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=1350&q=80",
    prices: {
      small: 12,
      medium: 15,
      large: 18
    },
    ingredients: ["sauce tomate", "mozzarella", "salami piquant", "poivrons", "piments"],
    category: "spécialités",
    vegetarian: false
  },
  {
    id: 7,
    name: "Caprese",
    description: "Sauce tomate, mozzarella di bufala, tomates cerises, roquette, huile d'olive",
    image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1350&q=80",
    prices: {
      small: 13,
      medium: 16,
      large: 19
    },
    ingredients: ["sauce tomate", "mozzarella di bufala", "tomates cerises", "roquette"],
    category: "spécialités",
    vegetarian: true
  },
  {
    id: 8,
    name: "Fruits de Mer",
    description: "Sauce tomate, mozzarella, fruits de mer, ail, persil",
    image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1350&q=80",
    prices: {
      small: 14,
      medium: 17,
      large: 20
    },
    ingredients: ["sauce tomate", "mozzarella", "fruits de mer", "ail", "persil"],
    category: "spécialités",
    vegetarian: false
  }
];