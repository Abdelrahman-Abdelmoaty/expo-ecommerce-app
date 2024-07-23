import { InsertOrder } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export default async function insertOrder(order: InsertOrder) {
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
