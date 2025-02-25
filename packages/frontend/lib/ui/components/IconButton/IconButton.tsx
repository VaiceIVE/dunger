import { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import { colors } from '@dunger/ui/tokens.stylex';
import { IconButtonVariant } from './IconButton.types';

export interface IconButtonProps extends Omit<ComponentProps<'button'>, 'style'> {
  style?: StyleXStyles;

  variant?: IconButtonVariant;

  asChild?: boolean;
}

export const IconButton = ({
  children,
  style,
  asChild,
  variant = IconButtonVariant.primary,
  ...props
}: IconButtonProps) => {
  const Component = asChild ? Slot : 'button';

  return (
    <Component {...stylex.props(styles.iconButton, styles[variant], style)} {...props}>
      {children}
    </Component>
  );
};

const styles = stylex.create({
  iconButton: {
    alignItems: 'center',
    borderRadius: 8,
    borderStyle: 'none',
    cursor: 'pointer',
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    padding: 6,
    transition: 'all 0.2s',
    width: 32
  },
  // variants
  primary: {
    backgroundColor: {
      default: colors.backgroundNeutralDefault,
      ':not(:disabled):hover': colors.backgroundNeutralHover,
      ':not(:disabled):active, :is([aria-selected=true])': colors.backgroundNeutralActive
      // ':disabled': colors.
    },
    color: {
      default: colors.textSecondaryDefault,
      ':not(:disabled):hover': colors.textSecondaryHover,
      ':not(:disabled):active': colors.textSecondaryActive
      // ':disabled': colors.
    }
  },
  ghost: {
    backgroundColor: {
      default: 'transparent',
      ':not(:disabled):hover': colors.backgroundNeutralHover,
      ':not(:disabled):active, :is([aria-selected=true])': colors.backgroundNeutralActive
      // ':disabled': colors.
    },
    color: {
      default: colors.textSecondaryDefault,
      ':not(:disabled):hover': colors.textSecondaryHover,
      ':not(:disabled):active': colors.textSecondaryActive
      // ':disabled': colors.
    }
  }
});
