import { supabase } from "@/lib/supabase";

export default async function getAdminOrders({
  archived,
}: {
  archived: boolean;
}) {
  const statuses = archived
    ? ["DELIVERED"]
    : ["NEW", "PENDING", "COMPLETED", "COOKING", "DELIVERING"];

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .in("status", statuses);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
