import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

// ⬇️ add these
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { tokenCache } from '../src/auth/tokenCache';
import { WorkoutProvider } from '../src/context/WorkoutContext';

const clerkKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}>
        <WorkoutProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="(tabs)" />
          </Stack>
          {/* If signed in → show tabs; else → redirect to sign-in */}
          <SignedIn>
            <Redirect href="/(tabs)/home" />
          </SignedIn>
          <SignedOut>
            <Redirect href="/sign-in" />
          </SignedOut>
        </WorkoutProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
