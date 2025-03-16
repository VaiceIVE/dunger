import { ReactElement, ReactNode } from 'react';
import { AuthProvider } from './auth';
import { FetchProvider } from './fetch';

export function AuthFetchProvider({
  basename,
  authUrl,
  apiUrl,
  loggingInElement,
  children
}: {
  basename: string;
  authUrl: string;
  apiUrl: string;
  loggingInElement?: ReactElement;
  children?: ReactNode;
}) {
  return (
    <AuthProvider basename={basename} authUrl={authUrl} loggingInElement={loggingInElement}>
      <FetchProvider apiUrl={apiUrl}>{children}</FetchProvider>
    </AuthProvider>
  );
}
