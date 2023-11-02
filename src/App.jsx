import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense } from 'react';
import Spinner from './components/Spinner';
import router from './routes';

const querClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 30 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={querClient}>
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </Suspense>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </HelmetProvider>
  );
}
export default App;
