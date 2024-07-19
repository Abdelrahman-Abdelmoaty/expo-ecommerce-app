import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";

export default function OrdersScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: "Orders" }} />

      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
