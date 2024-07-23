import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import OrderListItem from "@/components/OrderListItem";
import OrderDetailsListItem from "@/components/OrderDetailsListItem";
import { useOrderDetails } from "@/api/orders";
import useUpdateOrderSubscription from "@/hooks/useUpdateOrderSubscription";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: order, error, isLoading } = useOrderDetails(+(id ?? 1));

  useUpdateOrderSubscription({ id: +(id ?? 1) });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!order) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderDetailsListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});
