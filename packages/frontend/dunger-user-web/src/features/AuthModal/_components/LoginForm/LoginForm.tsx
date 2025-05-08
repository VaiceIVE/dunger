import { FormEvent, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Button, ButtonVariant, ButtonWidth, ShowPasswordButton, Stack, TextInput } from '@dunger/ui';
import { useAuthAction } from '../../useAuthAction';

export const LoginForm = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const { loginAction, loading } = useAuthAction();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void loginAction(new FormData(e.currentTarget));
  };

  return (
    <form onSubmit={onSubmit} {...stylex.props(styles.root)}>
      <Stack gap={24}>
        <TextInput label="Логин" placeholder="@dunger" name={'username'} required />
        <TextInput
          type={passwordShown ? 'text' : 'password'}
          autoComplete={'current-password'}
          name={'password'}
          placeholder="*********"
          label="Пароль"
          required
          rightSection={
            <ShowPasswordButton
              isPressed={passwordShown}
              onClick={() => {
                setPasswordShown((prevState) => !prevState);
              }}
            />
          }
        />
      </Stack>
      <Button loading={loading} type="submit" variant={ButtonVariant.accent} width={ButtonWidth.full}>
        Войти
      </Button>
    </form>
  );
};

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    width: '100%'
  }
});
