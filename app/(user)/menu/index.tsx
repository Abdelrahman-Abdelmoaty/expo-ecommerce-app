import { FlatList, Text } from "react-native";
import { Stack } from "expo-router";

import ProductListItem from "@/components/ProductListItem";
import { useProductsList } from "@/api/products";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Menu() {
  const { data, error, isLoading } = useProductsList();

  if (isLoading) {
    return <LoadingScreen />;
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
        contentContainerStyle={{ gap: 8, padding: 5 }}
        columnWrapperStyle={{ gap: 8 }}
      />
    </>
  );
}
