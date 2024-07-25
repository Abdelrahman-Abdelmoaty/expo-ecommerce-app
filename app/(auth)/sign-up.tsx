import { TextInput, StyleSheet, Text, View, Alert } from "react-native";
import { Stack, Link } from "expo-router";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "@/lib/supabase";
import Input from "@/components/ui/Input";
import ThemedView from "@/components/ui/ThemedView";
import ThemedText from "@/components/ui/ThemedText";
import ThemedButton from "@/components/ui/ThemedButton";
import HR from "@/components/ui/HR";

const SignUpSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  }).email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignUpScreen() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (formFields: z.infer<typeof SignUpSchema>) => {
    const { error } = await supabase.auth.signUp({
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

      <ThemedText style={styles.title}>Sign Up</ThemedText>

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
            text="Sign Up"
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
            Already have an account?
          </ThemedText>
          <HR />
        </View>
        <Link href="/sign-in" asChild>
          <ThemedButton text="Sign In" />
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
