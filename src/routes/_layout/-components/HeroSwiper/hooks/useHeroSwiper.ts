import { useDidUpdate, useKeyPressEvent } from "@siberiacancode/reactuse";
import { keepPreviousData } from "@tanstack/react-query";

import { useAnimationCard } from "./useAnimationCard";
import { useGetCardsQuery } from "@/shared/api/hooks/cards/useGetCardsQuery";
import { useState } from "react";

export const useHeroSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationCard = useAnimationCard();

  const getCardsQuery = useGetCardsQuery({
    options: {
      placeholderData: keepPreviousData,
    },
  });

  useDidUpdate(() => {
    if (!getCardsQuery.dataUpdatedAt) return;
    animationCard.controls.start({
      y: 0,
      opacity: 1,
    });
  }, [getCardsQuery.dataUpdatedAt, currentIndex]);

  //   const postStatisticActionMutation = usePostStatisticActionMutation();

  const heroAction = async (action: "pass" | "smash") => {
    console.log(action);
    setCurrentIndex((prev) => prev + 1);
    //   await postStatisticActionMutation.mutateAsync({
    //     params: { heroId: randomHeroId, action },
    //   });
    //   prevHeroIdStorage.set(randomHeroId);
    //   setRandomHeroId(getRandomHeroId());
  };

  const onAction = async (action: "pass" | "smash") => {
    await animationCard.controls.start({
      x: action === "pass" ? 500 : -500,
      rotate: 45,
      opacity: 0,
      transition: { duration: 0.5 },
    });
    await animationCard.controls.set({
      y: -500,
      x: 0,
      transition: { duration: 0 },
    });
    await heroAction(action);
  };

  useKeyPressEvent("ArrowLeft", () => onAction("smash"));
  useKeyPressEvent("ArrowRight", () => onAction("pass"));

  return {
    state: {
      currentIndex,
      card: animationCard,
      hero: getCardsQuery.data?.data.items,
      loading: {
        hero: getCardsQuery.isLoading,
      },
      pending: {
        // action: postStatisticActionMutation.isPending,
      },
    },
    functions: {
      onActionClick: onAction,
      onCardDragEnd: onAction,
    },
  };
};
