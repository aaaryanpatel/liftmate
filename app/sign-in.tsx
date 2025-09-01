// app/sign-in.tsx
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useOAuth, useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function SignIn() {
  const { isSignedIn } = useAuth();
  const { startOAuthFlow, isLoading } = useOAuth({ strategy: "oauth_google" });

  if (isSignedIn) return <Redirect href="/" />;

  async function onGoogle() {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId && setActive) await setActive({ session: createdSessionId });
    } catch (e: any) {
      Alert.alert("Sign in failed", e?.message ?? "Try again.");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12, padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: "700" }}>LiftMate</Text>
      <TouchableOpacity
        onPress={onGoogle}
        disabled={isLoading}
        style={{ paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, borderWidth: 1 }}
      >
        {isLoading ? <ActivityIndicator /> : <Text>Continue with Google</Text>}
      </TouchableOpacity>
    </View>
  );
}
