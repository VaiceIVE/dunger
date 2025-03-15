import { PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { createPortal } from 'react-dom';
import { useSheetContext } from '../../Sheet.context';

export interface SheetContentProps extends PropsWithChildren {
  style?: StyleXStyles;
  shouldCloseOnClickOutside?: boolean;
}

export function SheetContent(props: SheetContentProps) {
  const { open, unmount } = useSheetContext();
  const [fragment, setFragment] = useState<DocumentFragment>();

  useLayoutEffect(() => {
    setFragment(new DocumentFragment());
  }, []);

  if (unmount === false) {
    return <SheetContentImpl {...props} />;
  }

  if (!open) {
    const frag = fragment as Element | undefined;
    return frag ? createPortal(<div>{props.children}</div>, frag) : null;
  }

  return <SheetContentImpl {...props} />;
}

function SheetContentImpl({ style, children, shouldCloseOnClickOutside = true }: SheetContentProps) {
  const { open, setOpen } = useSheetContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node | null;

      if (!target?.isConnected) {
        return;
      }

      if (shouldCloseOnClickOutside) {
        if (ref.current && !ref.current.contains(target)) {
          setOpen(false);
        }
      }
    };

    let active = true;
    setTimeout(() => {
      if (active) {
        window.addEventListener('click', handleClick);
      }
    }, 0);

    return () => {
      active = false;
      window.removeEventListener('click', handleClick);
    };
  }, [open, setOpen, shouldCloseOnClickOutside]);

  const containerElement = document.getElementById('root');
  const element = (
    <aside {...stylex.props(styles.root, open && styles.open, style)} ref={ref}>
      {children}
    </aside>
  );

  if (!containerElement) {
    throw new Error('Your app must has #root element');
  }

  return <>{createPortal(element, containerElement)}</>;
}

const styles = stylex.create({
  root: {
    backgroundColor: 'white',
    // height: stylex.firstThatWorks('100svh', '100vh'),
    bottom: 0,
    boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.03);',
    overflowBehavior: 'contain',
    overflowY: 'auto',
    padding: {
      default: '24px 16px',
      '@media (min-width: 540px)': '40px 32px'
    },
    position: 'fixed',
    // right: {
    //   default: '-100%',
    //   '@media (min-width: 540px)': -480
    // },
    right: '-100%',
    top: 0,
    // TODO анимация временно отключена
    // transition: 'right 0.2s ease-out 0s, visibility 0s linear 0.2s',
    visibility: 'hidden',
    width: {
      default: '100%',
      '@media (min-width: 540px)': 480
    },
    zIndex: 200
  },
  open: {
    right: 0,
    visibility: 'visible'
    // transition: 'right 0.2s ease-out 0s, visibility 0s linear 0s'
  }
});
