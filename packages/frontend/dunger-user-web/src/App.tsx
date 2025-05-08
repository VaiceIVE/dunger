import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { AuthFetchProvider, ErrorBoundary } from '@dunger/auth-fetch';
import { router } from 'routes/router';
import { apiUrl } from 'store/config';
import { queryClient } from 'store/queryClient';
import { UserProvider } from 'store/user';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthFetchProvider apiUrl={apiUrl}>
        <UserProvider>
          <ErrorBoundary errorElement={() => <div>error</div>}>
            <Suspense>
              <RouterProvider router={router} />
            </Suspense>
          </ErrorBoundary>
        </UserProvider>
      </AuthFetchProvider>
    </QueryClientProvider>
  );
}
