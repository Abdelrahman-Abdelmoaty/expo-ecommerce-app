import { TextInput, StyleSheet, Text, View, Alert } from "react-native";
import { Stack, Link } from "expo-router";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";

const SignUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (formFields: z.infer<typeof SignUpSchema>) => {
    const { data, error } = await supabase.auth.signUp({
      email: formFields.email,
      password: formFields.password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign Up" }} />

      <Text style={styles.title}>Sign Up</Text>

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
              style={styles.input}
              secureTextEntry
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
        text="Sign Up"
        onPress={handleSubmit(onSubmit)}
      />

      <View>
        <Text style={{ alignSelf: "center" }}>Already have an account?</Text>
        <Link href="/sign-in" asChild>
          <Button text="Sign In" />
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
