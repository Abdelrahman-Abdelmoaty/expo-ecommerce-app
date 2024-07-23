import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useInsertOrderSubscription() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orders = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["orders"],
          });
        }
      )
      .subscribe();
    return () => {
      orders.unsubscribe();
    };
  }, []);
}
