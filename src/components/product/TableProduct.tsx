import useProducts from "../../hooks/useProducts";
import Table from "../Table";

export default function TableProduct() {
  const { data, refetch } = useProducts();

  return (
    <>
      <pre>{data}</pre>
      <Table />
    </>
  );
}
