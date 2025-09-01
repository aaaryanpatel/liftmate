import { Link } from 'expo-router';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorkoutStore } from '../../../src/context/WorkoutContext';
import { prettyDate } from '../../../src/utils/date';

export default function Progress() {
  const days = useWorkoutStore(s => s.days);
  const dates = Object.keys(days).sort((a, b) => (a < b ? 1 : -1)); // newest first

  if (dates.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No history yet</Text>
          <Text style={styles.emptyText}>Log your first workout from Home.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <FlatList
        data={dates}
        keyExtractor={(d) => d}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item: dateISO }) => {
          const totalEntries = days[dateISO].entries.length;
          const groups = groupCountByMuscle(days[dateISO].entries);
          return (
            <Link href={`/(tabs)/progress/${dateISO}`} asChild>
              <Pressable style={styles.card}>
                <Text style={styles.date}>{prettyDate(dateISO)}</Text>
                <Text style={styles.meta}>{totalEntries} exercise{totalEntries !== 1 ? 's' : ''}</Text>
                <View style={styles.rowWrap}>
                  {Object.entries(groups).map(([m, n]) => (
                    <View key={m} style={styles.badge}><Text style={styles.badgeTxt}>{m} • {n}</Text></View>
                  ))}
                </View>
              </Pressable>
            </Link>
          );
        }}
      />
    </SafeAreaView>
  );
}

function groupCountByMuscle(entries: any[]) {
  return entries.reduce((acc, e) => {
    acc[e.muscle] = (acc[e.muscle] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyTitle: { fontSize: 20, fontWeight: '700' },
  emptyText: { color: '#666' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 8, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  date: { fontSize: 18, fontWeight: '700' },
  meta: { color: '#666' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  badge: { backgroundColor: '#f1f1f1', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  badgeTxt: { fontSize: 12, color: '#333' },
});
