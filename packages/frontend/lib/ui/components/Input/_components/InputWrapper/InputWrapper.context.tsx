import { DungerSize } from '@dunger/ui/styles/DungerSize';
import { createOptionalContext } from '@dunger/ui/utils/createOptionalContext';

interface InputWrapperContextValue {
  size: Extract<DungerSize, 'md' | 'lg'>;

  error: string | null;

  setError: (error: string | null) => void;

  // custom validation function => errorMessage || null
  validate?: (value: string, validity: ValidityState) => string | null;
}

export const [InputWrapperProvider, useInputWrapper] = createOptionalContext<InputWrapperContextValue>({
  size: 'md',
  error: '',
  setError: () => null
});
