import { useLocalSearchParams, Stack, useRouter, Link } from "expo-router";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import { useProduct } from "@/api/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useCart } from "@/providers/CartProvider";
import { Size } from "@/constants/types";
import colors from "@/constants/colors";
import RemoteImage from "@/components/RemoteImage";

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { addItem } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<Size>("M");

  const { data: product, error, isLoading } = useProduct(+(id ?? 1));

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
                    color={colors.light.tint}
                    style={{ marginRight: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <RemoteImage
        path={product.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
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
