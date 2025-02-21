import { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';

export interface InputLabelProps extends ComponentProps<'div'> {
  required?: boolean;

  labelElement?: 'label' | 'div';
}

export const InputLabel = ({ children, required, labelElement = 'label' }: InputLabelProps) => {
  const Component = labelElement;

  return (
    <Component {...stylex.props(styles.root)}>
      {children} {required && <div {...stylex.props(styles.required)}>*</div>}
    </Component>
  );
};

const styles = stylex.create({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: 4,
    marginBottom: 8
  },
  required: {}
});
