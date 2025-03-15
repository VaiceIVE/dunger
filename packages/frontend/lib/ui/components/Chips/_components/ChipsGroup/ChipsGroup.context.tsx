import { createOptionalContext } from '@dunger/ui/utils/createOptionalContext';

interface ChipsGroupContextValue {
  value: string | string[];

  setValue: (value: string | string[]) => void;

  multiple?: boolean;
}

export const [ChipsGroupProvider, useChipsGroup] = createOptionalContext<ChipsGroupContextValue>({
  value: '',
  setValue: () => ({}),
  multiple: false
});
