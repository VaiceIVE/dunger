import { useContext } from 'react';
import { invariant } from 'utils/invariant';
import { UserContext } from './UserContext';

export function useUser() {
  invariant(UserContext);
  const businessUserContext = useContext(UserContext);
  // можно использовать только внутри UserProvider
  return businessUserContext;
}
