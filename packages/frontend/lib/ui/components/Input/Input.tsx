import { ComponentProps, ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { text } from '@dunger/ui';
import { colors } from '../../tokens.stylex';
import { InputDescription } from './_components/InputDescription';
import { InputLabel } from './_components/InputLabel';
import { InputWrapper } from './_components/InputWrapper';
import { InputSize } from './types';

export interface InputProps extends Omit<ComponentProps<'input'>, 'size' | 'style'> {
  rightSection?: ReactNode;

  leftSection?: ReactNode;

  size?: InputSize;

  style?: StyleXStyles;

  // component?: 'input' | 'textarea';
}

export const Input = ({
  leftSection,
  rightSection,
  size = InputSize.md,
  style,
  value,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.input)}>
        {leftSection && (
          <div {...stylex.props(styles.leftSection)} data-position="left">
            {leftSection}
          </div>
        )}

        <input
          value={value}
          data-with-right-section={!!rightSection}
          data-with-left-section={!!leftSection}
          {...stylex.props(text.defaultMedium, styles.base, styles[size], style)}
          placeholder={placeholder}
          {...props}
        />
        {rightSection && (
          <div {...stylex.props(styles.rightSection)} data-position="right">
            {rightSection}
          </div>
        )}
      </div>
    </div>
  );
};

Input.Wrapper = InputWrapper;
Input.Label = InputLabel;
Input.Description = InputDescription;

const styles = stylex.create({
  root: {
    display: 'flex',
    gap: 0
  },
  input: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  },
  base: {
    alignItems: 'center',
    backgroundColor: {
      default: 'trasparent',
      ':active': colors.backgroundNeutralDefault
    },
    borderColor: {
      default: colors.outlinePrimaryDefault,
      ':focus-visible': colors.brand80,
      ':hover': colors.outlinePrimaryHover
    },
    borderStyle: 'solid',
    borderWidth: '1px',
    color: {
      default: colors.textPrimaryDefault,
      ':placeholder': colors.textSecondaryDefault
    },
    cursor: {
      default: 'pointer',
      ':disabled': 'default'
    },
    outline: 'none',
    overflow: 'hidden',
    position: 'relative',
    textOverflow: 'ellipsis',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    width: '100%'
  },
  leftSection: {
    left: 12,
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)'
  },
  rightSection: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translate(0, -50%)'
  },

  // sizes
  md: {
    borderRadius: 10,
    height: 40,
    paddingBlock: 10,
    paddingLeft: {
      default: 12,
      ':is([data-with-left-section=true])': 38
    },
    paddingRight: {
      default: 12,
      ':is([data-with-right-section=true])': 38
    }
  },
  lg: {}
});
