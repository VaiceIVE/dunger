import { ComponentProps, MouseEvent } from 'react';
import { useSheetContext } from '@components/Sheet/Sheet.context';
import { Slot } from '@radix-ui/react-slot';
import { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';

export interface SheetCloseProps extends Omit<ComponentProps<'button'>, 'style'> {
  style?: StyleXStyles;
  asChild?: boolean;
}

export function SheetClose({ children, style, asChild, onClick }: SheetCloseProps) {
  const { setOpen } = useSheetContext();
  const Component = asChild ? Slot : 'button';

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
    onClick?.(e);
  };

  return (
    <Component {...stylex.props(style)} onClick={handleClick}>
      {children}
    </Component>
  );
}
