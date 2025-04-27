import { useContext } from 'react';
import { invariant } from './_internal/invariant';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  invariant(authContext);
  return authContext;
};
