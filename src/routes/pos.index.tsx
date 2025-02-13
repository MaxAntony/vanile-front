import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Add from '@mui/icons-material/Add';
import CakeIcon from '@mui/icons-material/Cake';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Remove from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, Card, CardContent, IconButton, SwipeableDrawer, TextField, Typography } from '@mui/material';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ComponentType, useMemo, useRef, useState } from 'react';

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
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const addToCart = (product: Product) => {
    // Busca si el producto ya está en el carrito
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Actualiza la cantidad del producto existente de manera inmutable
      const updatedCart = cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      setCart(updatedCart);
    } else {
      // Agrega el nuevo producto al carrito
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const modifyQuantity = (prod: CartItem, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === prod.id
        ? {
            ...item,
            quantity: quantity < 1 ? 1 : item.stock < quantity ? item.quantity : quantity,
          }
        : item,
    );
    setCart(updatedCart);
  };

  return (
    <>
      <Box component='main' className='mb-16 p-4'>
        {/* Filter section */}
        <section ref={filterContainer} className='mt-4 flex gap-x-4 overflow-x-auto bg-transparent'>
          {filters.map((filter: Filter, index: number) => (
            <div
              key={index}
              className='flex cursor-pointer flex-col items-center justify-center rounded-lg border border-blue-400 bg-white p-4 shadow-md'
              onClick={(e) => scrollToElement(e)}
            >
              <filter.icon />
              <span className='font-medium'>{filter.title}</span>
              <span className='text-nowrap text-xs text-gray-500'>{filter.quantity} items</span>
            </div>
          ))}
        </section>

        {/* Input search section */}
        <TextField id='outlined-basic' label='Buscar productos' variant='outlined' fullWidth sx={{ my: 2 }} />

        {/* Products section */}
        <section className='grid grid-cols-2 gap-4'>
          {products.map((prod: Product, index: number) => (
            <Card key={index} sx={{ borderRadius: '10px' }} className='relative' onClick={() => addToCart(prod)}>
              <img src={prod.imageUrl} title={prod.name} className='h-24 w-full object-cover' />
              <CardContent sx={{ margin: 0 }} className='grid grid-cols-2'>
                <Typography variant='subtitle1' component='p' className='col-span-full'>
                  {prod.name}
                </Typography>
                <Typography variant='subtitle2' className='text-gray-400'>
                  {prod.category}
                </Typography>
                <Typography variant='button' className='text-right font-bold text-slate-900'>
                  {prod.price.toLocaleString('es-PE', {
                    style: 'currency',
                    currency: 'PEN',
                  })}
                </Typography>
                <span className='absolute right-0 top-0 rounded-full bg-blue-600 px-2 py-1 text-center font-bold text-white'>{prod.stock}</span>
              </CardContent>
            </Card>
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

          <section className='flex flex-col items-center justify-center rounded-se-3xl bg-green-400 p-3 text-gray-600' onClick={toggleDrawer(true)}>
            <span className='text-xl font-bold'>PAGAR</span>
          </section>
        </div>
      </div>

      {/* Drawable POS */}
      <SwipeableDrawer anchor='bottom' open={openDrawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Typography variant='h6' className='pt-2 text-center text-blue-500'>
          POS - Detalle de venta
        </Typography>

        <Box component='section' className='overflow-y-auto p-4'>
          {cart.map((prod: CartItem) => (
            <Card key={prod.id} className='relative mb-1 flex border-b'>
              <img src={prod.imageUrl} alt={prod.name} className='m-4 size-20 rounded-full object-cover' />

              <CardContent>
                <Typography component='div' variant='h6'>
                  {prod.name}
                </Typography>
                <Typography variant='body1' component='div' sx={{ color: 'text.secondary' }}>
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
                  <Typography variant='body1' component='div' className='col-span-2 text-center'>
                    {/* Total: ${(prod.price * quantities[index]).toFixed(2)} */}
                    {(prod.price * prod.quantity).toLocaleString('es-PE', {
                      style: 'currency',
                      currency: 'PEN',
                    })}
                  </Typography>
                </Box>
              </CardContent>
              <DeleteIcon className='absolute right-0 top-0 m-1 text-red-500' onClick={() => removeFromCart(prod.id)} />
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
            <Button variant='contained' endIcon={<KeyboardArrowRightIcon />} onClick={() => console.log(cart)}>
              Confirmar
            </Button>
          </section>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
