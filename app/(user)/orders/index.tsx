import { FlatList, StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";

import OrderListItem from "@/components/OrderListItem";
import { useUserOrdersList } from "@/api/orders";
import LoadingScreen from "@/components/ui/LoadingScreen";
import EmptyScreen from "@/components/ui/EmptyScreen";
import ThemedView from "@/components/ui/ThemedView";

export default function OrdersScreen() {
  const { data, error, isLoading } = useUserOrdersList();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Orders" }} />

      {data && data.length === 0 ? (
        <EmptyScreen />
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={{ gap: 8, padding: 5 }}
          renderItem={({ item }) => <OrderListItem order={item} />}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
