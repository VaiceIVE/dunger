import { PropsWithChildren, Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { InputSize } from '../../types';
import { InputDescription } from '../InputDescription';
import { InputLabel } from '../InputLabel';
import { InputWrapperProvider } from './InputWrapperContext';

export interface InputWrapperProps extends PropsWithChildren {
  description?: string;

  label?: string;

  inputWrapperOrder?: ('label' | 'input' | 'description')[];

  required?: boolean;

  style?: StyleXStyles;

  size?: InputSize;
}

export const InputWrapper = ({
  label,
  description,
  children,
  inputWrapperOrder = ['label', 'input', 'description'],
  required,
  style,
  size = InputSize.md
}: InputWrapperProps) => {
  const _input = <Fragment key="input">{children}</Fragment>;

  const _label = !!label && (
    <InputLabel key="label" required={required}>
      {label}
    </InputLabel>
  );

  const _description = !!description && <InputDescription key="description">{description}</InputDescription>;

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
    <InputWrapperProvider value={{ size }}>
      <div {...stylex.props(styles.root, style)}>{content}</div>
    </InputWrapperProvider>
  );
};

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    width: '100%'
  }
});
