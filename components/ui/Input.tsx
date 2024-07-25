import { StyleSheet, type TextInputProps } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import ThemedTextInput from "./ThemedTextInput";

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  type?: "text" | "password";
} & TextInputProps;

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  defaultValue,
  ...props
}: InputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedTextInput
            {...props}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            secureTextEntry={type === "password"}
          />
        )}
        name={name}
        defaultValue={defaultValue}
      />
      {errors[name] && typeof errors[name].message === "string" && (
        <ThemedText style={styles.error}>{errors[name].message}</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 32,
    fontFamily: "LatoBlack",
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: "LatoBold",
    marginBottom: 4,
  },
  error: {
    color: "red",
    fontStyle: "italic",
  },
});
