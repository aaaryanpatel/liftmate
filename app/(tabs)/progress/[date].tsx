import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, SectionList, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorkoutStore } from '../../../src/context/WorkoutContext';
import { prettyDate } from '../../../src/utils/date';

export default function DayDetail() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const router = useRouter();
  const day = useWorkoutStore(s => s.days[date || '']);

  if (!date || !day) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No data</Text>
          <Button title="Back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const sections = groupByMuscle(day.entries);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.exerciseName}</Text>
            <Text style={styles.meta}>
              {item.sets.length} set{item.sets.length !== 1 ? 's' : ''} • {item.sets[0]?.reps ?? 0} reps • {item.sets[0]?.weightKg ?? 0} kg
            </Text>
            {item.notes ? <Text style={styles.notes}>“{item.notes}”</Text> : null}
          </View>
        )}
        ListHeaderComponent={<Text style={styles.dateBig}>{prettyDate(date)}</Text>}
      />
    </SafeAreaView>
  );
}

function groupByMuscle(entries: any[]) {
  const map = new Map<string, any[]>();
  for (const e of entries) {
    if (!map.has(e.muscle)) map.set(e.muscle, []);
    map.get(e.muscle)!.push(e);
  }
  return Array.from(map.entries()).map(([muscle, items]) => ({
    title: muscle,
    data: items,
  }));
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyTitle: { fontSize: 20, fontWeight: '700' },
  dateBig: { fontSize: 20, fontWeight: '800', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 4, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  name: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#666' },
  notes: { marginTop: 4, fontStyle: 'italic', color: '#333' },
});
