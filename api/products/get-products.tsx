import { supabase } from "@/lib/supabase";

export default async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
