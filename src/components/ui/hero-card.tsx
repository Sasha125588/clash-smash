import React from "react";

import type { Hero } from "@/shared/api/requests/cards/getCards";
import { Card, CardDescription, CardTitle } from "./card";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface HeroCardContextValue {
  hero?: Hero;
}

const HeroCardContext = React.createContext<HeroCardContextValue>(
  {} as HeroCardContextValue
);

interface HeroCardProps extends React.ComponentProps<"div"> {
  hero?: Hero;
}

const HeroCard = React.forwardRef<HTMLDivElement, HeroCardProps>(
  ({ children, className, hero, ...props }, ref) => {
    const value = React.useMemo(() => ({ hero }), [hero]);

    return (
      <Card
        ref={ref}
        className={cn("relative w-[350px] h-[450px]", className)}
        {...props}
      >
        <HeroCardContext.Provider value={value}>
          {children}
        </HeroCardContext.Provider>
      </Card>
    );
  }
);
HeroCard.displayName = "HeroCard";

export interface HeroCardBackgroundProps extends React.ComponentProps<"div"> {
  src?: string;
}

const HeroCardBackground = React.forwardRef<
  HTMLDivElement,
  HeroCardBackgroundProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute top-0 left-0 bg-cover w-full h-full rounded-lg select-none!",
      className
    )}
    style={{ backgroundImage: `url(/images/clash-smash-bg.webp)` }}
    {...props}
  />
));
HeroCardBackground.displayName = "HeroCardBackground";

const HeroCardImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentProps<"img">
>(({ className, ...props }, ref) => {
  const heroContext = React.useContext(HeroCardContext);
  const src = heroContext.hero?.iconUrls.medium ?? props.src;

  if (!src) return null;

  return (
    <div className="absolute bottom-12 left-0 w-full h-full flex justify-center items-center">
      <img
        ref={ref}
        alt="hero"
        className={cn("min-h-64 min-w-64 select-none", className)}
        src={src}
        style={{ imageRendering: "crisp-edges" }}
        {...props}
      />
    </div>
  );
});
HeroCardImage.displayName = "HeroCardImage";

const HeroCardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-2 absolute bottom-0 p-3 bg-gradient-to-b from-black/0 to-black/70 rounded-lg w-full",
      className
    )}
    {...props}
  />
));
HeroCardContent.displayName = "HeroCardContent";

const HeroCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const heroContext = React.useContext(HeroCardContext);
  const title = heroContext.hero?.name ?? props.children;

  return (
    <CardTitle
      ref={ref}
      className={cn("text-white text-3xl capitalize mb-1", className)}
      {...props}
    >
      {title}
    </CardTitle>
  );
});
HeroCardTitle.displayName = "HeroCardTitle";

const HeroCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <CardDescription
    ref={ref}
    className={cn("text-white text-xs font-normal", className)}
    {...props}
  />
));
HeroCardDescription.displayName = "HeroCardDescription";

const heroTypesVariants = cva<{ type: Record<string, string> }>(
  "rounded-lg text-sm py-1 text-center text-white capitalize font-bold",
  {
    defaultVariants: {
      type: "common",
    },
    variants: {
      type: {
        common: "bg-lime-600 dark:lime-500",
        rare: "bg-black dark:border-2 dark:bg-black",
        epic: "bg-indigo-600 dark:indigo-500",
        legendary: "bg-red-600 dark:red-500",
        champion: "bg-green-600 dark:green-500",
      },
    },
  }
);

const HeroCardType = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const heroContext = React.useContext(HeroCardContext);
  const rarity = heroContext.hero?.rarity;

  return (
    <div
      ref={ref}
      className={cn(heroTypesVariants({ className, type: rarity }))}
      {...props}
    >
      {rarity}
    </div>
  );
});
HeroCardType.displayName = "HeroCardType";

export {
  HeroCard,
  HeroCardBackground,
  HeroCardContent,
  HeroCardDescription,
  HeroCardImage,
  HeroCardTitle,
  HeroCardType,
};
