import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/pos')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
