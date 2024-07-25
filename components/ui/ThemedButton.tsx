import React, { forwardRef } from "react";
import {
  Text,
  Pressable,
  type PressableProps,
  ViewStyle,
  View,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedButtonProps = PressableProps & {
  text: string;
  style?: ViewStyle;
};

const ThemedButton = forwardRef<View, ThemedButtonProps>(
  ({ text, style, ...rest }, ref) => {
    const buttonTextColor = useThemeColor("buttonText");
    const buttonBackgroundColor = useThemeColor("buttonBackground");

    return (
      <Pressable
        {...rest}
        ref={ref}
        style={[
          {
            backgroundColor: buttonBackgroundColor,
            borderRadius: 5,
            opacity: rest.disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        <Text
          style={[
            {
              color: buttonTextColor,
              padding: 18,
              textAlign: "center",
              fontSize: 18,
              fontFamily: "LatoBold",
            },
          ]}
        >
          {text}
        </Text>
      </Pressable>
    );
  }
);

export default ThemedButton;
