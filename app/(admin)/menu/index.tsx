import { FlatList, Pressable, Text } from "react-native";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import ProductListItem from "@/components/ProductListItem";
import colors from "@/constants/colors";
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
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
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
