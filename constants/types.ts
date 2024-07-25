import { Database } from "@/supabase/database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type User = Tables<"profiles">;

export type Product = Tables<"products">;
export type InsertProduct = InsertTables<"products">;
export type UpdateProduct = UpdateTables<"products">;

export type Order = Tables<"orders">;
export type InsertOrder = InsertTables<"orders">;
export type UpdateOrder = UpdateTables<"orders">;

export type OrderItem = {
  products: Tables<"products"> | null;
} & Tables<"order_items">;
export type InsertOrderItem = InsertTables<"order_items">;

export type Size = "S" | "M" | "L" | "XL";

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: Size;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  "PENDING",
  "DELIVERING",
  "DELIVERED",
];

export type OrderStatus = "PENDING" | "DELIVERING" | "DELIVERED";

export type Profile = {
  id: string;
  group: string;
};
