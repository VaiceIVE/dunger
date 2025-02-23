import { Suspense } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Outlet } from 'react-router-dom';
import { SideBar } from './_components/SideBar';

export function UserLayout() {
  //const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <Navigate to={'/sign-in'} replace />;
  // }

  /**
   * TODO
   * ErrorBoundary
   * UserProvider
   */

  return (
    <Suspense fallback={'Loading...'}>
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
  }
});
