import { Order } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export default async function getOrderItems(id: Order["id"]) {
  const { data, error } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
