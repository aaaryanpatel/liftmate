import { useState } from 'react';
import { View, Text, Button, Platform, TextInput, FlatList, Pressable, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { EXERCISES } from '../../src/constants/exercise';
import { toISODate, prettyDate } from '../../src/utils/date';
import { useWorkoutStore } from '../../src/context/WorkoutContext';
import type { MuscleGroup } from '../../src/types';

const MUSCLES: MuscleGroup[] = ['Chest','Back','Biceps','Triceps','Shoulders','Legs','Core','Other'];

export default function Home() {
  const addEntry = useWorkoutStore(s => s.addEntry);

  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [muscle, setMuscle] = useState<MuscleGroup>('Biceps');
  const [exerciseId, setExerciseId] = useState(EXERCISES.find(e => e.muscle === 'Biceps')!.id);

  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('12');
  const [kg,   setKg]   = useState('10');
  const [notes, setNotes] = useState('');

  const filtered = EXERCISES.filter(e => e.muscle === muscle);

  const onChangeDate = (_: any, selected?: Date) => {
    setShowPicker(false);
    if (selected) setDate(selected);
  };

  const onLog = () => {
    const s = Math.max(1, Number(sets) || 0);
    const r = Math.max(1, Number(reps) || 0);
    const w = Math.max(0, Number(kg)   || 0);

    const chosen = EXERCISES.find(e => e.id === exerciseId);
    if (!chosen) {
      Alert.alert('Pick an exercise');
      return;
    }

    const dateISO = toISODate(date);
    addEntry({
      dateISO,
      muscle,
      exerciseId: chosen.id,
      exerciseName: chosen.name,
      sets: Array.from({ length: s }).map(() => ({ reps: r, weightKg: w })),
      notes: notes.trim() || undefined,
    });

    Alert.alert('Logged!', `${chosen.name} on ${prettyDate(dateISO)} (${s} × ${r} @ ${w}kg)`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <FlatList
        contentContainerStyle={{ padding: 16, gap: 16 }}
        data={[]}
        ListHeaderComponent={
          <View style={{ gap: 16 }}>
            {/* Date selector */}
            <View style={styles.card}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.dateText}>{prettyDate(toISODate(date))}</Text>
              <Button title="Change date" onPress={() => setShowPicker(true)} />
              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChangeDate}
                />
              )}
            </View>

            {/* Muscle chips */}
            <View style={styles.card}>
              <Text style={styles.label}>Muscle group</Text>
              <View style={styles.rowWrap}>
                {MUSCLES.map(m => (
                  <Pressable
                    key={m}
                    onPress={() => {
                      setMuscle(m);
                      const first = EXERCISES.find(e => e.muscle === m);
                      if (first) setExerciseId(first.id);
                    }}
                    style={[styles.chip, muscle === m && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, muscle === m && styles.chipTextActive]}>{m}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Exercise list (select one) */}
            <View style={styles.card}>
              <Text style={styles.label}>Exercise</Text>
              <View style={{ gap: 8 }}>
                {filtered.map(ex => (
                  <Pressable
                    key={ex.id}
                    onPress={() => setExerciseId(ex.id)}
                    style={[styles.exerciseRow, exerciseId === ex.id && styles.exerciseRowActive]}
                  >
                    <Text style={styles.exerciseText}>{ex.name}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Inputs */}
            <View style={styles.card}>
              <Text style={styles.label}>Sets / Reps / Kg</Text>
              <View style={styles.row}>
                <NumInput value={sets} setValue={setSets} placeholder="Sets" />
                <NumInput value={reps} setValue={setReps} placeholder="Reps" />
                <NumInput value={kg}   setValue={setKg}   placeholder="Kg" />
              </View>
              <TextInput
                placeholder="Notes (optional)"
                value={notes}
                onChangeText={setNotes}
                style={styles.notes}
                multiline
              />
              <Button title="Log workout" onPress={onLog} />
            </View>
          </View>
        }
        renderItem={() => null}
      />
    </SafeAreaView>
  );
}

function NumInput({
  value, setValue, placeholder,
}: { value: string; setValue: (v: string) => void; placeholder: string }) {
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      keyboardType="numeric"
      placeholder={placeholder}
      style={styles.numInput}
    />
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  label: { fontSize: 16, fontWeight: '600' },
  dateText: { fontSize: 18 },
  row: { flexDirection: 'row', gap: 12 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: '#f1f1f1' },
  chipActive: { backgroundColor: '#111' },
  chipText: { color: '#222' },
  chipTextActive: { color: '#fff' },
  exerciseRow: { padding: 12, borderRadius: 12, backgroundColor: '#f7f7f7' },
  exerciseRowActive: { backgroundColor: '#e0e0ff' },
  exerciseText: { fontSize: 15 },
  numInput: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 12, paddingHorizontal: 12, height: 44 },
  notes: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, minHeight: 44 },
});
