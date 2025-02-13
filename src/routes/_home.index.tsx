import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_home/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box>
      <h3 className='m-8 text-center'>Pantalla de Inicio '/'</h3>
    </Box>
  );
}
