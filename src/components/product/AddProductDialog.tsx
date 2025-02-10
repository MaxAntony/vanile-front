import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import * as yup from 'yup';
import useProducts from '../../hooks/useProducts';

export default function CreateProductDialog() {
  const schema = yup.object().shape({
    productName: yup.string().min(3, 'El nombre debe tener al menos 3 caracteres').required('El nombre es obligatorio'),

    productPrice: yup
      .number()
      .typeError('El precio debe ser un número')
      .positive('El precio debe ser un número positivo')
      .required('El precio es obligatorio'),

    productImage: yup
      .mixed()
      .required('La imagen es obligatoria')
      .test('fileType', 'Solo se permiten imágenes (JPG, PNG, GIF)', (value) => {
        if (!value || !(value instanceof File)) return false;
        return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      })
      .test('fileSize', 'El tamaño máximo es 200MB', (value) => {
        if (!value || !(value instanceof File)) return false;
        return value.size <= 200 * 1024 * 1024;
      }),
  });
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    productName: '',
    productPrice: '',
    productImage: new Blob(),
  });
  const { itemCreate } = useProducts();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ productName: '', productPrice: '', productImage: new Blob() });
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
      console.log(formData);
      await schema.validate(formData, { abortEarly: false });
      console.log(formData);

      itemCreate.mutate({
        body: {
          name: formData.productName,
          price: parseFloat(formData.productPrice),
          image: formData.productImage,
        },
      });
      handleClose();
    } catch (err) {
      console.log('error' + err.errors);
    }
  };

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        Nuevo Producto
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nuevo Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>Ingrese los datos para el nuevo producto</DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            id='productName'
            name='productName'
            label='Nombre del producto'
            type='text'
            fullWidth
            variant='standard'
            value={formData.productName}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='productPrice'
            name='productPrice'
            label='Precio del producto'
            type='text'
            fullWidth
            variant='standard'
            value={formData.productPrice}
            onChange={handleChange}
          />
          <p className='pt-3 text-gray-700'>Imagen del producto</p>
          <TextField
            autoFocus
            required
            margin='dense'
            id='productImage'
            name='productImage'
            type='file'
            fullWidth
            variant='standard'
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
