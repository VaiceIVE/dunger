import { createSafeContext } from '@dunger/ui';

export interface SplitViewLayoutContextValue {
  isLayoutSplit: boolean;
}

export const [SplitViewLayoutProvider, useSplitViewLayoutContext] = createSafeContext<SplitViewLayoutContextValue>(
  'SplitViewLayout component was not found in tree'
);
