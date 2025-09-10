import { createLazyFileRoute } from "@tanstack/react-router";
import { HeroSwiper } from "./-components/HeroSwiper/HeroSwiper";

const MainPage = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <HeroSwiper />
    </div>
  );
};

export const Route = createLazyFileRoute("/_layout/")({
  component: MainPage,
});
