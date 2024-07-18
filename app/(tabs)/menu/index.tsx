import products from "@/assets/data/products";
import { FlatList } from "react-native";
import ProductListItem from "@/components/ProductListItem";
import { Stack } from "expo-router";

export default function Menu() {
  return (
    <>
      <Stack.Screen options={{ title: "Menu" }} />

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 8, padding: 10 }}
        columnWrapperStyle={{ gap: 8 }}
      />
    </>
  );
}
