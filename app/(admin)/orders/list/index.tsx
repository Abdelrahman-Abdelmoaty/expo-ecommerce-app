import { FlatList, StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";

import OrderListItem from "@/components/OrderListItem";
import { useAdminOrdersList } from "@/api/orders";
import { supabase } from "@/lib/supabase";
import useInsertOrderSubscription from "@/hooks/useInsertOrderSubscription";
import LoadingScreen from "@/components/ui/LoadingScreen";
import EmptyScreen from "@/components/ui/EmptyScreen";
import ThemedView from "@/components/ui/ThemedView";

export default function OrdersScreen() {
  const { data, error, isLoading } = useAdminOrdersList({
    archived: false,
  });

  useInsertOrderSubscription();

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
