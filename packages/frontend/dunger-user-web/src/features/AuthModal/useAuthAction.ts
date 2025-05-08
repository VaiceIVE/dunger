import { useState } from 'react';
import { DungerError, useAuth } from '@dunger/auth-fetch';
import { HttpStatus } from '@dunger/common-enums';

export const useAuthAction = () => {
  const { login, initUser, loading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const loginAction = async (formData: FormData) => {
    if (loading) return;

    const username = (formData.get('username') as string).toString();
    const password = (formData.get('password') as string).toString();

    if (!username || !password) return;

    try {
      await login(username, password);
    } catch (error) {
      let authError: string;

      if (error instanceof DungerError) {
        switch (error.body.statusCode) {
          case HttpStatus.BAD_REQUEST:
          case HttpStatus.FORBIDDEN:
          case HttpStatus.NOT_FOUND:
            authError = 'Неверная почта или пароль';
            break;
          default:
            authError = 'Неизвестная ошибка';
        }
      } else {
        authError = 'Неизвестная ошибка';
      }

      setLoginError(authError);
    }
  };

  const registerAction = async (formData: FormData) => {
    if (loading) return;

    const username = (formData.get('username') as string).toString();
    const email = (formData.get('email') as string).toString();
    const password = (formData.get('password') as string).toString();
    const passwordConfirmation = (formData.get('passwordConfirmation') as string).toString();

    if (passwordConfirmation !== password) {
      setRegistrationError('Пароли не совпадают');
      return;
    }

    try {
      const user = {
        email,
        username,
        password
      };

      await initUser(user);
    } catch (error: unknown) {
      let initUserError: string | undefined;
      if (error instanceof DungerError) {
        switch (error.body.statusCode) {
          case HttpStatus.CONFLICT:
            initUserError = 'Пользователь с таким email уже зарегистрирован';
            break;
          case HttpStatus.NOT_FOUND:
            initUserError = 'Почта не подтверждена';
            break;
          case HttpStatus.BAD_REQUEST:
            initUserError = 'Пароль не соответствует требованиям';
            break;
          default:
            initUserError = 'Неизвестная ошибка';
        }
      } else {
        initUserError = 'Неизвестная ошибка';
      }

      setRegistrationError(initUserError);
    }
  };

  return {
    loginAction,
    registrationError,
    registerAction,
    loginError,
    loading
  };
};
