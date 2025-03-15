import { ComboboxItem } from '../Combobox.types';

export function getOptionsLockup(options: ComboboxItem[]): Record<string, ComboboxItem> {
  return options.reduce<Record<string, ComboboxItem>>((acc, item) => {
    acc[item.value] = item;

    return acc;
  }, {});
}
