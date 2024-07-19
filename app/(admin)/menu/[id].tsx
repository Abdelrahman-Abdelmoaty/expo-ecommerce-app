import { useLocalSearchParams, Stack, useRouter, Link } from "expo-router";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/contexts/CartProvider";
import { PizzaSize } from "@/constants/types";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

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
      <Stack.Screen
        options={{
          title: product.name,

          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={24}
                    color={Colors.light.tint}
                    style={{ marginRight: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
