// app/onboarding.tsx
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function Onboarding() {
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");        // yyyy-mm-dd for now
  const [height, setHeight] = useState("");  // cm
  const [weight, setWeight] = useState("");  // kg
  const [goal, setGoal] = useState("");

  async function finish() {
    if (!gender || !dob || !height || !weight || !goal) {
      Alert.alert("Missing info", "Please fill all fields.");
      return;
    }
    // local save; later we’ll call the API
    await AsyncStorage.setItem("lm_onboarding_done", "1");
    router.replace("/(tabs)/home");
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Let’s set you up</Text>

      <Text>Gender</Text>
      <TextInput value={gender} onChangeText={setGender} placeholder="male | female | other" style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />

      <Text>Date of birth</Text>
      <TextInput value={dob} onChangeText={setDob} placeholder="YYYY-MM-DD" style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />

      <Text>Height (cm)</Text>
      <TextInput keyboardType="numeric" value={height} onChangeText={setHeight} placeholder="175" style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />

      <Text>Weight (kg)</Text>
      <TextInput keyboardType="numeric" value={weight} onChangeText={setWeight} placeholder="70" style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />

      <Text>Goal</Text>
      <TextInput value={goal} onChangeText={setGoal} placeholder="strength | hypertrophy | endurance | general" style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />

      <TouchableOpacity onPress={finish} style={{ marginTop: 12, padding: 14, borderWidth: 1, borderRadius: 10, alignItems: "center" }}>
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
