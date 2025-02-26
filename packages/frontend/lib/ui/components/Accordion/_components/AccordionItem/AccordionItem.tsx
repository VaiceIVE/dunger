import { ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { AccordionItemProvider } from '../../AccordionItem.context';

export interface AccordionItemProps {
  value: string;
  children?: ReactNode;
}

export const AccordionItem = ({ children, value }: AccordionItemProps) => {
  return (
    <AccordionItemProvider value={{ value }}>
      <div {...stylex.props(styles.root)}>{children}</div>
    </AccordionItemProvider>
  );
};

const styles = stylex.create({
  root: {
    // eslint-disable-next-line @stylexjs/valid-styles
    overflowY: 'clip',
    width: '100%'
  }
});
