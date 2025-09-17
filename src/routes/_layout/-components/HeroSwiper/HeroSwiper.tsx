import { Heart, Trash } from "lucide-react";
import { motion } from "motion/react";

import {
  Button,
  HeroCard,
  HeroCardBackground,
  HeroCardContent,
  HeroCardDescription,
  HeroCardImage,
  HeroCardTitle,
  HeroCardType,
} from "@/components/ui";
import { useHeroSwiper } from "./hooks/useHeroSwiper";

export const HeroSwiper = () => {
  const { state, functions } = useHeroSwiper();

  return (
    <div className="flex gap-4 flex-col relative">
      <motion.div
        dragElastic={{
          top: 0.2,
          bottom: 0.2,
          right: 0.5,
          left: 0.5,
        }}
        style={{
          x: state.card.x,
          rotate: state.card.rotate,
        }}
        whileDrag={{
          scale: 1.05,
        }}
        animate={state.card.controls}
        className="w-[350px] z-[1]"
        drag={!!state.hero}
        dragConstraints={{
          left: 0,
          bottom: 0,
          top: 0,
          right: 0,
        }}
        onDragEnd={(_event, info) => {
          //   if (state.pending.action || state.loading.hero) return;
          if (info.offset.x > -300 && info.offset.x < 300) return;
          const action = info.offset.x > 0 ? "pass" : "smash";
          functions.onCardDragEnd(action);
        }}
      >
        <motion.div
          style={{
            opacity: state.card.opacity,
          }}
        >
          {state.hero && (
            <HeroCard
              className="h-[450px]"
              hero={state.hero[state.currentIndex]}
            >
              <HeroCardBackground />
              <div className="absolute bottom-0 top-0 right-0 left-0 z-[1]" />
              <HeroCardImage loading="lazy" />
              <HeroCardContent className="text-left">
                <HeroCardTitle className="text-5xl" />
                <HeroCardDescription />
                <HeroCardType />
              </HeroCardContent>
            </HeroCard>
          )}
        </motion.div>

        <motion.div
          className="flex items-center justify-center size-16 rounded-full shadow-md absolute bottom-[-20px] right-0 left-0 m-auto"
          style={{ background: state.card.color, opacity: state.card.like }}
        >
          <Heart className="text-white size-8" />
        </motion.div>

        <motion.div
          className="flex items-center justify-center size-16 rounded-full shadow-md absolute bottom-[-20px] right-0 left-0 m-auto"
          style={{ background: state.card.color, opacity: state.card.trash }}
        >
          <Trash className="text-white size-8" />
        </motion.div>
      </motion.div>

      <div className="flex items-center mx-auto justify-center gap-2">
        <Button
          className="w-full hover:bg-red-100"
          //   disabled={state.pending.action || state.loading.hero}
          variant="outline"
          onClick={() => functions.onActionClick("smash")}
        >
          <Trash className="size-4 mr-2" />
          PASS
        </Button>
        <Button
          className="w-full hover:bg-green-100"
          //   disabled={state.pending.action || state.loading.hero}
          variant="outline"
          onClick={() => functions.onActionClick("pass")}
        >
          <Heart className="size-4 mr-2" />
          SMASH
        </Button>
      </div>
    </div>
  );
};
