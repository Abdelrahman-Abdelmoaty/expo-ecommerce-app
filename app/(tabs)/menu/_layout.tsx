import { Link, Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => <Link href="/cart">Cart</Link>,
      }}
    />
  );
}
