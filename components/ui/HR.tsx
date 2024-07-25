import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";

export default function HR() {
  const color = useThemeColor("hr");

  return (
    <View
      style={{
        borderBottomColor: color,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1,
      }}
    />
  );
}
