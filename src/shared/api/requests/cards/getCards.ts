import type { AxiosRequestConfig } from "axios";
import { api } from "../../instance";

export type Rarity = "common" | "rare" | "epic" | "legendary" | "champion";

export interface HeroCardIcons {
  medium: string;
  evolutionMedium?: string;
}

export interface Hero {
  name: string;
  id: number;
  maxLevel: number;
  maxEvolutionLevel?: number;
  elixirCost?: number;
  iconUrls: HeroCardIcons;
  rarity: Rarity;
}

export interface CardsResponse {
  items: Hero[];
  supportItems: Hero[];
}

export const getCards = async (requestConfig: AxiosRequestConfig) =>
  await api.get<CardsResponse>("cards", requestConfig);
