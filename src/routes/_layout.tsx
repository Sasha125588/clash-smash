import { createFileRoute, Outlet } from "@tanstack/react-router";

import { BottomMenu, Header } from "./-components";

const RootLayout = () => (
  <div className="container max-w-[1000px] m-auto px-4 overflow-hidden h-screen">
    <div className="flex flex-col h-full">
      <div className="container hidden lg:block">
        <Header />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <div className="lg:hidden">
        <BottomMenu />
      </div>
    </div>
  </div>
);

export const Route = createFileRoute("/_layout")({
  component: RootLayout,
});
