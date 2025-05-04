import { useCallback, useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@dunger/auth-fetch';
import { LogoHorizontal, Modal, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { LoginForm } from './_components/LoginForm';
import { RegisterForm } from './_components/RegisterForm';

export const AuthModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const authView = searchParams.get('auth'); // 'login' | 'register' | null

  const open = authView === 'login' || authView === 'register';

  const closeModal = useCallback(() => {
    searchParams.delete('auth');
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleChangeAuthView = (authView: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('auth', authView);
    void navigate(`?${newParams.toString()}`, { replace: false });
  };

  useEffect(() => {
    if (isAuthenticated) closeModal();
  }, [closeModal, isAuthenticated]);

  if (!open || isAuthenticated) return null;

  return (
    <Modal
      open
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}>
      <Modal.Content>
        <Stack align="center" gap={32} style={styles.root}>
          <LogoHorizontal />
          {authView === 'login' && <LoginForm />}
          {authView === 'register' && <RegisterForm />}
          {authView === 'login' ? (
            <div {...stylex.props(text.defaultMedium)}>
              Нет аккаунта?{' '}
              <span
                {...stylex.props(text.defaultSemibold, styles.button)}
                onClick={() => {
                  handleChangeAuthView('register');
                }}>
                Зарегистрироваться
              </span>
            </div>
          ) : (
            <div {...stylex.props(text.defaultMedium)}>
              Есть аккаунт?{' '}
              <span
                {...stylex.props(text.defaultSemibold, styles.button)}
                onClick={() => {
                  handleChangeAuthView('login');
                }}>
                Войти
              </span>
            </div>
          )}
        </Stack>
      </Modal.Content>
    </Modal>
  );
};

const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault
  },
  button: {
    color: colors.brand80,
    cursor: 'pointer'
  }
});
