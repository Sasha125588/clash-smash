import type { QueryClient } from "@tanstack/react-query";

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { createRootRouteWithContext } from "@tanstack/react-router";

interface RouterContext {
  queryClient: QueryClient;
}

const Root = () => (
  <>
    {/* <Outlet /> */}
    {/* <TanStackRouterDevtools />
    <ReactQueryDevtools /> */}
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
});
