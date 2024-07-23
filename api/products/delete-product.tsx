import { Product } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export default async function deleteProduct(id: Product["id"]) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
