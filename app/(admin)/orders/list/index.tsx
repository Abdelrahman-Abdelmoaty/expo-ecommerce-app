import { FlatList, StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";

import OrderListItem from "@/components/OrderListItem";
import { useAdminOrdersList } from "@/api/orders";
import { supabase } from "@/lib/supabase";
import useInsertOrderSubscription from "@/hooks/useInsertOrderSubscription";

export default function OrdersScreen() {
  const { data, error, isLoading } = useAdminOrdersList({
    archived: false,
  });

  useInsertOrderSubscription();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: "Orders" }} />

      <FlatList
        data={data}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
