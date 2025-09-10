import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../requests/cards/getCards";

export const useGetCardsQuery = (settings?: QuerySettings<typeof getCards>) =>
  useQuery({
    queryKey: ["getCards"],
    queryFn: () => getCards(settings?.config),
    ...settings?.options,
  });
