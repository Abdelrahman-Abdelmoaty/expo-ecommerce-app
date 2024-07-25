import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import colors from "../constants/colors";
import { Link, useSegments } from "expo-router";
import { Product, Tables } from "@/constants/types";
import RemoteImage from "./RemoteImage";
import ThemedText from "./ui/ThemedText";

export const defaultPizzaImage =
  "https://dxknvbnhhdsdnywyminl.supabase.co/storage/v1/object/sign/product-images/012d3b95-50ad-4650-b11b-844a668face3%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9kdWN0LWltYWdlcy8wMTJkM2I5NS01MGFkLTQ2NTAtYjExYi04NDRhNjY4ZmFjZTMgKDEpLnBuZyIsImlhdCI6MTcyMTkxMDI3OCwiZXhwIjoyMzUyNjMwMjc4fQ.OtiPLzXvGY91G8mt0SbvuPNZ4YAfz0XsEGONI4ihQhw&t=2024-07-25T12%3A24%3A35.922Z";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();
  const colorScheme = useColorScheme();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable
        style={{
          ...styles.container,
          backgroundColor: colors[colorScheme ?? "light"].background,
        }}
      >
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedText style={styles.title}>{product.name}</ThemedText>
        <ThemedText style={styles.price}>${product.price}</ThemedText>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 5,
    flex: 1,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 5,
  },

  title: {
    fontSize: 22,
    fontFamily: "LatoBlackItalic",
  },

  price: {
    fontSize: 18,
    fontFamily: "LatoBlackItalic",
  },
});
