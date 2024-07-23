import { InsertOrderItem, Order } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export default async function insertOrderItems({
  orderItems,
}: {
  orderItems: InsertOrderItem[];
}) {
  const { data, error } = await supabase
    .from("order_items")
    .insert(orderItems)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
