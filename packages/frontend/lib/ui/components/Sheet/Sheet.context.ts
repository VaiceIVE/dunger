import { createSafeContext } from '@dunger/ui/utils/createSafeContext';

export interface SheetContext {
  open: boolean;
  setOpen: (open: boolean) => void;
  unmount?: boolean;
}

export const [SheetProvider, useSheetContext] = createSafeContext<SheetContext>(
  'Sheet component was not found in the tree'
);
