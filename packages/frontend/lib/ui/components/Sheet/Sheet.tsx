import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { SheetClose } from './_components/SheetClose';
import { SheetContent } from './_components/SheetContent';
import { SheetFooter } from './_components/SheetFooter';
import { SheetHeader } from './_components/SheetHeader';
import { SheetOverlay } from './_components/SheetOverlay';
import { SheetTrigger } from './_components/SheetTrigger';
import { SheetProvider } from './Sheet.context';

export interface SheetProps {
  defaultOpen?: boolean;

  open?: boolean;

  onOpenChange?: (open: boolean) => void;
  /**
   * Отрисовывать оверлей пот открытии.
   * По умолчанию true
   */
  withOverlay?: boolean;
  /**
   * Удаление компонента из DOM при закрытии.
   * По умолчанию true
   */
  unmount?: boolean;
}

export function Sheet({
  children,
  defaultOpen,
  open: openProp,
  onOpenChange,
  withOverlay = true,
  unmount
}: PropsWithChildren<SheetProps>) {
  const [open, setOpenState] = useState(defaultOpen ?? openProp ?? false);

  useEffect(() => {
    if (typeof openProp === 'boolean') {
      setOpenState(openProp);
    }
  }, [openProp]);

  const setOpen = useCallback(
    (open: boolean) => {
      setOpenState(open);
      onOpenChange?.(open);
    },
    [onOpenChange]
  );

  return (
    <SheetProvider value={{ open, setOpen, unmount }}>
      {!!withOverlay && <SheetOverlay />}
      {children}
    </SheetProvider>
  );
}

Sheet.Trigger = SheetTrigger;
Sheet.Content = SheetContent;
Sheet.Header = SheetHeader;
Sheet.Overlay = SheetOverlay;
Sheet.Close = SheetClose;
Sheet.Footer = SheetFooter;
