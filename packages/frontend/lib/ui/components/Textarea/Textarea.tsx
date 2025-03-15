import { ComponentProps, FormEventHandler, useEffect, useRef, useState } from 'react';
import { Input } from '@components/Input';
import { InputWrapperProps, useInputWrapper } from '@components/Input/_components/InputWrapper';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { text } from '@utils/text';
import { colors } from 'tokens.stylex';
import { autosizeTextarea } from './autosizeTextarea';

export type TextareaImplProps = InputWrapperProps & TextareaProps;

interface TextareaProps extends Omit<ComponentProps<'textarea'>, 'style'> {
  autosize?: boolean;

  maxRows?: number;

  minRows?: number;

  style?: StyleXStyles;
}

export const TextareaImpl = ({ label, description, required, validate, ...props }: TextareaImplProps) => {
  return (
    <Input.Wrapper label={label} description={description} required={required} validate={validate}>
      <Textarea {...props} required={required} />
    </Input.Wrapper>
  );
};

const Textarea = ({ autosize, maxRows, minRows, value, onInput, style, maxLength, ...props }: TextareaProps) => {
  const textareaRef = useRef<HTMLDivElement>(null);
  const ctx = useInputWrapper();

  const [charCount, setCharCount] = useState(value?.toString().length ?? 0);

  const handleInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    ctx?.setError(null);
    setCharCount(e.currentTarget.value.length);
    autosizeTextarea({ textareaRef, autosize, maxRows, minRows });
    onInput?.(e);
  };

  const handleInvalid: FormEventHandler<HTMLTextAreaElement> = (e) => {
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

  useEffect(() => {
    autosizeTextarea({ textareaRef, autosize, maxRows, minRows });
  }, [autosize, maxRows, minRows]);

  return (
    <div {...stylex.props(styles.root)} ref={textareaRef}>
      <div {...stylex.props(styles.textareaWrapper)}>
        <textarea
          maxLength={maxLength}
          onInput={handleInput}
          onInvalid={handleInvalid}
          aria-invalid={!!ctx?.error}
          value={value}
          {...stylex.props(text.defaultMedium, styles.textarea, style)}
          {...props}
        />
        {maxLength && (
          <div {...stylex.props(text.captionMedium, styles.length)}>
            {charCount.toString()}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 72
  },
  textareaWrapper: {
    height: '100%',
    position: 'relative'
  },
  textarea: {
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
    borderRadius: 10,
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
    height: '100%',
    outline: 'none',
    padding: 12,
    position: 'relative',
    resize: 'none',
    scrollbarWidth: 'none',
    transition: 'all 0.2s',
    width: '100%',
    '::-webkit-scrollbar': {
      display: 'none'
    }
  },
  length: {
    bottom: 12,
    color: colors.textTertiaryDefault,
    position: 'absolute',
    right: 12
  }
});
