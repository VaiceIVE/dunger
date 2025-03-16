import { ReactNode } from 'react';
import { createSafeContext } from '@dunger/ui/utils/createSafeContext';

export interface ModalContextValue {
  open: () => void;

  close: () => void;

  withOverlay: boolean;

  withCloseButton: boolean;

  children?: ReactNode;
}

export const [ModalProvider, useModalContext] = createSafeContext<ModalContextValue>(
  'Modal component was not found in tree'
);
