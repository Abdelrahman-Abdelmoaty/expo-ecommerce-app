import { UpdateOrder } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export default async function updateOrder(order: UpdateOrder) {
  if (!order.id) {
    throw new Error("Order ID is required");
  }

  const { data, error } = await supabase
    .from("orders")
    .update(order)
    .eq("id", order.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
