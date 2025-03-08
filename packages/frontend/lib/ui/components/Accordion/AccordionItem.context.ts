import { createSafeContext } from '@utils/createSafeContext';

interface AccordionItemContext {
  value: string;
}

export const [AccordionItemProvider, useAccordionItemContext] = createSafeContext<AccordionItemContext>(
  'Accordion.Item component was not found in the tree'
);
