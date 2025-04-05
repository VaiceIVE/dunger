import { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';

interface LoadingOverlayProps extends Omit<ComponentProps<'div'>, 'style'> {
  style?: StyleXStyles;
  loading?: boolean;
  isLoader?: boolean;
}

export const LoadingOverlay = ({ loading, isLoader = true, style }: LoadingOverlayProps) => {
  return <div {...stylex.props(styles.root, loading && styles.visible, style)}>{isLoader && 'Loading...'}</div>;
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'none',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 100
  },
  visible: {
    display: 'flex'
  }
});
