import { InsertProduct } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export default async function createProduct(product: InsertProduct) {
  const { error } = await supabase.from("products").insert(product);

  if (error) {
    throw new Error(error.message);
  }
}
