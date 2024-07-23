import createOrderItem from "./insert-order-items";
import { InsertOrderItem, Order } from "@/constants/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderItems }: { orderItems: InsertOrderItem[] }) =>
      createOrderItem({ orderItems }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
