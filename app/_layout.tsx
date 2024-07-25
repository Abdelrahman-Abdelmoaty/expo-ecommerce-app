import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CartProvider from "@/providers/CartProvider";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { StyleSheet } from "react-native";
import ThemedView from "@/components/ui/ThemedView";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    LatoBlack: require("../assets/fonts/Lato/Lato-Black.ttf"),
    LatoBlackItalic: require("../assets/fonts/Lato/Lato-BlackItalic.ttf"),
    LatoBold: require("../assets/fonts/Lato/Lato-Bold.ttf"),
    LatoBoldItalic: require("../assets/fonts/Lato/Lato-BoldItalic.ttf"),
    LatoLight: require("../assets/fonts/Lato/Lato-Light.ttf"),
    LatoLightItalic: require("../assets/fonts/Lato/Lato-LightItalic.ttf"),
    LatoRegular: require("../assets/fonts/Lato/Lato-Regular.ttf"),
    LatoItalic: require("../assets/fonts/Lato/Lato-Italic.ttf"),
    LatoThin: require("../assets/fonts/Lato/Lato-Thin.ttf"),
    LatoThinItalic: require("../assets/fonts/Lato/Lato-ThinItalic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.safeContainer}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <Stack>
                <Stack.Screen
                  name="(user)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(admin)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(auth)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="+not-found" />
                <Stack.Screen
                  name="cart"
                  options={{
                    title: "Cart",
                    presentation: "modal",
                    animation: "slide_from_bottom",
                  }}
                />
              </Stack>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});
