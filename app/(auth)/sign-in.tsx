import Button from "@/components/Button";
import { Link, Stack } from "expo-router";
import { View, TextInput, StyleSheet, Text, Alert } from "react-native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (formFields: z.infer<typeof SignInSchema>) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formFields.email,
      password: formFields.password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    }

    // console.log("User", data);
  };

  useEffect(() => {
    console.log(isSubmitting);
  }, [isSubmitting]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign In" }} />

      <Text style={styles.title}>Sign In</Text>

      <View>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Email"
              style={styles.input}
            />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message?.toString()}</Text>
        )}
      </View>

      <View>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
          )}
          name="password"
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.error}>
            {errors.password.message?.toString()}
          </Text>
        )}
      </View>

      <Button
        disabled={isSubmitting}
        text="Sign In"
        onPress={handleSubmit(onSubmit)}
      />

      <View>
        <Text style={{ alignSelf: "center" }}>Don't have an account?</Text>
        <Link href="/sign-up" asChild>
          <Button text="Sign Up" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
  },
  error: {
    color: "red",
  },
});
