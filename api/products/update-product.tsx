import { UpdateProduct } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export default async function updateProduct(product: UpdateProduct) {
  if (!product.id) {
    throw new Error("Product ID is required");
  }

  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", product.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
