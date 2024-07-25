import { View, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { CartItem } from "@/constants/types";
import { defaultPizzaImage } from "./ProductListItem";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "@/providers/CartProvider";
import RemoteImage from "./RemoteImage";
import ThemedView from "./ui/ThemedView";
import ThemedText from "./ui/ThemedText";

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useCart();
  return (
    <ThemedView style={styles.container}>
      <RemoteImage
        path={cartItem.product.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <ThemedText style={styles.title}>{cartItem.product.name}</ThemedText>
        <View style={styles.subtitleContainer}>
          <ThemedText style={styles.price}>
            ${cartItem.product.price.toFixed(2)}
          </ThemedText>
          <ThemedText style={{ fontFamily: "LatoBold" }}>
            Size: {cartItem.size}
          </ThemedText>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />

        <ThemedText style={styles.quantity}>{cartItem.quantity}</ThemedText>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    aspectRatio: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "LatoBlack",
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    marginRight: 10,
  },
  quantity: {
    fontFamily: "LatoBlack",
    fontSize: 18,
  },
  price: {
    fontFamily: "LatoBlack",
  },
});

export default CartListItem;
