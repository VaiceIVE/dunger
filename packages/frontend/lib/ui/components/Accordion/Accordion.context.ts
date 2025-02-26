import { createSafeContext } from '../../utils/createSafeContext';

export interface IAccordionContext {
  isItemActive: (itemValue: string) => boolean;

  transitionDuration?: number;

  onChange: (itemValue: string) => void;
}
export const [AccordionProvider, useAccordionContext] = createSafeContext<IAccordionContext>(
  'Accordion component was not found in the tree'
);
