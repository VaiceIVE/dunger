import { ComponentProps, ReactNode, useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { createPortal } from 'react-dom';
import { useUncontrolled } from '../../hooks/useUncontrolled';
import { XIcon } from '../Icon';
import { IconButton } from '../IconButton';
import { ModalProvider, useModalContext } from './Modal.context';

interface ModalProps {
  children?: ReactNode;

  withOverlay?: boolean;

  withCloseButton?: boolean;

  open?: boolean;

  onOpenChange?: (open: boolean) => void;
}

export const Modal = ({ withOverlay = true, withCloseButton = true, open, onOpenChange, ...props }: ModalProps) => {
  const [_open, setOpen] = useUncontrolled({
    value: open,
    defaultValue: false,
    finalValue: false,
    onChange: onOpenChange
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (_open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [_open]);

  return (
    <ModalProvider value={{ open: handleOpen, close: handleClose, withOverlay, withCloseButton, ...props }}>
      {_open && createPortal(<ModalContent />, document.body)}
    </ModalProvider>
  );
};

const ModalContent = () => {
  const ctx = useModalContext();

  return (
    <div {...stylex.props(styles.wrapper)} onClick={ctx.withOverlay ? ctx.close : undefined}>
      {ctx.withOverlay && <div {...stylex.props(styles.overlay)} />}
      <div
        {...stylex.props(styles.content)}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        {ctx.withCloseButton && (
          <IconButton style={styles.close} onClick={ctx.close}>
            <XIcon />
          </IconButton>
        )}
        {ctx.children}
      </div>
    </div>
  );
};

interface ModalBodyProps extends Omit<ComponentProps<'div'>, 'style'> {
  style: StyleXStyles;
}

const ModalBody = ({ style, children, ...props }: ModalBodyProps) => {
  return (
    <div {...props} {...stylex.props(style)}>
      {children}
    </div>
  );
};

/**
 * TODO:
 * Title
 * Header?
 * Overlay
 */
Modal.Body = ModalBody;

const styles = stylex.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    inset: 0,
    position: 'fixed',
    zIndex: 10
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    inset: 0,
    justifyContent: 'center',
    position: 'fixed',
    zIndex: 20
  },
  content: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    padding: 24,
    position: 'relative',
    width: '100%',
    zIndex: 10
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 20
  }
});
