import { Visibility } from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { GetOrder } from '../api-client';
import { orderFindAllOptions } from '../api-client/@tanstack/react-query.gen';

export const Route = createFileRoute('/dashboard/sales')({
  component: RouteComponent,
});

function RouteComponent() {
  const [page, setPage] = useState(1);
  const [orderSelected, setOrderSelected] = useState<GetOrder>();
  const { data } = useQuery({ ...orderFindAllOptions() });
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' sx={{ mb: 1 }}>
        Ventas
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 4 }}>
        Información general de ventas
      </Typography>

      <Paper sx={{ mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Costo</TableCell>
                <TableCell>Fecha de venta</TableCell>
                <TableCell>Cantidad de products</TableCell>
                <TableCell>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((product) => (
                <TableRow key={product.createdAt}>
                  <TableCell>{product.totalAmount}</TableCell>
                  <TableCell>{product.createdAt}</TableCell>
                  <TableCell>{product.items.length}</TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={1}>
                      <IconButton
                        size='small'
                        onClick={() => {
                          setDrawerOpen(true);
                          setOrderSelected(product);
                        }}
                      >
                        <Visibility fontSize='small' />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              <Drawer anchor={'bottom'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell>Cantidad</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderSelected?.items.map((e) => (
                        <TableRow key={e.item.id}>
                          <TableCell>{e.item.name}</TableCell>
                          <TableCell>{e.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Drawer>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pagination count={10} page={page} onChange={(_, p) => setPage(p)} size='small' />
          <Typography variant='body2' color='text.secondary'>
            Showing 7 of 120 entries
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
