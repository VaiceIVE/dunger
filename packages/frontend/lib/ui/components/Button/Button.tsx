import { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { colors } from '@dunger/ui/tokens.stylex';
import { fontFamily } from '@dunger/ui/utils/fontFamily.stylex';
import { ButtonSize, ButtonVariant, ButtonWidth } from './Button.types';
import { Spinner } from '../Spinner';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'style'> {
  style?: StyleXStyles;
  asChild?: boolean;
  width?: ButtonWidth;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  children,
  style,
  asChild,
  width = ButtonWidth.fit,
  variant = ButtonVariant.primary,
  size = ButtonSize.medium,
  loading,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component {...stylex.props(styles.base, styles[variant], styles[size], styles[width], style)} {...props}>
      {loading ? <Spinner /> : children}
    </Component>
  );
}

const styles = stylex.create({
  base: {
    alignItems: 'center',
    appearance: 'none',
    backgroundColor: {
      default: colors.buttonPrimaryDefault,
      ':not(:disabled):hover': colors.buttonPrimaryHover,
      ':not(:disabled):active': colors.buttonPrimaryActive,
      ':disabled': colors.buttonPrimaryActive
    },
    borderRadius: 8,
    borderWidth: 0,
    boxSizing: 'border-box',
    color: {
      default: colors.textInverse,
      ':disabled': colors.textTertiaryHover
    },
    cursor: {
      default: 'pointer',
      ':disabled': 'default'
    },
    display: 'inline-flex',
    fontFamily: fontFamily.base,
    fontSize: '14px',
    fontWeight: 600,
    gap: 10,
    height: 40,
    justifyContent: 'center',
    lineHeight: 'normal',
    padding: '0 24px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    userSelect: 'none',
    verticalAlign: 'top',
    whiteSpace: 'nowrap'
  },
  // variants
  primary: {
    boxShadow: 'none'
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: {
      default: colors.outlinePrimaryDefault,
      ':not(:disabled):hover': colors.outlinePrimaryHover,
      ':not(:disabled):active': colors.outlinePrimaryHover,
      ':disabled': 'transparent'
    },
    borderStyle: 'solid',
    borderWidth: '2px',
    color: {
      default: colors.textPrimaryDefault,
      ':disabled': colors.textTertiaryHover
    }
  },

  // size
  large: {
    borderRadius: 12,
    fontSize: '18px',
    height: 60,
    lineHeight: '24px',
    padding: '0 32px'
  },
  medium: {
    borderRadius: 10,
    fontSize: '16px',
    height: 48,
    lineHeight: '24px',
    padding: '0 24px'
  },
  small: {
    borderRadius: 8,
    fontSize: '14px',
    height: 36,
    lineHeight: '20px',
    padding: '0 16px'
  },
  full: {
    width: '100%'
  },
  fit: {
    width: 'fit-content'
  }
});
