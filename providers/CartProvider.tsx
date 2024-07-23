import { CartItem, Size, Product, Tables, Order } from "@/constants/types";
import { createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "@/api/order-Items";
import { useAuth } from "./AuthProvider";

interface CartType {
  items: CartItem[];
  addItem: (product: Product, size: Size) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { session } = useAuth();

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();

  const router = useRouter();

  const addItem = (product: Product, size: Size) => {
    const existingItem = items.find(
      (item) => item.product_id === product.id && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      size,
      product_id: product.id,
      quantity: 1,
    };

    setItems([...items, newCartItem]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + amount };
      }

      return item;
    });

    setItems(newItems.filter((item) => item.quantity > 0));
  };

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const checkout = () => {
    const userId = session?.user.id;
    if (!userId) return;

    insertOrder(
      {
        total,
        user_id: userId,
      },
      {
        onSuccess: (order) => {
          insertOrderItemsUtil(order);
        },
      }
    );
  };

  const insertOrderItemsUtil = async (order: Order) => {
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      size: item.size,
      quantity: item.quantity,
    }));

    insertOrderItems(
      { orderItems },
      {
        onSuccess: () => {
          setItems([]);
          router.push(`/(user)/orders/${order.id}`);
        },
      }
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
