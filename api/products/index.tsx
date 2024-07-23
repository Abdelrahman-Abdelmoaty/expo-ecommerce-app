import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getProducts from "./get-products";
import getProduct from "./get-product";
import insertProduct from "./insert-product";
import { InsertProduct, Product, UpdateProduct } from "@/constants/types";
import deleteProduct from "./delete-product";
import updateProduct from "./update-product";

export const useProductsList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: InsertProduct) => insertProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: UpdateProduct) => updateProduct(product),
    onSuccess: (product) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["product", product.id],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Product["id"]) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
