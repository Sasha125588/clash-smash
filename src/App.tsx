import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "../generated/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Register the router instance for type safety
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createRouter({
  routeTree,
  context: { queryClient },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
