import { Link, Stack } from "expo-router";
import { View, StyleSheet, Alert } from "react-native";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "@/lib/supabase";
import ThemedView from "@/components/ui/ThemedView";
import Input from "@/components/ui/Input";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedText from "@/components/ui/ThemedText";
import HR from "@/components/ui/HR";

const SignInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),
  password: z.string({
    required_error: "Password is required",
  }),
});

export default function SignInScreen() {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (formFields: z.infer<typeof SignInSchema>) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: formFields.email,
      password: formFields.password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ThemedText style={styles.title}>Sign In</ThemedText>

      <View style={styles.form}>
        <FormProvider {...form}>
          <Input label="Email" name="email" placeholder="Email" />
          <Input
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
          />
          <ThemedButton
            text="Sign In"
            disabled={form.formState.isSubmitting}
            onPress={form.handleSubmit(onSubmit)}
            style={{ marginTop: 14 }}
          />
        </FormProvider>
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginVertical: 20,
          }}
        >
          <HR />
          <ThemedText
            style={{
              fontSize: 16,
              fontFamily: "LatoBold",
              alignSelf: "center",
            }}
          >
            Don't have an account?
          </ThemedText>
          <HR />
        </View>
        <Link href="/sign-up" asChild>
          <ThemedButton text="Sign Up" />
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "LatoBlack",
    alignSelf: "center",
    marginBottom: 40,
  },
  form: {
    gap: 5,
  },
});
