import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useProducts from '../../hooks/useProducts';
import { formatCurrency } from '../../utils/money';
import UpdateProductDialog from './UpdateProductDialog';

export default function BasicTable() {
  const { data, removeItem, refetch } = useProducts();

  const deleteRowItem = (itemId: number) => {
    removeItem(
      { path: { id: itemId.toString() } },
      {
        onError: () => {
          console.log('no se pudo eliminar');
        },
        onSuccess: () => {
          console.log('eliminado con exito');
          refetch();
        },
      },
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align='left'>Imagen</TableCell>
            <TableCell align='left'>Precio</TableCell>
            <TableCell align='left'>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='left'>
                <img className='w-24 rounded' src={row.imageUrl} alt={row.name} />
              </TableCell>
              <TableCell align='left'>{formatCurrency(row.price)}</TableCell>
              <TableCell align='left'>
                <IconButton aria-label='delete' size='large' onClick={() => deleteRowItem(row.id)}>
                  <DeleteIcon fontSize='inherit' />
                </IconButton>
                <UpdateProductDialog id={row.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
