import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <div className='flex gap-2 p-2'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>{' '}
        <Link to='/about' className='[&.active]:font-bold'>
          About
        </Link>
        <Link to='/products' className='[&.active]:font-bold'>
          Products
        </Link>
        <Link to='/test' className='[&.active]:font-bold'>
          Test
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools /> */}
      <Outlet />
    </>
  ),
});
