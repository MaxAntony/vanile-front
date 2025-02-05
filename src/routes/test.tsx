import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { createFileRoute, Link } from "@tanstack/react-router";
import CakeIcon from "@mui/icons-material/Cake";
import { ComponentType, useRef } from "react";

export const Route = createFileRoute("/test")({
  component: Test,
});

const ROUTE_NAMES = {
  DASHBOARD: {
    TEST: "/test",
    SALES: "/about",
  },
};

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

type Product = {
  img: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
};

const products: Product[] = [
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Tarta de manzana",
    category: "Postres",
    price: 5.99,
    quantity: 12,
  },
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Chocolate caliente",
    category: "Bebidas",
    price: 2.49,
    quantity: 25,
  },
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Galletas de avena",
    category: "Postres",
    price: 3.99,
    quantity: 30,
  },
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Café espresso",
    category: "Bebidas",
    price: 1.99,
    quantity: 50,
  },
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Tiramisu",
    category: "Postres",
    price: 6.49,
    quantity: 15,
  },
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Limonada natural",
    category: "Bebidas",
    price: 2.79,
    quantity: 40,
  },
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Cheesecake de frutos rojos",
    category: "Postres",
    price: 7.99,
    quantity: 8,
  },
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Mojito",
    category: "Bebidas",
    price: 4.99,
    quantity: 10,
  },
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Brownie de chocolate",
    category: "Postres",
    price: 4.29,
    quantity: 18,
  },
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Café con leche",
    category: "Bebidas",
    price: 2.49,
    quantity: 35,
  },
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Pastel de zanahoria",
    category: "Postres",
    price: 5.49,
    quantity: 20,
  },
  {
    img: "https://i.ytimg.com/vi/u4PZrUrlq9Q/sddefault.jpg?v=66e705da",
    title: "Batido de vainilla",
    category: "Bebidas",
    price: 3.59,
    quantity: 22,
  },
];

function Test() {
  const filterContainer = useRef<HTMLDivElement>(null);

  // Función para desplazar el elemento al borde izquierdo
  const scrollToElement = (event: React.MouseEvent) => {
    if (!filterContainer.current) return;

    const targetElement = event.currentTarget as HTMLElement;
    const containerScrollLeft = filterContainer.current.scrollLeft;
    const elementOffsetLeft = targetElement.offsetLeft;

    // Si el elemento no está en el borde izquierdo, desplázalo
    if (elementOffsetLeft > containerScrollLeft) {
      filterContainer.current.scrollTo({
        left: elementOffsetLeft - 20,
        behavior: "smooth",
      });
    }
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
          id="outlined-basic"
          label="Buscar productos"
          variant="outlined"
          fullWidth
          sx={{ my: 2 }}
        />

        {/* Products section */}
        <section className="grid grid-cols-2 gap-4">
          {products.map((prod: Product, index: number) => (
            <Card key={index} sx={{ borderRadius: "10px" }}>
              <img
                src={prod.img}
                title={prod.title}
                className="h-24 w-full object-cover"
              />
              <CardContent sx={{ margin: 0 }} className="grid grid-cols-2">
                <Typography
                  variant="subtitle1"
                  component="p"
                  className="col-span-full"
                >
                  {prod.title}
                </Typography>
                <Typography variant="subtitle2" className="text-gray-400">
                  {prod.category}
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

          <section className="flex flex-col justify-center items-center text-gray-600 p-3 bg-green-400 rounded-se-3xl">
            <span className="font-bold text-xl">PAGAR</span>
          </section>
        </div>
      </div>
    </>
  );
}
