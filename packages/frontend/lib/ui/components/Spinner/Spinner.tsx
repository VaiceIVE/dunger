import { ComponentProps } from 'react';
import { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import SpinnerIcon from './spinner.svg?react';

export interface SpinnerProps extends Omit<ComponentProps<'svg'>, 'style'> {
  style?: StyleXStyles;
}

export function Spinner({ style, ...props }: SpinnerProps) {
  return <SpinnerIcon {...stylex.props(styles.base, style)} {...props} />;
}

const rotate = stylex.keyframes({
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
});

const styles = stylex.create({
  base: {
    animationDuration: '0.7s',
    animationIterationCount: 'infinite',
    animationName: rotate,
    animationTimingFunction: 'linear'
  }
});
