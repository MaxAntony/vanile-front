import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '../contexts/auth';

interface LoginFormData {
  email: string;
  password: string;
}

export const Route = createFileRoute('/_auth/login')({
  component: LoginComponent,
});

function LoginComponent() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log('Login attempted with:', formData);
      await auth?.login({ email: formData.email, password: formData.password });
      navigate({
        to: '/dashboard',
      });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        p: 3,
      }}
    >
      <Typography variant='h4' component='h1' gutterBottom align='center'>
        Bienvenido
      </Typography>
      <Typography variant='body2' color='text.secondary' align='center' sx={{ mb: 3 }}>
        Ingrese los datos de su cuenta
      </Typography>

      <TextField
        fullWidth
        margin='normal'
        label='Email'
        name='email'
        type='email'
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Email color='action' />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        margin='normal'
        label='Password'
        name='password'
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Lock color='action' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ mt: 2, mb: 2, textAlign: 'right' }}>
        <Link href='#' variant='body2' underline='hover'>
          Forgot password?
        </Link>
      </Box>

      <Button type='submit' fullWidth variant='contained' size='large' disabled={isLoading} sx={{ mt: 2 }}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant='body2' color='text.secondary'>
          Don't have an account?{' '}
          <Link href='/auth/register' variant='body2' underline='hover'>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginComponent;
