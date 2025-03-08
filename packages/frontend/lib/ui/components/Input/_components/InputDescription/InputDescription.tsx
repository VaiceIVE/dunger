import { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
import { text } from '@utils/text';
import { colors } from 'tokens.stylex';

export interface InputDescriptionProps extends ComponentProps<'div'> {
  error?: string | null;
}

export const InputDescription = ({ children, error }: InputDescriptionProps) => {
  return <div {...stylex.props(styles.root, text.smallMedium, !!error && styles.error)}>{error ?? children}</div>;
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    color: colors.textSecondaryDefault,
    display: 'flex',
    gap: 4,
    marginTop: 6
  },
  error: {
    color: colors.textErrorDefault
  }
});
