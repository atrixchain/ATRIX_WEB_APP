import {
  QueryCache,
  QueryClient,
  QueryClientConfig,
} from "@tanstack/react-query";

export const QUERY_CLIENT_DEFAULT_OPTIONS: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retryDelay: 5 * 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any) => {
      return console.log("react query res " , error);
    },
  }),
};

export const queryClient = new QueryClient(QUERY_CLIENT_DEFAULT_OPTIONS);
