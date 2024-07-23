import { FlatList, Text } from "react-native";
import { Stack } from "expo-router";

import ProductListItem from "@/components/ProductListItem";
import { useProductsList } from "@/api/products";

export default function Menu() {
  const { data, error, isLoading } = useProductsList();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Menu" }} />

      <FlatList
        data={data}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 8, padding: 10 }}
        columnWrapperStyle={{ gap: 8 }}
      />
    </>
  );
}
