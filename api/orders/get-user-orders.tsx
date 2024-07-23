import { User } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export default async function getUserOrders(id: User["id"]) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
