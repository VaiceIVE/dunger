import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth, useAuthFetch } from '@dunger/auth-fetch';
import { ApiUser } from '../_types/user/ApiUser';
import { UserContext } from './UserContext';

export function UserProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const authFetch = useAuthFetch();

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: () => authFetch<ApiUser>('/user'),
    enabled: isAuthenticated
  });

  return <UserContext value={data ?? null}>{children}</UserContext>;
}
