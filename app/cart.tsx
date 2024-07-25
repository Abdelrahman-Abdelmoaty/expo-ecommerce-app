import { StyleSheet, Text, View, FlatList, Platform } from "react-native";

import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedText from "@/components/ui/ThemedText";

export default function CartScreen() {
  const { items, total, checkout } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <ThemedText style={styles.total}>Total: ${total}</ThemedText>
      <ThemedButton text="Checkout" onPress={checkout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  total: {
    marginTop: "auto",
    fontSize: 18,
    fontFamily: "LatoBlack",
    marginBottom: 10,
  },
});
