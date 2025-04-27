import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { InitUserInput } from '../api/initUser';
import { AuthService } from '../service/AuthService';
import { Cache } from '../service/Cache';
import { useSetState } from './_internal/state';
import { AuthContext, AuthState } from './AuthContext';

export interface AuthProviderProps extends PropsWithChildren {
  clearStore: () => Promise<void>;
  apiUrl: string;
}

export const AuthProvider = ({ children, clearStore, apiUrl }: AuthProviderProps) => {
  const serviceRef = useRef<AuthService>(new AuthService(new Cache('dunger:'), apiUrl));
  const service = serviceRef.current;

  const initialAuthenticated = useRef(service.isAuthenticated());
  const [state, setState] = useSetState<AuthState>(() => {
    return {
      /**
       * Начальное состояние isAuthenticated определяется на основании наличия
       * и жизнеспособности refreshToken`а.
       *
       * Этот подход используется, чтобы сразу определить авторизован пользователь или нет,
       * подобная проверка по accessToken`у не подходит, потому что он быстро истекает,
       * и начальное состояние isAuthenticated = false, что ошибочно,
       * так как при запросе токена (AuthProvider.getToken) производится нормальная проверка
       * жизнеспособности accessToken`а и его обновление при необходимости (смотреть AuthService.getToken).
       *
       * Если refreshToken невалидный, то getToken выбрасывает ошибку, которая обрабатывается сервисом
       * (происходит логаут)
       */
      isAuthenticated: initialAuthenticated.current,
      loading: false
    };
  });

  const getToken = useCallback(async () => await service.getToken(), [service]);

  const logout = useCallback(async () => {
    try {
      setState({ loading: true });
      await service.logout();
    } finally {
      setState({ loading: false, isAuthenticated: false });
      await clearStore();
    }
  }, [service, setState, clearStore]);

  /**
   * Устанавливает обработчик с валидацией токенов на изменения local storage
   */
  const setStorageChangeHandler = useCallback(() => {
    window.addEventListener('storage', async (e) => {
      if (e.key === service.cache.getKey('auth')) {
        // Токен появился в local storage
        if (e.oldValue === null && e.newValue !== null) {
          setState({ loading: false, isAuthenticated: service.isAuthenticated() });
          return;
        }

        // Токен исчез из local storage
        if (e.oldValue !== null && e.newValue === null) {
          await logout();
        }
      }
    });
  }, [logout, service, setState]);

  useEffect(() => {
    setStorageChangeHandler();
  }, [setStorageChangeHandler]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setState({ loading: true, isAuthenticated: false });
        const data = await service.login(email, password);
        setState({ loading: false, isAuthenticated: !!data });
      } catch (error: unknown) {
        setState({ loading: false, isAuthenticated: false });

        throw error;
      }
    },
    [service, setState]
  );

  const initUser = useCallback(
    async (input: InitUserInput) => {
      try {
        setState({ loading: true, isAuthenticated: false });
        const data = await service.initUser(input);
        setState({ loading: false, isAuthenticated: !!data });
      } catch (error: unknown) {
        setState({ loading: false, isAuthenticated: false });

        throw error;
      }
    },
    [service, setState]
  );

  const updateEmail = useCallback(
    async (oneTimeActionToken: string) => {
      try {
        setState({ loading: true });
        await service.updateEmail(oneTimeActionToken);
        setState({ loading: false });
      } catch (error: unknown) {
        setState({ loading: false });

        throw error;
      }
    },
    [service, setState]
  );

  const updatePassword = useCallback(
    async (oldPassword: string, newPassword: string) => {
      try {
        setState({ loading: true });
        await service.updatePassword(oldPassword, newPassword);
        setState({ loading: false });
      } catch (error: unknown) {
        setState({ loading: false });

        throw error;
      }
    },
    [service, setState]
  );

  const resetPassword = useCallback(
    async (oneTimeActionToken: string, password: string) => {
      try {
        setState({ loading: true, isAuthenticated: false });
        const data = await service.resetPassword(oneTimeActionToken, password);
        setState({ loading: false, isAuthenticated: !!data });
      } catch (error: unknown) {
        setState({ loading: false, isAuthenticated: false });

        throw error;
      }
    },
    [service, setState]
  );

  return (
    <AuthContext
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        login,
        initUser,
        updateEmail,
        updatePassword,
        resetPassword,
        logout,
        getToken
      }}>
      {children}
    </AuthContext>
  );
};
