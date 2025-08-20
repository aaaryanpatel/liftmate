// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "bar-chart" : "bar-chart-outline"} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
