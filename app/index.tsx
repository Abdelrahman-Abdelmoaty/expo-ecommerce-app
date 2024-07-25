import { StyleSheet } from "react-native";
import { Link, Redirect, Stack } from "expo-router";

import ThemedView from "@/components/ui/ThemedView";
import ThemedText from "@/components/ui/ThemedText";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedLogo from "@/components/ui/ThemedLogo";
import { useAuth } from "@/providers/AuthProvider";

export default function HomeScreen() {
  const { session, isAdmin } = useAuth();

  if (session && !isAdmin) {
    return <Redirect href="/(user)/menu" />;
  }

  if (session && isAdmin) {
    return <Redirect href="/(admin)/" />;
  }

  return (
    <>
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />

        <ThemedLogo style={styles.logo} />

        <ThemedText style={styles.text}>
          Welcome to the ultimate shoes store!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.button}>
        <Link href="/sign-in" asChild>
          <ThemedButton text="Continue" />
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 10 },
  logo: { alignSelf: "center" },
  text: {
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "LatoBlackItalic",
    fontSize: 30,
  },
  button: { padding: 10 },
});
