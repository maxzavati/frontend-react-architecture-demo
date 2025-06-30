import { createContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/apis/user';
import { UserResponse } from '@/types/user';
import { getAccessTokenCookie } from '@/utils/auth';

interface Props {
  children: ReactNode;
}

interface User {
  data: UserResponse | undefined | null;
  isLoading: boolean;
}

const UserContext = createContext<User>({
  data: null,
  isLoading: false,
});

export function UserContextProvider({ children }: Props) {
  const accessToken = getAccessTokenCookie();

  const { data, isLoading } = useQuery({
    queryKey: ['getUser'],
    queryFn: getUser,
    enabled: Boolean(accessToken),
  });

  return (
    <UserContext.Provider
      value={{
        data,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
