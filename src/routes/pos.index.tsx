import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Remove from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Alert,
  AppBar,
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  Fade,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  SwipeableDrawer,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Item, itemSearch, OrderItem } from '../api-client';
import { orderCreateMutation } from '../api-client/@tanstack/react-query.gen';
import PaymentForm from '../components/PaymentForm';

export const Route = createFileRoute('/pos/')({
  component: Test,
});

function Test() {
  const filterContainer = useRef<HTMLDivElement>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [cart, setCart] = useState<(OrderItem & Item)[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [purchaseOk, setPurchaseOk] = useState(false);

  const { products } = useSearchProducts(searchText);
  const createOrder = useMutation({ ...orderCreateMutation() });

  const totalPrice = useMemo<number>(() => {
    return cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }, [cart]);

  // Función para desplazar el elemento al borde izquierdo
  const scrollToElement = (event: React.MouseEvent) => {
    if (!filterContainer.current) return;

    const targetElement = event.currentTarget as HTMLElement;
    const containerScrollLeft = filterContainer.current.scrollLeft;
    const elementOffsetLeft = targetElement.offsetLeft;

    if (elementOffsetLeft > containerScrollLeft) {
      filterContainer.current.scrollTo({
        left: elementOffsetLeft - 20,
        behavior: 'smooth',
      });
    }
  };

  // Funcion para deslizar el componente Drawer
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setOpenDrawer(open);
  };

  // Funcion para manejar las notificaciones
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [notifyOptions, setNotifyOptions] = useState<Pick<CustomSnackbarProps, 'severity' | 'message'>>({
    severity: 'success',
    message: '',
  });

  const handleClickNotification = () => {
    setOpenNotification(true);
  };

  const handleCloseNotification = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNotification(false);
  };

  const addToCart = (product: Item) => {
    let message: string = '';
    // Busca si el producto ya está en el carrito
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Actualiza la cantidad del producto existente de manera inmutable
      const newQuantity = existingItem.quantity + 1;
      const updatedCart = cart.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item));
      setCart(updatedCart);
      message = `${product.name} (x${newQuantity})`;
    } else {
      // Agrega el nuevo producto al carrito
      setCart([...cart, { ...product, quantity: 1 }]);
      message = `${product.name} se ha añadido al carrito`;
    }
    handleClickNotification();
    setNotifyOptions((prevState) => ({
      ...prevState,
      message,
    }));
  };

  const removeFromCart = (product: OrderItem & Item) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    handleClickNotification();
    setNotifyOptions(() => ({
      severity: 'info',
      message: `${product.name} ha sido removido`,
    }));
  };

  const modifyQuantity = (prod: OrderItem, quantity: number) => {
    // Función auxiliar para calcular la nueva cantidad
    const calculateNewQuantity = (item: OrderItem & Item, newQuantity: number) => {
      if (newQuantity === 0) return '';
      if (newQuantity < 1) return 1;
      // if (item.stock < newQuantity) return item.quantity;
      return newQuantity;
    };

    // Actualizar el carrito
    const updatedCart = cart.map((item) => (item.id === prod.id ? { ...item, quantity: calculateNewQuantity(item, quantity) as number } : item));
    setCart(updatedCart);
  };

  const submitOrder = () => {
    createOrder.mutate(
      { body: { items: cart, totalAmount: totalPrice } },
      {
        onSuccess: () => {
          handleClickNotification();
          setNotifyOptions((prevState) => ({
            ...prevState,
            message: `Productos enviados`,
          }));
          setCart([]);
          setOpenDrawer(false);
        },
      },
    );
  };

  return (
    <>
      <Box component='main' className='mb-16'>
        {/* Barra de Navegacion */}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static'>
            <Toolbar className='justify-end'>
              <Link
                to='/dashboard'
                className='me-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
              >
                Volver
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
          id='outlined-basic'
          label='Buscar productos'
          variant='outlined'
          fullWidth
          sx={{ my: 2 }}
        />

        {/* Products section */}
        <section className='grid grid-cols-2 gap-4 p-4'>
          {products?.map((prod: Item) => (
            <ButtonBase key={prod.id} focusRipple>
              <Card sx={{ borderRadius: '10px' }} className='relative w-full' onClick={() => addToCart(prod)}>
                <img src={prod.imageUrl} title={prod.name} className='h-24 w-full object-cover' />
                <CardContent sx={{ margin: 0 }} className='grid grid-cols-2'>
                  <Typography variant='subtitle1' component='p' className='col-span-full'>
                    {prod.name}
                  </Typography>
                  <Typography variant='subtitle2' className='text-gray-400'>
                    {/* {prod.category} */} Producto
                  </Typography>
                  <Typography variant='button' className='text-right font-bold text-slate-900'>
                    {prod.price.toLocaleString('es-PE', {
                      style: 'currency',
                      currency: 'PEN',
                    })}
                  </Typography>
                  {/* <span className='absolute right-0 top-0 rounded-full bg-blue-600 px-2 py-1 text-center font-bold text-white'> */}
                  {/*   27 */}
                  {/* </span> */}
                </CardContent>
              </Card>
            </ButtonBase>
          ))}
        </section>
      </Box>

      {/* Menu helper */}
      <div className='fixed bottom-0 left-0 w-full rounded-t-3xl border-t border-gray-200 bg-white shadow-lg'>
        <div className='grid grid-cols-2'>
          <Link to={'/pos'} className='flex flex-col items-center p-3 text-gray-600 transition-colors duration-200'>
            <ShoppingCartIcon className={`${location.pathname === '/pos' && 'text-blue-500'}`} />
            <span className={`mt-1 text-xs font-medium ${location.pathname === '/pos' && 'text-blue-500'}`}>POS</span>
          </Link>

          {/* <Link to={} className='flex flex-col items-center p-3 text-gray-600 transition-colors duration-200'> */}
          {/*   <AccessAlarmIcon className={`${location.pathname === ROUTE_NAMES.DASHBOARD.TEST && 'text-blue-500'}`} /> */}
          {/*   <span className={`mt-1 text-xs font-medium ${location.pathname === ROUTE_NAMES.DASHBOARD.TEST && 'text-blue-500'}`}>Ventas</span> */}
          {/* </Link> */}

          <ButtonBase onClick={toggleDrawer(true)} focusRipple>
            <section className='flex size-full flex-col items-center justify-center rounded-se-3xl bg-green-400 text-gray-600'>
              <span className='text-xl font-bold'>PAGAR</span>
            </section>
          </ButtonBase>
        </div>
      </div>

      {/* Drawable POS */}
      <SwipeableDrawer anchor='bottom' open={openDrawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Typography variant='h6' className='pt-2 text-center text-blue-500'>
          POS - Detalle de venta
        </Typography>

        <Box component='section' className='overflow-y-auto p-4'>
          {cart.map((prod: OrderItem & Item) => (
            <Card key={prod.id} className='relative mb-1 flex border-b'>
              <img src={prod.imageUrl} alt={prod.name} className='m-4 size-20 rounded-full object-cover' />

              <CardContent>
                <Typography component='div' variant='h6'>
                  {prod.name}
                </Typography>
                <Typography variant='caption' component='div' sx={{ color: 'text.secondary' }} className='text-nowrap'>
                  Precio unitario:{' '}
                  {prod.price.toLocaleString('es-PE', {
                    style: 'currency',
                    currency: 'PEN',
                  })}
                </Typography>

                <Box className='grid grid-cols-5 items-center'>
                  <IconButton onClick={() => modifyQuantity(prod, prod.quantity - 1)} color='primary' size='small'>
                    <Remove />
                  </IconButton>
                  <TextField
                    type='number'
                    value={prod.quantity}
                    onChange={(e) => modifyQuantity(prod, Number(e.target.value))}
                    size='small'
                    variant='standard'
                    inputProps={{
                      style: {
                        textAlign: 'center',
                      },
                    }}
                  />
                  <IconButton onClick={() => modifyQuantity(prod, prod.quantity + 1)} color='primary' size='small' aria-label='Incrementar cantidad'>
                    <Add />
                  </IconButton>
                  <Typography variant='caption' component='div' className='col-span-2 text-center'>
                    {/* Total: ${(prod.price * quantities[index]).toFixed(2)} */}
                    {(prod.price * prod.quantity).toLocaleString('es-PE', {
                      style: 'currency',
                      currency: 'PEN',
                    })}
                  </Typography>
                </Box>
              </CardContent>
              <ButtonBase onClick={() => removeFromCart(prod)} focusRipple aria-label='Eliminar'>
                <DeleteIcon className='right-0 top-0 m-1 text-red-500' />
              </ButtonBase>
            </Card>
          ))}

          {/* Payment section  */}
          <section className='flex justify-evenly p-3 text-xl font-bold text-blue-500'>
            <span>Total</span>
            <span>
              {totalPrice.toLocaleString('es-PE', {
                style: 'currency',
                currency: 'PEN',
              })}
            </span>
          </section>

          <section className='flex flex-col gap-2'>
            <Button variant='contained' startIcon={<KeyboardArrowLeftIcon />} onClick={toggleDrawer(false)}>
              Regresar
            </Button>
            {/* <Button variant='contained' endIcon={<KeyboardArrowRightIcon />} onClick={submitOrderCreditCArd} disabled={cart.length === 0}> */}
            {/*   pagar con tarjeta */}
            {/* </Button> */}
            <PaymentForm
              amount={Math.trunc(totalPrice * 100)}
              afterOk={() => {
                // setCart([]);
                // setPurchaseOk(true);
                submitOrder();
              }}
            />

            <Button variant='contained' endIcon={<KeyboardArrowRightIcon />} onClick={submitOrder} disabled={cart.length === 0}>
              Confirmar
            </Button>
          </section>
        </Box>
      </SwipeableDrawer>

      <CustomSnackbar
        open={openNotification}
        handleClose={handleCloseNotification}
        severity={notifyOptions.severity}
        message={notifyOptions.message}
      />
      <Snackbar
        open={purchaseOk}
        autoHideDuration={1000}
        message='Compra exitosa'
        onClose={() => {
          setPurchaseOk(false);
        }}
      />
    </>
  );
}

// Custom Hook useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Custom Hook useSearchProducts
const useSearchProducts = (initialSearchText: string) => {
  const debouncedSearchText = useDebounce<string>(initialSearchText, 300); // Debounce de 300 ms

  // Consulta para buscar productos
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['item', 'search', debouncedSearchText],
    queryFn: async () => {
      const response = await itemSearch({ query: { query: debouncedSearchText } });
      return response.data;
    },
  });

  return {
    products,
    isLoading,
    isError,
    error,
  };
};

interface CustomSnackbarProps {
  open: boolean;
  autoHideDuration?: number;
  handleClose: () => void;
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

// Componente CustomSnackbar como función normal
function CustomSnackbar({ open, autoHideDuration = 3000, handleClose, severity = 'success', message }: CustomSnackbarProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={Fade}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
