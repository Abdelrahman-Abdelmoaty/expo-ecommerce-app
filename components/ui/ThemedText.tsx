import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedTextProps = TextProps & {
  children: React.ReactNode;
};

export default function ThemedText({
  children,
  style,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor("text");

  return (
    <Text style={[{ color }, styles.default, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: "LatoRegular",
  },
});
