import { useMutation, useQuery } from '@tanstack/react-query';
import { itemCreateMutation, itemFindAllOptions, itemRemoveMutation, itemUpdateMutation } from '../api-client/@tanstack/react-query.gen';

const useProducts = () => {
  const { data, refetch, isLoading, isError, isSuccess, error } = useQuery({
    ...itemFindAllOptions(),
  });

  const itemCreate = useMutation({
    ...itemCreateMutation(),
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: removeItem } = useMutation({ ...itemRemoveMutation() });

  const updateItem = useMutation({
    ...itemUpdateMutation(),
    onError: (error) => {
      console.log(error);
    },
  });

  return { data, refetch, isLoading, isError, isSuccess, error, itemCreate, removeItem, updateItem };
};

export default useProducts;
