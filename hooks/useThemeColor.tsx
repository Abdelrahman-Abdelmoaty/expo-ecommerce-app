import { useColorScheme } from "react-native";

import colors from "@/constants/colors";

export function useThemeColor(
  colorName: keyof typeof colors.light & keyof typeof colors.dark
) {
  const theme = useColorScheme() ?? "light";

  return colors[theme][colorName];
}
