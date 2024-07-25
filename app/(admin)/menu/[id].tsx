import { useLocalSearchParams, Stack, useRouter, Link } from "expo-router";
import { Text, StyleSheet, useColorScheme, Pressable } from "react-native";

import { useProduct } from "@/api/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import RemoteImage from "@/components/RemoteImage";
import ThemedView from "@/components/ui/ThemedView";
import ThemedScrollView from "@/components/ui/ThemedScrollView";
import ThemedText from "@/components/ui/ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import colors from "@/constants/colors";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();

  const { data: product, error, isLoading } = useProduct(+(id ?? 1));

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
                      color={colors[colorScheme ?? "light"].text}
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

        <ThemedText style={styles.price}>${product.price}</ThemedText>
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
    padding: 5,
    flex: 1,
    gap: 10,
  },
  price: {
    fontSize: 24,
    fontFamily: "LatoBlackItalic",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
