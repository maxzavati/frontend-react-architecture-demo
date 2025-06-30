import { createContext, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: ReactNode;
}

const QueryContext = createContext({});

export function QueryContextProvider({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryContext.Provider value={{}}>{children}</QueryContext.Provider>
    </QueryClientProvider>
  );
}
