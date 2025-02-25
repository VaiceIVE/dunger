import { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useCollapse } from './useCollapse';

interface CollapseProps extends ComponentProps<'div'> {
  asChild?: boolean;

  /** Opened state */
  in: boolean;

  /** Called each time transition ends */
  onTransitionEnd?: () => void;

  /** Transition duration in ms, `200` by default */
  transitionDuration?: number;

  /** Transition timing function, default value is `ease` */
  transitionTimingFunction?: string;

  /** Determines whether opacity should be animated, `true` by default */
  animateOpacity?: boolean;
}

export const Collapse = ({
  asChild,
  children,
  in: opened,
  transitionDuration = 200,
  transitionTimingFunction = 'ease',
  onTransitionEnd,
  animateOpacity,
  ref,
  ...props
}: CollapseProps) => {
  const Component = asChild ? Slot : 'div';

  const getCollapseProps = useCollapse({
    opened,
    transitionDuration,
    transitionTimingFunction,
    onTransitionEnd
  });

  if (transitionDuration === 0) {
    return <Component {...props}>{children}</Component>;
  }

  return (
    <Component
      {...getCollapseProps({
        ref,
        style: {
          opacity: opened || !animateOpacity ? 1 : 0,
          transition: animateOpacity ? `opacity ${transitionDuration.toString()}ms ${transitionTimingFunction}` : 'none'
        },
        ...props
      })}>
      {children}
    </Component>
  );
};
