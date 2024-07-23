import { Order } from "@/constants/types";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useUpdateOrderSubscription({
  id,
}: {
  id: Order["id"];
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orders = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["orders", { id }],
          });
        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
}
