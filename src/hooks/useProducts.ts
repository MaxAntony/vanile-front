import { useQuery } from "@tanstack/react-query";
import { itemFindAllOptions } from "../api-client/@tanstack/react-query.gen";

const useProducts = () => {
  const { data, refetch, isLoading, isError, isSuccess, error } = useQuery({
    ...itemFindAllOptions(),
  });
  return { data, refetch, isLoading, isError, isSuccess, error };
};

export default useProducts;
