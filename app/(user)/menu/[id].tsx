import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";

import { defaultPizzaImage } from "@/components/ProductListItem";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { Size } from "@/constants/types";
import { useProduct } from "@/api/products";

const SIZES: Size[] = ["S", "M", "L", "XL"];

export default function ProductDetails() {
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<Size>("M");

  const { id } = useLocalSearchParams();
  if (typeof id !== "string") {
    return <Text>Invalid product id</Text>;
  }

  const { data: product, error, isLoading } = useProduct(+id);

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: product.name }} />
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
        />
        <Text style={styles.sizeTitle}>Select size</Text>
        <View style={styles.sizeContainer}>
          {SIZES.map((size) => (
            <Pressable
              key={size}
              style={[
                styles.size,
                {
                  backgroundColor:
                    selectedSize === size ? "#f0f0f0" : "#ffffff",
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
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
