import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { invariant } from './invariant';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  invariant(authContext);
  return authContext;
};
