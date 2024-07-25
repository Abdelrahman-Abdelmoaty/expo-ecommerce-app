import { TextInput, type TextInputProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export default function ThemedTextInput({ style, ...rest }: TextInputProps) {
  const inputBackground = useThemeColor("inputBackground");
  const inputText = useThemeColor("inputText");
  const inputPlaceholder = useThemeColor("inputPlaceholder");
  const inputBorder = useThemeColor("inputBorder");

  return (
    <TextInput
      {...rest}
      placeholderTextColor={inputPlaceholder}
      style={[
        {
          backgroundColor: inputBackground,
          color: inputText,
          borderColor: inputBorder,
        },
        styles.default,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: "LatoRegular",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
