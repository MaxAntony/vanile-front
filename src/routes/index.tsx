import { createFileRoute } from '@tanstack/react-router';
import MainLayout from '../layouts/MainLayout.tsx';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='p-2'>
      <MainLayout></MainLayout>
    </div>
  );
}
