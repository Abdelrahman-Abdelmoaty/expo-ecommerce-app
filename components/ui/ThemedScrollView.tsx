import { ScrollView, type ScrollViewProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedScrollViewProps = ScrollViewProps & {
  children?: React.ReactNode;
};

export default function ThemedScrollView({
  children,
  style,
  ...rest
}: ThemedScrollViewProps) {
  const color = useThemeColor("background");

  return (
    <ScrollView
      style={[{ backgroundColor: color }, styles.default, style]}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  default: {},
});
