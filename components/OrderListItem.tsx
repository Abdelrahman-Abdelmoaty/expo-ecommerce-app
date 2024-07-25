import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, useSegments } from "expo-router";
import { Order } from "@/constants/types";
import ThemedView from "./ui/ThemedView";
import ThemedPressable from "./ui/ThemedPressable";
import ThemedText from "./ui/ThemedText";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

export default function OrderListItem({ order }: OrderListItemProps) {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <ThemedPressable style={styles.container}>
        <View>
          <ThemedText style={styles.title}>Order #{order.id}</ThemedText>
          <ThemedText style={styles.time}>
            {dayjs(order.created_at).fromNow()}
          </ThemedText>
        </View>
        <ThemedText style={styles.status}>{order.status}</ThemedText>
      </ThemedPressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "LatoBold",
    marginVertical: 5,
  },
  time: {
    color: "gray",
    fontFamily: "LatoRegular",
  },
  status: {
    fontFamily: "LatoBold",
    marginRight: 10,
  },
});
