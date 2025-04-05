import { ReactNode, useRef } from 'react';
import { useAuth } from '../auth';
import { createAuthFetch } from './createAuthFetch';
import { FetchContext } from './FetchContext';

export function FetchProvider({ apiUrl, children }: { apiUrl: string; children?: ReactNode }) {
  const { getToken } = useAuth();
  const v = useRef(createAuthFetch(apiUrl, getToken));
  return <FetchContext.Provider value={v.current}>{children}</FetchContext.Provider>;
}
