import { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';

export interface GridColProps extends Omit<ComponentProps<'div'>, 'style'> {
  span?: number;

  style?: StyleXStyles;
}

export const GridCol = ({ children, span = 1, style, ...props }: GridColProps) => {
  return (
    <div {...props} {...stylex.props(styles.root(span), style)}>
      {children}
    </div>
  );
};

const styles = stylex.create({
  root: (span: number) => ({
    gridColumn: `span ${span.toString()}`
  })
});
