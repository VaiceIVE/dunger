import { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { FetchProvider } from './fetch';

export function AuthFetchProvider({ apiUrl, children }: { apiUrl: string; children?: ReactNode }) {
  return (
    <AuthProvider apiUrl={apiUrl}>
      <FetchProvider apiUrl={apiUrl}>{children}</FetchProvider>
    </AuthProvider>
  );
}
