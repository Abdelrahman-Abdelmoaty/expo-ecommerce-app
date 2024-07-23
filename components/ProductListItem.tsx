import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import colors from "../constants/colors";
import { Link, useSegments } from "expo-router";
import { Product, Tables } from "@/constants/types";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  price: {
    color: colors.light.tint,
    fontWeight: "700",
  },
});
