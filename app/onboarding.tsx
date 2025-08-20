import { View, Text, StyleSheet } from "react-native";

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome to LiftMate</Text>
      <Text>We’ll collect name, weight, age, and goal here next.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8, justifyContent: "center" },
  h1: { fontSize: 24, fontWeight: "700" },
});
