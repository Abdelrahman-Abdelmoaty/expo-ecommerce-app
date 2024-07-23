import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

import OrderListItem from "@/components/OrderListItem";
import { useAdminOrdersList } from "@/api/orders";

export default function OrdersScreen() {
  const { data, error, isLoading } = useAdminOrdersList({
    archived: true,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: "Archive" }} />

      <FlatList
        data={data}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
