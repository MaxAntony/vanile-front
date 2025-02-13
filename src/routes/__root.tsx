import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { type AuthState } from '../contexts/auth';

interface MyRouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: ResponsiveAppBar,
});

function ResponsiveAppBar() {
  return <Outlet />;
}
export default ResponsiveAppBar;
