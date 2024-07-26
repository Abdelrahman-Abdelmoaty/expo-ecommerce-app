import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useColorScheme } from "react-native";
import colors from "@/constants/colors";

export const TopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function OrdersTabs() {
  const colorScheme = useColorScheme();
  return (
    <TopTabs
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: colors[colorScheme ?? "light"].text,
        },
      }}
    />
  );
}
