import { Link, Stack } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import colors from "@/constants/colors";

export default function _layout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart">
            <Entypo
              name="shopping-bag"
              size={24}
              color={colors[colorScheme ?? "light"].text}
            />
          </Link>
        ),
      }}
    />
  );
}
