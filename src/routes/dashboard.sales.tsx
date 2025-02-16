import { Analytics, DeleteOutline, Download, Edit, MoreVert } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Pagination,
  Paper,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/dashboard/sales')({
  component: RouteComponent,
});

function RouteComponent() {
  const [page, setPage] = useState(1);

  const products = [
    {
      name: 'MacBook Pro with M2 Chip',
      firstStock: 4159,
      sold: 878,
      dateAdded: 'Jul 14, 2023',
      price: 1200,
      rating: 4.8,
    },
    {
      name: 'iPhone 15 128 / 256 / 512 (BOX)',
      firstStock: 1590,
      sold: 981,
      dateAdded: 'Aug 09, 2023',
      price: 1660,
      rating: 5.0,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' sx={{ mb: 1 }}>
        Ventas
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 4 }}>
        Información general de ventas
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2, mb: 4 }}>
        {/* December Report Card */}
        <Card sx={{ bgcolor: '#f8f9fe', boxShadow: 'none' }}>
          <CardContent>
            <Box
              sx={{
                width: 60,
                height: 60,
                bgcolor: '#5b45e0',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <Analytics sx={{ color: 'white' }} />
            </Box>
            <Typography variant='h6' sx={{ mb: 1 }}>
              Rerpote de Diciembre
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              Oserva métricas claves de tus ventas durante el último mes.
            </Typography>
            <Stack direction='row' spacing={1}>
              {/* <Button variant='contained' startIcon={<Analytics />} sx={{ bgcolor: '#5b45e0', '&:hover': { bgcolor: '#4c39c7' } }}>
                Analyze This
              </Button> */}
              <Button variant='outlined' startIcon={<Download />}>
                Descargar Informe
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Card>
            <CardContent>
              <Typography color='text.secondary'>Ingresos en Diciembre</Typography>
              <Typography variant='h4' sx={{ my: 2 }}>
                S/ 28,000
              </Typography>
              <Stack direction='row' spacing={1}>
                <Chip size='small' label='Macbook m2' />
                <Chip size='small' label='iPhone 15' />
              </Stack>
              <Box sx={{ mt: 2, height: 100, bgcolor: '#f8f9fe' }} /> {/* Placeholder for chart */}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography color='text.secondary'>Ventas en Diciembre</Typography>
              <Typography variant='h4' sx={{ my: 2 }}>
                4.5k
              </Typography>
              <Stack direction='row' spacing={1}>
                <Chip size='small' label='1,272 iPhone 15' />
                <Chip size='small' label='675 Macbook' />
              </Stack>
              <Box sx={{ mt: 2, height: 100, bgcolor: '#f8f9fe' }} />
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Paper sx={{ mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'></TableCell>
                <TableCell>PRODUCTO</TableCell>
                <TableCell>STOCK</TableCell>
                <TableCell>VENTAS</TableCell>
                <TableCell>PRECIO</TableCell>
                <TableCell>CALIFICACIONES</TableCell>
                <TableCell>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell padding='checkbox'>
                    <input type='checkbox' />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.firstStock}</TableCell>
                  <TableCell>{product.sold}</TableCell>
                  <TableCell>S/ {product.price}</TableCell>
                  <TableCell>
                    <Rating value={product.rating} readOnly size='small' />
                  </TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={1}>
                      <IconButton size='small'>
                        <Edit fontSize='small' />
                      </IconButton>
                      <IconButton size='small'>
                        <DeleteOutline fontSize='small' />
                      </IconButton>
                      <IconButton size='small'>
                        <MoreVert fontSize='small' />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
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
