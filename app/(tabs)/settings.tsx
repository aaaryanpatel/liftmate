// app/(tabs)/settings.tsx
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function Settings() {
  const { signOut } = useAuth();

  async function doSignOut() {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Sign out failed");
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Settings</Text>
      <TouchableOpacity onPress={doSignOut} style={{ borderWidth: 1, borderRadius: 10, padding: 12, alignSelf: "flex-start" }}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
