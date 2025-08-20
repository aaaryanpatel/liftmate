// app/_layout.tsx
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "@/components/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {}, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Tabs shell */}
      <Stack.Screen name="(tabs)" />
      {/* Standalone screens */}
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="workout/[id]" options={{ headerShown: true, title: "Workout" }} />
    </Stack>
  );
}
