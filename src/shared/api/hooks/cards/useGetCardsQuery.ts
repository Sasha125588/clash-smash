import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../requests/cards/getCards";

export const useGetCardsQuery = () =>
  useQuery({ queryKey: ["getCards"], queryFn: () => getCards() });
