import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  // beforeLoad: ({ context, location }) => {
  //   if (!context.auth.isAuthenticated) {
  //     throw redirect({
  //       to: '/',
  //       search: {
  //         redirect: location.href,
  //       },
  //     });
  //   }
  // },
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
