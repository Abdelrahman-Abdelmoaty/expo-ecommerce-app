import { Order } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export default async function getOrder(id: Order["id"]) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
