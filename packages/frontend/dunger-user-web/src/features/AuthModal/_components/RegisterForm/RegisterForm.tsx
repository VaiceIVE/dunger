import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Button, ButtonVariant, ButtonWidth, ShowPasswordButton, Stack, TextInput } from '@dunger/ui';
import { emailPattern } from 'utils/isValidEmail';
import { useAuthAction } from '../../useAuthAction';

export const RegisterForm = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [passwordConfirmationShown, setPasswordConfirmationShown] = useState<boolean>(false);

  const { registerAction, loading } = useAuthAction();

  return (
    <form action={registerAction} {...stylex.props(styles.root)}>
      <Stack gap={24}>
        <TextInput
          pattern={emailPattern}
          type="email"
          label="Почта"
          placeholder="dunger_tech@gmail.com"
          name={'email'}
          required
        />
        <TextInput label="Придумайте логин" placeholder="@dunger" name={'username'} required />
        <TextInput
          type={passwordShown ? 'text' : 'password'}
          autoComplete={'new-password'}
          name={'password'}
          placeholder="*********"
          label="Придумайте пароль"
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
        <TextInput
          type={passwordConfirmationShown ? 'text' : 'password'}
          name={'passwordConfirmation'}
          placeholder="*********"
          label="Повторите пароль"
          required
          rightSection={
            <ShowPasswordButton
              isPressed={passwordConfirmationShown}
              onClick={() => {
                setPasswordConfirmationShown((prevState) => !prevState);
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
