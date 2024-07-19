import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/contexts/CartProvider";
import { PizzaSize } from "@/constants/types";

const SIZES: PizzaSize[] = ["S", "M", "L", "XL"];

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const product = products.find((product) => product.id.toString() === id);

  const addToCart = () => {
    if (!product) {
      return;
    }

    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
      <Text style={styles.sizeTitle}>Select size</Text>
      <View style={styles.sizeContainer}>
        {SIZES.map((size) => (
          <Pressable
            key={size}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "#f0f0f0" : "#ffffff",
              },
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              key={size}
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    gap: 10,
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  size: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    marginTop: "auto",
    fontSize: 24,
    fontWeight: "600",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
