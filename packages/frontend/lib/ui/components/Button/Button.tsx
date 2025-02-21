import { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { colors } from '@dunger/ui/tokens.stylex';
import { text } from '../../utils/text';
import { Spinner } from '../Spinner';
import { ButtonSize, ButtonVariant, ButtonWidth } from './Button.types';

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
  size = ButtonSize.md,
  loading,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      {...stylex.props(styles.base, text.defaultMedium, styles[variant], styles[size], styles[width], style)}
      {...props}>
      {loading ? <Spinner /> : children}
    </Component>
  );
}

const styles = stylex.create({
  base: {
    alignItems: 'center',
    appearance: 'none',
    borderStyle: 'none',
    borderWidth: 2,
    boxSizing: 'border-box',
    cursor: {
      default: 'pointer',
      ':disabled': 'default'
    },
    display: 'inline-flex',
    gap: 10,
    justifyContent: 'center',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.2s',
    userSelect: 'none',
    verticalAlign: 'top',
    whiteSpace: 'nowrap'
  },
  // variants
  primary: {},
  secondary: {},
  accent: {
    backgroundColor: {
      default: colors.buttonAccentDefault,
      ':not(:disabled):hover': colors.buttonAccentHover,
      ':not(:disabled):active': colors.buttonAccentActive,
      ':disabled': colors.backgroundNeutralDefault
    },
    color: {
      default: 'white',
      ':disabled': colors.black30
    }
  },
  accentSecondary: {
    backgroundColor: {
      default: colors.buttonSecondaryAccentDefault,
      ':not(:disabled):hover': colors.buttonSecondaryAccentHover,
      ':not(:disabled):active': colors.buttonSecondaryAccentActive,
      ':disabled': colors.backgroundNeutralDefault
    },
    color: {
      default: colors.brand90,
      ':not(:disabled):hover': colors.brand70,
      ':not(:disabled):active': colors.brand80,
      ':disabled': colors.black30
    }
  },
  // size
  lg: {},
  md: {
    borderRadius: 8,
    height: 44,
    padding: '12px 24px'
  },
  sm: {},
  full: {
    width: '100%'
  },
  fit: {
    width: 'fit-content'
  }
});
