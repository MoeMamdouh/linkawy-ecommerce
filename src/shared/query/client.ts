import { QueryClient } from '@tanstack/react-query';

/**
 * Shared React Query client.
 *
 * Lives outside the root layout so dev tooling (Reactotron) can subscribe to the
 * same cache the app renders from.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
      gcTime: 1000 * 60 * 24,   // Cache retained for 24 hours
    },
  },
});

export default queryClient;
