import { ReactNode, useMemo } from 'react';
import { useAuth } from '../auth';
import { createAuthFetch } from './createAuthFetch';
import { FetchContext } from './FetchContext';

export function FetchProvider({ apiUrl, children }: { apiUrl: string; children?: ReactNode }) {
  const { getToken, isAuthenticated } = useAuth();

  const fetchClient = useMemo(() => {
    return createAuthFetch(apiUrl, isAuthenticated ? getToken : undefined);
  }, [apiUrl, isAuthenticated, getToken]);

  return <FetchContext.Provider value={fetchClient}>{children}</FetchContext.Provider>;
}
