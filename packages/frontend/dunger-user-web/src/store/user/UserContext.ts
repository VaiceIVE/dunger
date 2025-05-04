import { createContext } from 'react';

export interface IUserContext {
  id: string;
  username: string;
  email: string;
}

export const UserContext = createContext<IUserContext | null>(null);
