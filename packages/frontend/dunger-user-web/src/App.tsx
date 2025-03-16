import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { AuthFetchProvider } from '@dunger/auth-fetch';
import { router } from 'routes/router';
import { apiUrl, authUrl, basename } from 'store/config';
import { queryClient } from 'store/queryClient';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthFetchProvider basename={basename} authUrl={authUrl} apiUrl={apiUrl}>
        <Suspense>
          <RouterProvider router={router} />
        </Suspense>
      </AuthFetchProvider>
    </QueryClientProvider>
  );
}
