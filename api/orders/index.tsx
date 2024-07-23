import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getOrders from "./get-admin-orders";
import getOrder from "./get-order";
import getUserOrders from "./get-user-orders";
import { useAuth } from "@/providers/AuthProvider";
import { InsertOrder, UpdateOrder } from "@/constants/types";
import insertOrder from "./insert-order";
import updateOrder from "./update-order";

export const useAdminOrdersList = ({ archived }: { archived: boolean }) => {
  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: () => getOrders({ archived }),
  });
};

export const useUserOrdersList = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("User is not logged in");
  }

  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getUserOrders(userId),
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: InsertOrder) => insertOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: UpdateOrder) => updateOrder(order),
    onSuccess: (order) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["order", order.id],
      });
    },
  });
};
