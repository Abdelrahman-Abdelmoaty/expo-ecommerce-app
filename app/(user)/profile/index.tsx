import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function profile() {
  return (
    <View>
      <Stack.Screen options={{ title: "profile" }} />

      <Text>profile screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
