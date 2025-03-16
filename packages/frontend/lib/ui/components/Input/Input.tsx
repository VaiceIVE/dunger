import { ComponentProps, FormEventHandler, ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { text } from '@dunger/ui';
import { DungerSize } from '@dunger/ui/styles/DungerSize';
import { colors } from '../../tokens.stylex';
import { InputDescription } from './_components/InputDescription';
import { InputLabel } from './_components/InputLabel';
import { InputWrapper, useInputWrapper } from './_components/InputWrapper';

export interface InputProps extends Omit<ComponentProps<'input'>, 'size' | 'style'> {
  rightSection?: ReactNode;

  leftSection?: ReactNode;

  size?: Extract<DungerSize, 'md' | 'lg'>;

  style?: StyleXStyles;

  // component?: 'input' | 'textarea';
}

export const Input = ({
  leftSection,
  rightSection,
  size = 'md',
  style,
  value,
  placeholder,
  onInput,
  required,
  ...props
}: InputProps) => {
  const ctx = useInputWrapper();

  const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
    ctx?.setError(null);
    onInput?.(e);
  };

  const handleInvalid: FormEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    const validity = e.currentTarget.validity;
    const customError = ctx?.validate?.(e.currentTarget.value, validity);

    if (customError) {
      ctx?.setError(customError);
    } else if (validity.valueMissing) {
      ctx?.setError('Обязательное поле');
    } else if (!validity.valid) {
      ctx?.setError('Поле заполнено неправильно');
    }
  };

  return (
    <div {...stylex.props(styles.root)}>
      {leftSection && (
        <div {...stylex.props(styles.leftSection)} data-position="left">
          {leftSection}
        </div>
      )}

      <input
        onInvalid={handleInvalid}
        onInput={handleInput}
        value={value}
        required={required}
        data-with-right-section={!!rightSection}
        data-with-left-section={!!leftSection}
        aria-invalid={!!ctx?.error}
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
  );
};

Input.Wrapper = InputWrapper;
Input.Label = InputLabel;
Input.Description = InputDescription;

const styles = stylex.create({
  root: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  },
  base: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':focus': colors.backgroundUniversal,
      ':active': colors.backgroundUniversal
    },
    borderColor: {
      default: colors.outlinePrimaryDefault,
      ':is([aria-invalid=true])': colors.textErrorDefault,
      ':is([aria-invalid=true]):hover': colors.textErrorHover,
      ':is([aria-invalid=true]):focus': colors.textErrorActive,
      ':hover': colors.outlineAccentHover,
      ':focus': colors.brand80
    },
    borderStyle: 'solid',
    borderWidth: '1px',
    color: {
      default: colors.textPrimaryDefault,
      '::placeholder': colors.textSecondaryDefault
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
    alignItems: 'center',
    color: colors.textTertiaryDefault,
    display: 'flex',
    justifyContent: 'center',
    left: 12,
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    zIndex: 1
  },
  rightSection: {
    alignItems: 'center',
    color: colors.textTertiaryDefault,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translate(0, -50%)',
    zIndex: 1
  },

  // sizes
  md: {
    borderRadius: 10,
    height: 44,
    paddingBlock: 12,
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
