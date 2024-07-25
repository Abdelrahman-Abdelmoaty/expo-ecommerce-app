import React, { forwardRef } from "react";
import { Pressable, type PressableProps, StyleSheet, View } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedPressableProps = PressableProps & {
  children?: React.ReactNode;
};

const ThemedPressable = forwardRef<View, ThemedPressableProps>(
  ({ children, style, ...rest }, ref) => {
    const color = useThemeColor("background");

    return (
      <Pressable
        ref={ref}
        style={[{ backgroundColor: color }, styles.default, style]}
        {...rest}
      >
        {children}
      </Pressable>
    );
  }
);

export default ThemedPressable;

const styles = StyleSheet.create({
  default: {},
});
