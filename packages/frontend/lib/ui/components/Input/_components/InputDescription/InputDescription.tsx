import { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';

export type InputDescriptionProps = ComponentProps<'div'>;

export const InputDescription = ({ children }: InputDescriptionProps) => {
  return <div {...stylex.props(styles.root)}>{children}</div>;
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    gap: 4,
    marginTop: 8
  }
});
