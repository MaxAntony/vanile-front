import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import './config/api';
import { useAuthStore } from './contexts/auth';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuthStore();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ auth }} />;
      </QueryClientProvider>
    </>
  );
}

function App() {
  return <InnerApp />;
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
