import { ComponentProps, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { createPortal } from 'react-dom';
import { colors } from 'tokens.stylex';
import { useComboboxContext } from '../../Combobox.context';

export interface ComboboxOptionsProps extends Omit<ComponentProps<'div'>, 'style'> {
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

function ComboboxOptionsImpl({ children, style, asChild, ...props }: ComboboxOptionsProps) {
  const { open, setOpen, targetElement } = useComboboxContext();
  const ref = useRef<HTMLDivElement>(null);
  const Component = asChild ? Slot : 'div';

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

  const styleProps = stylex.props(styles.root, style);
  const position = targetElement.getBoundingClientRect();

  // Прибавляется текущее положение скролла страницы
  const top = position.top + position.height + window.scrollY + 4;
  const left = position.left;

  const width = position.width;

  const element = (
    <Component
      {...styleProps}
      style={{
        ...styleProps.style,
        top,
        left,
        width
      }}
      ref={ref}
      data-state={open ? 'open' : 'closed'}
      {...props}>
      {children}
    </Component>
  );

  const containerElement = document.getElementById('root');
  if (!containerElement) {
    throw new Error('Your app must has #root element');
  }

  return <>{createPortal(element, containerElement)}</>;
}

const styles = stylex.create({
  root: {
    backgroundColor: 'white',
    borderColor: colors.outlineAccentDefault,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: '0px 4px 4px 0px #383E490A, 0px 8px 24px 0px #383E491F',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    visibility: {
      default: 'visible',
      ':not(:has(> [role="option"]))': 'hidden'
    },
    zIndex: 1
  }
});
