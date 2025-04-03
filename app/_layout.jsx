import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(menus)" />
        <Stack.Screen name="(auth)" />
      </Stack>

    </ClerkProvider>
  )
}
