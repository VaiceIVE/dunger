import { DungerSize } from '@styles/DungerSize';
import { createOptionalContext } from '@utils/createOptionalContext';

interface InputWrapperContextValue {
  size: Extract<DungerSize, 'md' | 'lg'>;
}

export const [InputWrapperProvider, useInputWrapper] = createOptionalContext<InputWrapperContextValue>({
  size: 'md'
});
