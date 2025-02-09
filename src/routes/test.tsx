import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { createFileRoute, Link } from "@tanstack/react-router";
import CakeIcon from "@mui/icons-material/Cake";
import { ComponentType, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Item, itemSearch, OrderItem } from "../api-client";

export const Route = createFileRoute("/test")({
  component: Test,
});

// Rutas
const ROUTE_NAMES = {
  DASHBOARD: {
    TEST: "/test",
    SALES: "/about",
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
    title: "Todos",
    quantity: 100,
  },
  {
    icon: CakeIcon,
    title: "Postre",
    quantity: 75,
  },
  {
    icon: CakeIcon,
    title: "Bebida",
    quantity: 25,
  },
  {
    icon: CakeIcon,
    title: "Bebida",
    quantity: 25,
  },
  {
    icon: CakeIcon,
    title: "Todos",
    quantity: 100,
  },
  {
    icon: CakeIcon,
    title: "Postre",
    quantity: 75,
  },
  {
    icon: CakeIcon,
    title: "Bebida",
    quantity: 25,
  },
  {
    icon: CakeIcon,
    title: "Bebida",
    quantity: 25,
  },
];

function Test() {
  const filterContainer = useRef<HTMLDivElement>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [cart, setCart] = useState<(OrderItem & Item)[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { products } = useSearchProducts(searchText)

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
        behavior: "smooth",
      });
    }
  };

  // Funcion para deslizar el componente Drawer
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenDrawer(open);
    };

  const addToCart = (product: Item) => {
    // Busca si el producto ya está en el carrito
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Actualiza la cantidad del producto existente de manera inmutable
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
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

  const modifyQuantity = (prod: OrderItem, quantity: number) => {
    // Función auxiliar para calcular la nueva cantidad
    const calculateNewQuantity = (item: (OrderItem & Item), newQuantity: number) => {
      if(newQuantity === 0) return ""
      if (newQuantity < 1) return 1;
      // if (item.stock < newQuantity) return item.quantity;
      return newQuantity;
    };

    // Actualizar el carrito
    const updatedCart = cart.map((item) =>
      item.id === prod.id
        ? { ...item, quantity: calculateNewQuantity(item, quantity) as number }
        : item
    );
    setCart(updatedCart);
  };

  return (
    <>
      <Box component="main" className="p-4 mb-16">
        {/* Filter section */}
        <section
          ref={filterContainer}
          className="flex bg-transparent overflow-x-auto mt-4 gap-x-4"
        >
          {filters.map((filter: Filter, index: number) => (
            <div
              key={index}
              className="flex flex-col bg-white items-center justify-center cursor-pointer rounded-lg border border-blue-400 p-4 shadow-md"
              onClick={(e) => scrollToElement(e)}
            >
              <filter.icon />
              <span className="font-medium">{filter.title}</span>
              <span className="text-xs text-gray-500 text-nowrap">
                {filter.quantity} items
              </span>
            </div>
          ))}
        </section>

        {/* Input search section */}
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
          id="outlined-basic"
          label="Buscar productos"
          variant="outlined"
          fullWidth
          sx={{ my: 2 }}
        />

        {/* Products section */}
        <section className="grid grid-cols-2 gap-4">
          {products?.map((prod: Item, index: number) => (
            <Card
              key={index}
              sx={{ borderRadius: "10px" }}
              className="relative"
              onClick={() => addToCart(prod)}
            >
              <img
                src={prod.imageUrl}
                title={prod.name}
                className="h-24 w-full object-cover"
              />
              <CardContent sx={{ margin: 0 }} className="grid grid-cols-2">
                <Typography
                  variant="subtitle1"
                  component="p"
                  className="col-span-full"
                >
                  {prod.name}
                </Typography>
                <Typography variant="subtitle2" className="text-gray-400">
                  {/* {prod.category} */} Postre
                </Typography>
                <Typography
                  variant="button"
                  className="text-slate-900 font-bold text-right"
                >
                  {prod.price.toLocaleString("es-PE", {
                    style: "currency",
                    currency: "PEN",
                  })}
                </Typography>
                <span className="absolute top-0 right-0 bg-blue-600 text-white font-bold rounded-full py-1 px-2 text-center">
                  {/* {prod.stock} */} 27
                </span>
              </CardContent>
            </Card>
          ))}
        </section>
      </Box>

      {/* Menu helper */}
      <div className="fixed bottom-0 left-0 w-full border-t border-gray-200 shadow-lg bg-white rounded-t-3xl">
        <div className="grid grid-cols-3">
          <Link
            to={ROUTE_NAMES.DASHBOARD.TEST}
            className="flex flex-col items-center text-gray-600 transition-colors duration-200 p-3"
          >
            <ShoppingCartIcon
              className={`${
                location.pathname === ROUTE_NAMES.DASHBOARD.TEST &&
                "text-blue-500"
              }`}
            />
            <span
              className={`mt-1 text-xs font-medium ${
                location.pathname === ROUTE_NAMES.DASHBOARD.TEST &&
                "text-blue-500"
              }`}
            >
              POS
            </span>
          </Link>

          <Link
            to={ROUTE_NAMES.DASHBOARD.TEST}
            className="flex flex-col items-center text-gray-600 transition-colors duration-200 p-3"
          >
            <AccessAlarmIcon
              className={`${
                location.pathname === ROUTE_NAMES.DASHBOARD.TEST &&
                "text-blue-500"
              }`}
            />
            <span
              className={`mt-1 text-xs font-medium ${
                location.pathname === ROUTE_NAMES.DASHBOARD.TEST &&
                "text-blue-500"
              }`}
            >
              Ventas
            </span>
          </Link>

          <section
            className="flex flex-col justify-center items-center text-gray-600 p-3 bg-green-400 rounded-se-3xl"
            onClick={toggleDrawer(true)}
          >
            <span className="font-bold text-xl">PAGAR</span>
          </section>
        </div>
      </div>

      {/* Drawable POS */}
      <SwipeableDrawer
        anchor="bottom"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Typography variant="h6" className="text-blue-500 text-center pt-2">
          POS - Detalle de venta
        </Typography>

        <Box component="section" className="overflow-y-auto p-4">
          {cart.map((prod: (OrderItem & Item)) => (
            <Card key={prod.id} className="relative flex border-b mb-1">
              <img
                src={prod.imageUrl}
                alt={prod.name}
                className="size-20 object-cover rounded-full m-4"
              />

              <CardContent>
                <Typography component="div" variant="h6">
                  {prod.name}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ color: "text.secondary" }}
                >
                  Precio unitario:{" "}
                  {prod.price.toLocaleString("es-PE", {
                    style: "currency",
                    currency: "PEN",
                  })}
                </Typography>

                <Box className="grid grid-cols-5 items-center">
                  <IconButton
                    onClick={() => modifyQuantity(prod, prod.quantity - 1)}
                    color="primary"
                    size="small"
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    type="number"
                    value={prod.quantity}
                    onChange={(e) =>
                      modifyQuantity(prod, Number(e.target.value))
                    }
                    size="small"
                    variant="standard"
                    inputProps={{
                      style: {
                        textAlign: "center",
                      },
                    }}
                  />
                  <IconButton
                    onClick={() => modifyQuantity(prod, prod.quantity + 1)}
                    color="primary"
                    size="small"
                  >
                    <Add />
                  </IconButton>
                  <Typography
                    variant="body1"
                    component="div"
                    className="col-span-2 text-center"
                  >
                    {/* Total: ${(prod.price * quantities[index]).toFixed(2)} */}
                    {(prod.price * prod.quantity).toLocaleString("es-PE", {
                      style: "currency",
                      currency: "PEN",
                    })}
                  </Typography>
                </Box>
              </CardContent>
              <DeleteIcon
                className="absolute top-0 right-0 m-1 text-red-500"
                onClick={() => removeFromCart(prod.id)}
              />
            </Card>
          ))}

          {/* Payment section  */}
          <section className="text-blue-500 flex justify-evenly font-bold text-xl p-3">
            <span>Total</span>
            <span>
              {totalPrice.toLocaleString("es-PE", {
                style: "currency",
                currency: "PEN",
              })}
            </span>
          </section>

          <section className="grid grid-cols-2 gap-1">
            <Button
              variant="contained"
              startIcon={<KeyboardArrowLeftIcon />}
              onClick={toggleDrawer(false)}
            >
              Regresar
            </Button>
            <Button
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={() => console.log(cart)}
            >
              Confirmar
            </Button>
          </section>
        </Box>
      </SwipeableDrawer>
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