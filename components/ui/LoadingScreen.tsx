import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import ThemedView from "./ThemedView";
import colors from "@/constants/colors";

export default function LoadingScreen() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={[styles.container, styles.horizontal]}>
      <ActivityIndicator color={colors[colorScheme ?? "light"].text} />
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
