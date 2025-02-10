import { Box, Container } from '@mui/material';
import React, { ReactNode } from 'react';

type AuthLayoutProps = {
  backgroundImage: string;
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ backgroundImage, children }) => {
  return (
    <Container
      className='flex h-screen w-screen min-w-full items-center justify-center bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Box className='border-1 container relative min-h-48 max-w-sm -translate-y-1/4 rounded-lg border border-gray-300 bg-white px-12 py-10 shadow'>
        {children}
      </Box>
    </Container>
  );
};

export default AuthLayout;
