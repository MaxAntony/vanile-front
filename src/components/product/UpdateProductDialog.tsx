import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import * as yup from 'yup';
import useProducts from '../../hooks/useProducts';

export default function UpdateProductDialog(id) {
  const productId = id;
  const schema = yup.object().shape({
    productName: yup.string().min(3, 'El nombre debe tener al menos 3 caracteres').required('El nombre es obligatorio'),

    productPrice: yup
      .number()
      .typeError('El precio debe ser un número')
      .positive('El precio debe ser un número positivo')
      .required('El precio es obligatorio'),
  });
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    productName: '',
    productPrice: '',
    productImage: new Blob(),
  });
  const { updateItem, refetch } = useProducts();

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
      await schema.validate(formData, { abortEarly: false });
      console.log(productId);
      console.log(formData);
      updateItem.mutate({
        path: { id: `${productId.id}` },
        body: {
          name: formData.productName,
          price: parseFloat(formData.productPrice),
        },
      });

      handleClose();
      refetch();
    } catch (err) {
      console.log('error' + err.errors);
    }
  };

  return (
    <React.Fragment>
      <IconButton aria-label='edit' size='large' onClick={handleClickOpen}>
        <EditIcon fontSize='inherit' />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>Ingrese los nuevos datos para actualizar el producto</DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' onClick={handleSubmit}>
            Actualizar Producto
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
