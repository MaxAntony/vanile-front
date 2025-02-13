import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Add from '@mui/icons-material/Add';
import CakeIcon from '@mui/icons-material/Cake';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Remove from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Alert,
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
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ComponentType, useEffect, useMemo, useRef, useState } from 'react';
import { Item, itemSearch, OrderItem } from '../api-client';
import { orderCreateMutation } from '../api-client/@tanstack/react-query.gen';

export const Route = createFileRoute('/pos/')({
  component: Test,
});

// Rutas
const ROUTE_NAMES = {
  DASHBOARD: {
    TEST: '/test',
    SALES: '/about',
  },
};

// Filtros
type Filter = {
  icon: ComponentType;
  title: string;
  quantity: number;
};

const filters: Filter[] = [
  {
    icon: CakeIcon,
    title: 'Todos',
    quantity: 100,
  },
  {
    icon: CakeIcon,
    title: 'Postre',
    quantity: 75,
  },
  {
    icon: CakeIcon,
    title: 'Bebida',
    quantity: 25,
  },
  {
    icon: CakeIcon,
    title: 'Bebida',
    quantity: 25,
  },
  {
    icon: CakeIcon,
    title: 'Todos',
    quantity: 100,
  },
  {
    icon: CakeIcon,
    title: 'Postre',
    quantity: 75,
  },
  {
    icon: CakeIcon,
    title: 'Bebida',
    quantity: 25,
  },
  {
    icon: CakeIcon,
    title: 'Bebida',
    quantity: 25,
  },
];

// Productos
type Product = {
  id: number;
  imageUrl: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

const products: Product[] = [
  {
    id: 1,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Tarta de manzana',
    category: 'Postres',
    price: 5.99,
    stock: 12,
  },
  {
    id: 2,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Chocolate caliente',
    category: 'Bebidas',
    price: 2.49,
    stock: 25,
  },
  {
    id: 3,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Galletas de avena',
    category: 'Postres',
    price: 3.99,
    stock: 30,
  },
  {
    id: 4,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Café espresso',
    category: 'Bebidas',
    price: 1.99,
    stock: 50,
  },
  {
    id: 5,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Tiramisu',
    category: 'Postres',
    price: 6.49,
    stock: 15,
  },
  {
    id: 6,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Limonada natural',
    category: 'Bebidas',
    price: 2.79,
    stock: 40,
  },
  {
    id: 7,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Cheesecake de frutos rojos',
    category: 'Postres',
    price: 7.99,
    stock: 8,
  },
  {
    id: 8,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Mojito',
    category: 'Bebidas',
    price: 4.99,
    stock: 10,
  },
  {
    id: 9,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Brownie de chocolate',
    category: 'Postres',
    price: 4.29,
    stock: 18,
  },
  {
    id: 10,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Café con leche',
    category: 'Bebidas',
    price: 2.49,
    stock: 35,
  },
  {
    id: 11,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Pastel de zanahoria',
    category: 'Postres',
    price: 5.49,
    stock: 20,
  },
  {
    id: 12,
    imageUrl: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Por-que-comemos-postres.jpg',
    name: 'Batido de vainilla',
    category: 'Bebidas',
    price: 3.59,
    stock: 22,
  },
];

interface CartItem extends Product {
  quantity: number;
}

function Test() {
  const filterContainer = useRef<HTMLDivElement>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [cart, setCart] = useState<(OrderItem & Item)[]>([]);
  const [searchText, setSearchText] = useState<string>('');

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

  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
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
        },
      },
    );
  };

  return (
    <>
      <Box component='main' className='mb-16 p-4'>
        {/* Filter section */}
        <section ref={filterContainer} className='mt-4 flex gap-x-4 overflow-x-auto bg-transparent'>
          {filters.map((filter: Filter, index: number) => (
            <div key={index} className='rounded-lg border border-gray-600 bg-white shadow-md' onClick={(e) => scrollToElement(e)}>
              <ButtonBase className='flex flex-col p-4' sx={{ padding: '10px' }}>
                <filter.icon />
                <span className='font-medium'>{filter.title}</span>
                <span className='text-nowrap text-xs text-gray-500'>{filter.quantity} items</span>
              </ButtonBase>
            </div>
          ))}
        </section>

        {/* Input search section */}
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
          id='outlined-basic'
          label='Buscar productos'
          variant='outlined'
          fullWidth
          sx={{ my: 2 }}
        />

        {/* Products section */}
        <section className='grid grid-cols-2 gap-4'>
          {products?.map((prod: Item) => (
            <ButtonBase key={prod.id} focusRipple>
              <Card sx={{ borderRadius: '10px' }} className='relative w-full' onClick={() => addToCart(prod)}>
                <img src={prod.imageUrl} title={prod.name} className='h-24 w-full object-cover' />
                <CardContent sx={{ margin: 0 }} className='grid grid-cols-2'>
                  <Typography variant='subtitle1' component='p' className='col-span-full'>
                    {prod.name}
                  </Typography>
                  <Typography variant='subtitle2' className='text-gray-400'>
                    {/* {prod.category} */} Postre
                  </Typography>
                  <Typography variant='button' className='text-right font-bold text-slate-900'>
                    {prod.price.toLocaleString('es-PE', {
                      style: 'currency',
                      currency: 'PEN',
                    })}
                  </Typography>
                  <span className='absolute right-0 top-0 rounded-full bg-blue-600 px-2 py-1 text-center font-bold text-white'>
                    {/* {prod.stock} */} 27
                  </span>
                </CardContent>
              </Card>
            </ButtonBase>
          ))}
        </section>
      </Box>

      {/* Menu helper */}
      <div className='fixed bottom-0 left-0 w-full rounded-t-3xl border-t border-gray-200 bg-white shadow-lg'>
        <div className='grid grid-cols-3'>
          <Link to={ROUTE_NAMES.DASHBOARD.TEST} className='flex flex-col items-center p-3 text-gray-600 transition-colors duration-200'>
            <ShoppingCartIcon className={`${location.pathname === ROUTE_NAMES.DASHBOARD.TEST && 'text-blue-500'}`} />
            <span className={`mt-1 text-xs font-medium ${location.pathname === ROUTE_NAMES.DASHBOARD.TEST && 'text-blue-500'}`}>POS</span>
          </Link>

          <Link to={ROUTE_NAMES.DASHBOARD.TEST} className='flex flex-col items-center p-3 text-gray-600 transition-colors duration-200'>
            <AccessAlarmIcon className={`${location.pathname === ROUTE_NAMES.DASHBOARD.TEST && 'text-blue-500'}`} />
            <span className={`mt-1 text-xs font-medium ${location.pathname === ROUTE_NAMES.DASHBOARD.TEST && 'text-blue-500'}`}>Ventas</span>
          </Link>

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
                  <IconButton onClick={() => modifyQuantity(prod, prod.quantity + 1)} color='primary' size='small'>
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
              <ButtonBase onClick={() => removeFromCart(prod)} focusRipple>
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

          <section className='grid grid-cols-2 gap-1'>
            <Button variant='contained' startIcon={<KeyboardArrowLeftIcon />} onClick={toggleDrawer(false)}>
              Regresar
            </Button>
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
