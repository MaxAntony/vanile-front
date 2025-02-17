import { Card, CardContent, Typography } from '@mui/material';
import { Item } from '../api-client';

export const ProductCardStore = ({ prod }: { prod: Item }) => {
  return (
    <Card sx={{ borderRadius: '10px' }} className='relative w-full'>
      <img src={prod.imageUrl} title={prod.name} className='h-24 w-full object-cover' />
      <CardContent sx={{ margin: 0 }} className='grid grid-cols-2'>
        <Typography variant='subtitle1' component='p' className='col-span-full'>
          {prod.name}
        </Typography>
        <Typography variant='subtitle2' className='text-gray-400'>
          {/* {prod.category} */} Postre
        </Typography>
        <Typography variant='button' className='text-right font-bold text-slate-900'>
          {prod.price.toLocaleString('es-PE', {
            style: 'currency',
            currency: 'PEN',
          })}
        </Typography>
        <span className='absolute right-0 top-0 rounded-full bg-blue-600 px-2 py-1 text-center font-bold text-white'>{/* {prod.stock} */} 27</span>
      </CardContent>
    </Card>
  );
};
