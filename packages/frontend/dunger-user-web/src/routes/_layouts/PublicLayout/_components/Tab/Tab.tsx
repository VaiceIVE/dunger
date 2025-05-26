import { ReactNode } from 'react';
import { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

export interface TabProps extends Omit<NavLinkProps, 'style' | 'to' | 'onClick'> {
  style?: StyleXStyles;

  disabled?: boolean;

  to?: string;

  onClick?: () => void;
}

export function Tab({ style, children, disabled, onClick, to, ...props }: TabProps) {
  if (disabled || !to)
    return (
      <div {...stylex.props(styles.root, text.defaultSemibold, style)} onClick={onClick} aria-disabled={disabled}>
        {children as ReactNode}
      </div>
    );

  return (
    <NavLink {...props} to={to} onClick={onClick} {...stylex.props(styles.root, text.defaultSemibold, style)}>
      {children}
    </NavLink>
  );
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':is(:hover):not(:is([aria-disabled=true]), .active)': colors.backgroundUniversal,
      ':is(.active)': colors.backgroundOrangeDefault,
      ':is([aria-disabled=true])': colors.backgroundNeutralDefault
    },
    borderRadius: 0,
    color: {
      default: colors.textPrimaryDefault,
      ':is(:hover):not(:is([aria-disabled=true]), .active)': colors.textPrimaryHover,
      ':is(.active)': colors.brand80,
      ':is([aria-disabled=true])': colors.black30
    },
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 24px',
    transition: 'all 0.2s',
    width: '100%'
  }
});
