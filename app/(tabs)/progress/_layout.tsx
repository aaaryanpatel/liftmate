import { Stack } from 'expo-router';

export default function ProgressLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'History' , headerShown: false}} />
      {/* Open the workout day like a modal */}
      <Stack.Screen
        name="[date]"
        options={{ title: 'Workout Day', presentation: 'modal' }}
      />
    </Stack>
  );
}
