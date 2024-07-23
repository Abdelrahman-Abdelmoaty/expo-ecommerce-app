import { Product } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export default async function getProduct(id: Product["id"]) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
