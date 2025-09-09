import {
  HeroCard,
  HeroCardContent,
  HeroCardBackground,
  HeroCardImage,
  HeroCardTitle,
  HeroCardDescription,
  HeroCardType,
} from "@/components/ui/hero-card";
import { useGetCardsQuery } from "@/shared/api/hooks/cards/useGetCardsQuery";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const MainPage = () => {
  const [index, setIndex] = useState(0);
  const getCardsResponse = useGetCardsQuery();

  const handleClick = () => {
    setIndex(index + 1);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <HeroCard
        hero={getCardsResponse.data?.items[index]}
        onClick={handleClick}
      >
        <HeroCardBackground />
        <HeroCardImage
          src={getCardsResponse.data?.items[index].iconUrls.medium}
        />
        <HeroCardContent>
          <HeroCardTitle>
            {getCardsResponse.data?.items[index].name}
          </HeroCardTitle>
          <HeroCardDescription>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-center">
                <span className="text-sm ">Level</span>
                <span className="text-xl font-bold">
                  {getCardsResponse.data?.items[index].maxLevel}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm ">Evolution</span>
                <span className="text-xl font-bold">
                  {getCardsResponse.data?.items[index].maxEvolutionLevel
                    ? "Yes"
                    : "No"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm ">Elixir</span>
                <span className="text-xl font-bold text-purple-600">
                  {getCardsResponse.data?.items[index].elixirCost}
                </span>
              </div>
            </div>
          </HeroCardDescription>
          <HeroCardType>
            {getCardsResponse.data?.items[index].rarity}
          </HeroCardType>
        </HeroCardContent>
      </HeroCard>
    </div>
  );
};

export const Route = createLazyFileRoute("/_layout/")({
  component: MainPage,
});
