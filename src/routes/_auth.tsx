import { createFileRoute, Outlet } from '@tanstack/react-router';
import AuthLayout from '../layouts/AuthLayout'; // Import correcto

function AuthWrapper() {
  return (
    <AuthLayout backgroundImage='https://images.unsplash.com/photo-1615859131861-052f0641a60e?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      <Outlet />
    </AuthLayout>
  );
}

export const Route = createFileRoute('/_auth')({
  component: AuthWrapper, // Ahora usa el nombre corregido
});
