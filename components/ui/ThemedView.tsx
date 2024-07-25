import { View, type ViewProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedViewProps = ViewProps & {
  children?: React.ReactNode;
};

export default function ThemedView({
  children,
  style,
  ...rest
}: ThemedViewProps) {
  const color = useThemeColor("background");

  return (
    <View style={[{ backgroundColor: color }, styles.default, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  default: {},
});
