import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useState } from "react";

import { defaultPizzaImage } from "@/components/ProductListItem";
import { useCart } from "@/providers/CartProvider";
import { Size } from "@/constants/types";
import { useProduct } from "@/api/products";
import RemoteImage from "@/components/RemoteImage";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedScrollView from "@/components/ui/ThemedScrollView";
import ThemedView from "@/components/ui/ThemedView";
import ThemedText from "@/components/ui/ThemedText";
import LoadingScreen from "@/components/ui/LoadingScreen";

const SIZES: Size[] = ["S", "M", "L", "XL"];

export default function ProductDetails() {
  const colorScheme = useColorScheme();

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
    return <LoadingScreen />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <ThemedScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: product.name }} />
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedText style={styles.sizeTitle}>Select size</ThemedText>
        <View style={styles.sizeContainer}>
          {SIZES.map((size) => (
            <Pressable
              key={size}
              style={[
                styles.size,
                {
                  backgroundColor:
                    selectedSize === size
                      ? colorScheme === "light"
                        ? "lightgray"
                        : "darkgray"
                      : "transparent",
                },
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <ThemedText
                key={size}
                style={[
                  styles.sizeText,
                  {
                    color: selectedSize === size ? "black" : "gray",
                  },
                ]}
              >
                {size}
              </ThemedText>
            </Pressable>
          ))}
        </View>
        <ThemedText style={styles.price}>${product.price}</ThemedText>
        <ThemedButton text="Add to cart" onPress={addToCart} />
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
  sizeTitle: {
    fontSize: 18,
    fontFamily: "LatoBlackItalic",
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
    fontFamily: "LatoBlack",
  },
  price: {
    marginTop: "auto",
    fontSize: 24,
    fontFamily: "LatoBlackItalic",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
