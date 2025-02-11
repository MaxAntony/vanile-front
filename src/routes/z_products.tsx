import { createFileRoute } from '@tanstack/react-router'
import CreateProductDialog from '../components/product/AddProductDialog'
import TableProduct from '../components/product/TableProduct'

export const Route = createFileRoute('/z_products')({
  component: Products,
})

function Products() {
  return (
    <section className="p-5">
      <div className="mb-5 flex justify-between">
        <h3 className="text-2xl font-semibold">Productos</h3>
        <CreateProductDialog />
      </div>
      <div>
        <TableProduct />
      </div>
    </section>
  )
}
