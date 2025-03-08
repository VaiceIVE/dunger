import { PropsWithChildren } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';

export interface SheetHeaderProps extends PropsWithChildren {
  style?: StyleXStyles;
}

export function SheetHeader({ children, style }: SheetHeaderProps) {
  return <div {...stylex.props(styles.base, style)}>{children}</div>;
}

const styles = stylex.create({
  base: {
    marginBottom: 32
  }
});
