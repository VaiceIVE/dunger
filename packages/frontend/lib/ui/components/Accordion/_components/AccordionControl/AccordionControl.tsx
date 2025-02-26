import { MouseEvent, ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { useAccordionContext } from '../../Accordion.context';
import { useAccordionItemContext } from '../../AccordionItem.context';

export interface AccordionControlProps extends Omit<ComponentProps<'div'>, 'style'> {
  style?: StyleXStyles;
}

export const AccordionControl = ({ children, onClick, style }: AccordionControlProps) => {
  const { onChange } = useAccordionContext();
  const { value } = useAccordionItemContext();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    onChange(value);
    onClick?.(e);
  };

  return (
    <div {...stylex.props(styles.root)} onClick={handleClick}>
      <div {...stylex.props(styles.children, style)}>{children}</div>
    </div>
  );
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    borderStyle: 'none',
    cursor: 'pointer',
    display: 'flex',
    gap: 20,
    justifyContent: 'space-between',
    paddingBlock: '14px',
    paddingInline: '0',
    width: '100%'
  },
  children: {
    display: 'flex',
    minWidth: 0,
    width: '100%'
  }
});
