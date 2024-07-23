import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import OrderListItem from "@/components/OrderListItem";
import OrderDetailsListItem from "@/components/OrderDetailsListItem";
import { OrderStatus, OrderStatusList } from "@/constants/types";
import colors from "@/constants/colors";
import { useOrderDetails, useUpdateOrder } from "@/api/orders";
import updateOrder from "@/api/orders/update-order";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: order, error, isLoading } = useOrderDetails(+(id ?? 1));
  const { mutate } = useUpdateOrder();

  const updateOrder = (status: OrderStatus) => {
    if (!id) return;

    mutate(
      { id: +id, status: status },
      {
        onSuccess: () => {
          console.log("Order updated");
        },
        onError: (error) => {
          console.error("Error updating order", error);
        },
      }
    );
  };

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
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateOrder(status)}
                  style={{
                    borderColor: colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
