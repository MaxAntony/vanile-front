import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import z from 'zod';
import { userCreateMutation } from '../../api-client/@tanstack/react-query.gen';

export default function CreateUserDialog({ afterClose }: { afterClose: () => void }) {
  const schema = z.object({
    userName: z
      .string()
      .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
      .refine((value) => value.trim().length > 0, { message: 'El nombre es obligatorio' }),

    userEmail: z.string().email(),
    userPassword: z.string().min(4, { message: 'la Contraseña debe ser mayor de 4 letras' }),
  });

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    userName: '',
    userEmail: '',
    userPassword: '',
  });
  const userCreate = useMutation({ ...userCreateMutation() });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ userName: '', userEmail: '', userPassword: '' });
    afterClose();
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      schema.parse(formData);

      userCreate.mutate(
        {
          body: {
            name: formData.userName,
            email: formData.userEmail,
            password: formData.userPassword,
          },
        },
        {
          onSuccess: () => {
            handleClose();
          },
        },
      );
    } catch (err) {
      console.log('Error:', err);
      if (err instanceof z.ZodError) {
        console.log('Errores de validación:', err.errors);
      }
    }
  };

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen} className='m-2'>
        Nuevo Usuario
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nuevo Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>Ingrese los datos para el nuevo usuario</DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            id='userName'
            name='userName'
            label='Nombre'
            type='text'
            fullWidth
            variant='standard'
            value={formData.userName}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='userEmail'
            name='userEmail'
            label='Correo'
            type='email'
            fullWidth
            variant='standard'
            value={formData.userEmail}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='userPassword'
            name='userPassword'
            label='Contraseña'
            type='text'
            fullWidth
            variant='standard'
            value={formData.userPassword}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' onClick={handleSubmit}>
            Crear Producto
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
