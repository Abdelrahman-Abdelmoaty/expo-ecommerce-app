import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import colors from "@/constants/colors";
import { OrderItem } from "@/constants/types";
import { defaultPizzaImage } from "./ProductListItem";
import RemoteImage from "./RemoteImage";
import ThemedView from "./ui/ThemedView";
import ThemedText from "./ui/ThemedText";

type OrderItemListItemProps = {
  item: OrderItem;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  if (!item.products) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <RemoteImage
        path={item.products.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <ThemedText style={styles.title}>{item.products.name}</ThemedText>
        <View style={styles.subtitleContainer}>
          <ThemedText style={styles.price}>
            ${item.products.price.toFixed(2)}
          </ThemedText>
          <ThemedText>Size: {item.size}</ThemedText>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontFamily: "LatoBold",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontFamily: "LatoBold",
    fontSize: 18,
  },
  price: {
    fontFamily: "LatoBlack",
  },
});

export default OrderItemListItem;
