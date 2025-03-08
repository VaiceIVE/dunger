import { PropsWithChildren, Fragment, useState } from 'react';
import { DungerSize } from '@styles/DungerSize';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { InputDescription } from '../InputDescription';
import { InputLabel } from '../InputLabel';
import { InputWrapperProvider } from './InputWrapper.context';

export interface InputWrapperProps extends PropsWithChildren {
  description?: string;

  label?: string;

  inputWrapperOrder?: ('label' | 'input' | 'description')[];

  required?: boolean;

  style?: StyleXStyles;

  size?: Extract<DungerSize, 'md' | 'lg'>;

  // custom validation function => errorMessage || null
  validate?: (value: string, validity: ValidityState) => string | null;
}

export const InputWrapper = ({
  label,
  description,
  children,
  inputWrapperOrder = ['label', 'input', 'description'],
  required,
  style,
  validate,
  size = 'md'
}: InputWrapperProps) => {
  const [error, setError] = useState<string | null>(null);

  const _input = <Fragment key="input">{children}</Fragment>;

  const _label = !!label && (
    <InputLabel key="label" required={required}>
      {label}
    </InputLabel>
  );

  const _description = (!!description || !!error) && (
    <InputDescription error={error} key="description">
      {description}
    </InputDescription>
  );

  const content = inputWrapperOrder.map((part) => {
    switch (part) {
      case 'label':
        return _label;
      case 'input':
        return _input;
      case 'description':
        return _description;
      default:
        return null;
    }
  });

  return (
    <InputWrapperProvider value={{ size, error, setError, validate }}>
      <div {...stylex.props(styles.root, style)}>{content}</div>
    </InputWrapperProvider>
  );
};

const styles = stylex.create({
  root: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    gap: 0
  }
});
