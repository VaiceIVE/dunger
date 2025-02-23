import { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

export interface TabProps extends Omit<NavLinkProps, 'style'> {
  style?: StyleXStyles;
}

export function Tab({ style, children, ...props }: TabProps) {
  return (
    <NavLink {...props} {...stylex.props(styles.root, text.defaultSemibold, style)}>
      {children}
    </NavLink>
  );
}

const styles = stylex.create({
  root: {
    backgroundColor: {
      default: 'transparent',
      ':not(:disabled):hover': colors.backgroundNeutralHover,
      ':is(.active)': colors.backgroundNeutralHover,
      ':disabled': colors.backgroundNeutralDefault
    },
    borderRadius: 0,
    color: {
      default: colors.textPrimaryDefault,
      ':not(:disabled):hover': colors.textPrimaryHover,
      ':not(:disabled):active': colors.textPrimaryActive,
      ':is(.active)': colors.textPrimaryActive,
      ':disabled': colors.black30
    },
    justifyContent: 'flex-start',
    padding: '12px 24px',
    transition: 'all 0.2s',
    width: '100%'
  }
});
