import { createFileRoute } from "@tanstack/react-router";
import FormDialog from "../components/product/AddProductDialog";
import TableProduct from "../components/product/TableProduct";

export const Route = createFileRoute("/products")({
  component: Products,
});

function Products() {
  return (
    <section className="p-5">
      npm
      <div className="flex justify-between mb-5">
        <h3 className="text-2xl font-semibold">Productos</h3>
        <FormDialog />
      </div>
      <div>
        <TableProduct />
      </div>
    </section>
  );
}
