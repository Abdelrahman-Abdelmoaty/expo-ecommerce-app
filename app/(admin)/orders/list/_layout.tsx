import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

export const TopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function OrdersTabs() {
  return <TopTabs />;
}

// <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
{
  /* </SafeAreaView> */
}
