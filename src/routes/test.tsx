import { Box, TextField } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import CakeIcon from "@mui/icons-material/Cake";
import { ComponentType, useRef } from "react";

export const Route = createFileRoute("/test")({
  component: Test,
});

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
    <Box component="main" className="px-4">
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
    </Box>
  );
}
