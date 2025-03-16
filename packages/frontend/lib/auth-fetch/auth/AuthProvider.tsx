import { ReactElement, ReactNode, useCallback, useLayoutEffect } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({
  basename,
  authUrl,
  children
}: {
  basename: string;
  authUrl: string;
  loggingInElement?: ReactElement;
  children?: ReactNode;
}) {
  useLayoutEffect(() => {
    if (!window.location.hash) {
      sessionStorage.setItem('target', window.location.pathname);
    }
  }, [authUrl, basename]);

  const getToken = useCallback(() => {
    return Promise.resolve('mocked_token');
  }, []);

  return <AuthContext.Provider value={{ getToken }}>{children}</AuthContext.Provider>;
}
