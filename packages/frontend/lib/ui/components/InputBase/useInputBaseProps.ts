import { InputBaseProps } from './InputBase';

export const useInputBaseProps = (props: InputBaseProps) => {
  const { rightSection, leftSection, size, style, description, label, inputWrapperOrder, required, children, ...rest } =
    props;

  return {
    inputProps: { rightSection, leftSection, size, style, ...rest },
    wrapperProps: { description, label, inputWrapperOrder, required, size, children }
  };
};
