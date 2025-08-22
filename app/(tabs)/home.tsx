import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Home</Text>
      <Text>Choose workout, date, reps, weight, and log it (coming next step).</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  h1: { fontSize: 24, fontWeight: "600" },
});
