import products from "../data/products";
import { FlatList } from "react-native";
import ProductListItem from "@/components/ProductListItem";

export default function Index() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 8, padding: 10 }}
      columnWrapperStyle={{ gap: 8 }}
    />
  );
}
