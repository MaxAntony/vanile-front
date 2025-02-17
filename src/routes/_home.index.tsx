import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { itemFindAllOptions } from '../api-client/@tanstack/react-query.gen';
import { ProductCardStore } from '../components/ProductCardStore';

export const Route = createFileRoute('/_home/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery({ ...itemFindAllOptions() });
  return (
    <Box>
      <h3 className='m-8 text-center'>Productos disponibles en la tienda</h3>
      <div className='grid grid-cols-2 gap-2'>{data?.map((e) => <ProductCardStore prod={e} />)}</div>
    </Box>
  );
}
