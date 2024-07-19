import { CartItem, PizzaSize, Product } from "@/constants/types";
import { createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

interface CartType {
  items: CartItem[];
  addItem: (product: Product, size: PizzaSize) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: PizzaSize) => {
    const existingItem = items.find((item) => item.product_id === product.id && item.size === size);

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

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
