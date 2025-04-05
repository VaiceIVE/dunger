import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { createPortal } from 'react-dom';
import { colors } from '@dunger/ui/tokens.stylex';
import { InfiniteScroll, InfiniteScrollProps } from '../../../InfiniteScroll';
import { useComboboxContext } from '../../Combobox.context';

export interface ComboboxOptionsProps extends InfiniteScrollProps {
  asChild?: boolean;

  style?: StyleXStyles;
}

export function ComboboxOptions(props: ComboboxOptionsProps) {
  const { open } = useComboboxContext();
  const [fragment, setFragment] = useState<DocumentFragment>();

  useLayoutEffect(() => {
    setFragment(new DocumentFragment());
  }, []);

  if (!open) {
    const frag = fragment as Element | undefined;
    return frag ? createPortal(<div>{props.children}</div>, frag) : null;
  }

  return <ComboboxOptionsImpl {...props} />;
}

function ComboboxOptionsImpl({ children, style, ...props }: ComboboxOptionsProps) {
  const { open, setOpen, targetElement } = useComboboxContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;

      if (!target?.isConnected) {
        return;
      }

      if (ref.current && !ref.current.contains(target) && !targetElement?.contains(target)) {
        setOpen(false);
      }
    };

    let active = true;
    setTimeout(() => {
      if (active) {
        window.addEventListener('mousedown', handleClick);
        window.addEventListener('touchstart', handleClick);
      }
    }, 0);

    return () => {
      active = false;
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('touchstart', handleClick);
    };
  });

  if (!targetElement) {
    throw new Error('There must be a target element');
  }
  const position = targetElement.getBoundingClientRect();

  // Прибавляется текущее положение скролла страницы
  const top = position.top + position.height + window.scrollY + 4;
  const left = position.left;

  const width = position.width;

  const element = (
    <InfiniteScroll
      {...stylex.props(styles.root(top, left, width), style)}
      ref={ref}
      data-state={open ? 'open' : 'closed'}
      {...props}>
      {children}
    </InfiniteScroll>
  );

  const containerElement = document.getElementById('root');
  if (!containerElement) {
    throw new Error('Your app must has #root element');
  }

  return <>{createPortal(element, containerElement)}</>;
}

const styles = stylex.create({
  root: (top: number | string, left: number, width: number | string) => ({
    backgroundColor: 'white',
    borderColor: colors.outlineAccentDefault,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: '0px 4px 4px 0px #383E490A, 0px 8px 24px 0px #383E491F',
    left,
    maxHeight: 176,
    overflow: 'hidden',
    overflowY: 'auto',
    position: 'absolute',
    top,
    visibility: { default: 'visible', ':not(:has(> [role="option"]))': 'hidden' },
    width,
    zIndex: 1,
    '::-webkit-scrollbar': { background: 'transparent', display: 'none', height: 0, width: 0 }
  })
});
