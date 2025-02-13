import { createFileRoute, redirect } from '@tanstack/react-router';
import DashboardLayout from '../layouts/DashboardLayout';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardLayout />;
}
