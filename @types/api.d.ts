interface MutationSettings<Params = void, Func = unknown> {
  config?: RequestConfig;
  options?: import("@tanstack/react-query").UseMutationOptions<
    Awaited<ReturnType<Func>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Params,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
}

interface QuerySettings<Func = unknown> {
  config?: RequestOptions;
  options?: Omit<
    import("@tanstack/react-query").UseQueryOptions<
      Awaited<ReturnType<Func>>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      Awaited<ReturnType<Func>>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    >,
    "queryKey"
  >;
}
