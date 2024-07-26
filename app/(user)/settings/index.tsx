import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import ThemedButton from "@/components/ui/ThemedButton";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, padding: 5, gap: 5 }}>
      <Stack.Screen options={{ title: "Settings" }} />

      <Link href="/(user)/menu" asChild>
        <ThemedButton text="User" />
      </Link>
      <Link href="/(admin)/menu" asChild>
        <ThemedButton text="Admin" />
      </Link>
      <ThemedButton
        style={{ marginTop: "auto" }}
        text="Sign out"
        onPress={() => supabase.auth.signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
