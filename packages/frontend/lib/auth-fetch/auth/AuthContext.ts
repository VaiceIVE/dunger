import { createContext } from 'react';

export interface IAuthContext {
  getToken: () => Promise<string>;
}

export const AuthContext = createContext<IAuthContext | null>(null);
