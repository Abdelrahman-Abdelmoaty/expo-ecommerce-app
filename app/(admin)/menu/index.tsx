import products from "@/assets/data/products";
import { FlatList, Pressable } from "react-native";
import ProductListItem from "@/components/ProductListItem";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function Menu() {
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
                    color={Colors.light.tint}
                    style={{ marginRight: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

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
