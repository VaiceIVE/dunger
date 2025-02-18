import { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';

export interface ContainerProps extends Omit<ComponentProps<'div'>, 'style'> {
  style?: StyleXStyles;

  asChild?: boolean;
}

export function Container({ children, style, asChild }: ContainerProps) {
  const Component = asChild ? Slot : 'div';

  return <Component {...stylex.props(styles.root, style)}>{children}</Component>;
}

const styles = stylex.create({
  root: {
    marginHorizontal: 'auto',
    maxWidth: '1077px',
    padding: {
      default: '32px 0'
    },
    width: '100%'
  }
});
