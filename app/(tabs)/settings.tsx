import { View, Text, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Settings</Text>
      <Text>Profile + Sign out will live here.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  h1: { fontSize: 24, fontWeight: "600" },
});
