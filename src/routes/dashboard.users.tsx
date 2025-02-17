import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { userFindAllOptions } from '../api-client/@tanstack/react-query.gen';
import CreateUserDialog from '../components/product/AddUserDialog';

export const Route = createFileRoute('/dashboard/users')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, refetch } = useQuery({ ...userFindAllOptions() });
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' sx={{ mb: 1 }}>
        Usuarios
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 4 }}>
        Lista de usuarios
      </Typography>
      <CreateUserDialog
        afterClose={() => {
          refetch();
          console.log('refetched');
        }}
      />

      <Paper sx={{ mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                {/* <TableCell>Apellidos</TableCell> */}
                <TableCell>Correo</TableCell>
                {/* <TableCell>ACCIONES</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.email}</TableCell>
                  {/* <TableCell>{product.items.length}</TableCell> */}
                  {/* <TableCell> */}
                  {/*   <Stack direction='row' spacing={1}> */}
                  {/*     <IconButton */}
                  {/*       size='small' */}
                  {/*       onClick={() => { */}
                  {/*         setDrawerOpen(true); */}
                  {/*         setOrderSelected(product); */}
                  {/*       }} */}
                  {/*     > */}
                  {/*       <Visibility fontSize='small' /> */}
                  {/*     </IconButton> */}
                  {/*   </Stack> */}
                  {/* </TableCell> */}
                </TableRow>
              ))}
              {/* <Drawer anchor={'bottom'} open={drawerOpen} onClose={() => setDrawerOpen(false)}> */}
              {/*   <div> */}
              {/*     <Table> */}
              {/*       <TableHead> */}
              {/*         <TableRow> */}
              {/*           <TableCell>Producto</TableCell> */}
              {/*           <TableCell>Cantidad</TableCell> */}
              {/*         </TableRow> */}
              {/*       </TableHead> */}
              {/*       <TableBody> */}
              {/*         {orderSelected?.items.map((e) => ( */}
              {/*           <TableRow key={e.item.id}> */}
              {/*             <TableCell>{e.item.name}</TableCell> */}
              {/*             <TableCell>{e.quantity}</TableCell> */}
              {/*           </TableRow> */}
              {/*         ))} */}
              {/*       </TableBody> */}
              {/*     </Table> */}
              {/*   </div> */}
              {/* </Drawer> */}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}
        {/*   <Pagination count={10} page={page} onChange={(_, p) => setPage(p)} size='small' /> */}
        {/*   <Typography variant='body2' color='text.secondary'> */}
        {/*     Showing 7 of 120 entries */}
        {/*   </Typography> */}
        {/* </Box> */}
      </Paper>
    </Box>
  );
}
