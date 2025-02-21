import { createOptionalContext } from '../../../../utils/createOptionalContext';
import { InputSize } from '../../types';

interface InputWrapperContextValue {
  size: InputSize;
}

export const [InputWrapperProvider, useInputWrapper] = createOptionalContext<InputWrapperContextValue>({
  size: InputSize.md
});
