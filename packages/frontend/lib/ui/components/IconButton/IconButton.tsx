import { ComponentProps } from 'react';
import { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import { colors } from '@dnd/ui/tokens.stylex';
import { IconButtonVariant } from './IconButton.types';

export interface IconButtonProps extends Omit<ComponentProps<'button'>, 'style'> {
  style?: StyleXStyles;
  variant?: IconButtonVariant;
}

export const IconButton = ({ children, style, variant = IconButtonVariant.outline, ...props }: IconButtonProps) => {
  return (
    <button {...stylex.props(styles.iconButton, styles[variant], style)} {...props}>
      {children}
    </button>
  );
};

// TODO - добавить другие версии кнопки
const styles = stylex.create({
  iconButton: {
    alignItems: 'center',
    borderRadius: 10,
    borderStyle: 'none',
    cursor: 'pointer',
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    padding: 12,
    width: 48
  },
  ghost: {
    backgroundColor: {
      default: 'transparent',
      // ':not(:disabled):hover': colors.backgroundPrimaryHover,
      // ':not(:disabled):active': colors.backgroundPrimaryActive,
      ':disabled': 'transparent'
    },
    color: {
      default: colors.textSecondaryDefault
      //':disabled': colors.textDisabled
    }
  },
  outline: {
    backgroundColor: 'transparent',
    color: {
      default: colors.textSecondaryDefault
      //':disabled': colors.textDisabled
    },
    outlineColor: {
      // default: colors.dividerSubtlePrimary,
      // ':not(:disabled):hover': colors.dividerSubtleHover,
      // ':not(:disabled):active': colors.dividerSubtleActive,
      // ':disabled': colors.dividerMiscDisabled
    },
    outlineStyle: 'solid',
    outlineWidth: '2px'
  }
});
