import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

import OrderListItem from "@/components/OrderListItem";
import { useAdminOrdersList } from "@/api/orders";
import LoadingScreen from "@/components/ui/LoadingScreen";
import EmptyScreen from "@/components/ui/EmptyScreen";
import ThemedView from "@/components/ui/ThemedView";

export default function OrdersScreen() {
  const { data, error, isLoading } = useAdminOrdersList({
    archived: true,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Archive" }} />

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
