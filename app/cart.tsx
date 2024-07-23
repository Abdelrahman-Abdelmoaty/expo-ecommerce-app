import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";

export default function CartScreen() {
  const { items, total, checkout } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text style={styles.total}>Total: ${total}</Text>
      <Button text="Checkout" onPress={checkout} />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    padding: 10,
  },
  total: {
    marginTop: "auto",
    fontWeight: "bold",
  },
});
