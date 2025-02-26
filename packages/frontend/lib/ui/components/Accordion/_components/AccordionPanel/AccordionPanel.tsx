import { ComponentProps } from 'react';
import { Collapse } from '@components/Collapse';
import { StyleXStyles } from '@stylexjs/stylex';
import { useAccordionContext } from '../../Accordion.context';
import { useAccordionItemContext } from '../../AccordionItem.context';

export interface AccordionContentProps extends Omit<ComponentProps<'div'>, 'style' | 'onTransitionEnd'> {
  style?: StyleXStyles;

  onTransitionEnd?: () => void;
}

export const AccordionPanel = ({ children, ref, ...props }: AccordionContentProps) => {
  const ctx = useAccordionContext();
  const { value } = useAccordionItemContext();

  return (
    <Collapse
      ref={ref}
      {...props}
      in={ctx.isItemActive(value)}
      transitionDuration={ctx.transitionDuration ?? 200}
      role="region"
      id={value}>
      {children}
    </Collapse>
  );
};
