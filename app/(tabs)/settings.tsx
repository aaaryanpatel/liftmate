import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorkoutStore } from '../../src/context/WorkoutContext';
import { useAuth, useUser } from '@clerk/clerk-expo';

export default function Settings() {
  const clearAll = useWorkoutStore(s => s.clearAll);
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  const onClear = () => {
    Alert.alert('Clear all data?', 'This removes your local workout history.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearAll },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <View style={styles.wrap}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Account</Text>
          <Text style={styles.info}>
            {isSignedIn ? `Signed in as ${user?.primaryEmailAddress?.emailAddress ?? user?.username ?? user?.id}` : 'Not signed in'}
          </Text>
          <Button title="Sign out" onPress={() => signOut()} />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Local data</Text>
          <Button title="Clear workout history" onPress={onClear} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 16, gap: 16 },
  title: { fontSize: 22, fontWeight: '800' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 8, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  label: { fontWeight: '700' },
  info: { color: '#555' },
});
