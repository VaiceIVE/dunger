import { ComponentProps, CSSProperties } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { GridCol } from './_components/GridCol';

export interface GridProps extends Omit<ComponentProps<'div'>, 'style'> {
  gutter?: number;

  grow?: boolean;

  justify?: CSSProperties['justifyContent'];

  align?: CSSProperties['alignItems'];

  columns?: number;

  overflow?: CSSProperties['overflow'];

  /**
   * TODO
   * breakpoints?: GridBreakpoints;
   */

  style?: StyleXStyles;
}

export const Grid = ({
  children,
  gutter = 10,
  grow = false,
  justify = 'flex-start',
  align = 'center',
  columns = 12,
  overflow = 'unset',
  style
}: GridProps) => {
  return (
    <div {...stylex.props(styles.root(gutter, columns, overflow, justify, align, grow ? 1 : 0), style)}>{children}</div>
  );
};

Grid.Col = GridCol;

const styles = stylex.create({
  root: (gap: number, columns: number, overflow: string, justifyContent, alignItems, flexGrow: number) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns.toString()}, 1fr)`,
    gap,
    justifyContent,
    alignItems,
    overflow,
    flexGrow
  })
});
