import { Suspense } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Outlet } from 'react-router-dom';
import { Spinner, Stack } from '@dunger/ui';
import { AuthModal } from 'features/AuthModal';
import { SideBar } from './_components/SideBar';

export function PublicLayout() {
  return (
    <Suspense
      fallback={
        <Stack style={styles.loader} align="center" justify="center">
          <Spinner size="lg" />
        </Stack>
      }>
      <AuthModal />
      <div {...stylex.props(styles.root)}>
        <SideBar />
        <div {...stylex.props(styles.content)}>
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
}

const styles = stylex.create({
  root: {
    display: 'flex',
    gap: 0,
    width: '100%'
  },
  content: {
    flex: '1'
  },
  loader: {
    height: '100dvh'
  }
});
