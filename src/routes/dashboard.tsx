import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <Box>size=4</Box>
      </Grid>
      <Grid size={8}>
        <Box>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
}
