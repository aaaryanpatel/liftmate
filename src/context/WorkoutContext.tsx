import React, { useEffect } from 'react';
import { create } from 'zustand';
import { getJSON, setJSON, remove } from '../utils/storage';
import { WorkoutEntry, WorkoutDay, MuscleGroup, SetEntry } from '../types';
// Simple UUID generator for React Native
const generateId = () => {
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

type Store = {
  days: Record<string, WorkoutDay>; // key = dateISO
  addEntry: (args: {
    dateISO: string;
    muscle: MuscleGroup;
    exerciseId: string;
    exerciseName: string;
    sets: SetEntry[];
    notes?: string;
  }) => void;
  clearAll: () => void;
  hydrate: () => Promise<void>;
};

export const useWorkoutStore = create<Store>((set, get) => ({
  days: {},

  addEntry: ({ dateISO, muscle, exerciseId, exerciseName, sets, notes }) => {
    const entry: WorkoutEntry = {
      id: generateId(),
      dateISO,
      muscle,
      exerciseId,
      exerciseName,
      sets,
      notes,
    };
    const prev = get().days;
    const day = prev[dateISO] ?? { dateISO, entries: [] };
    const next = {
      ...prev,
      [dateISO]: { ...day, entries: [entry, ...day.entries] },
    };
    set({ days: next });
    setJSON('lm.days', next).catch(() => {});
  },

  clearAll: () => {
    set({ days: {} });
    remove('lm.days').catch(() => {});
  },

  hydrate: async () => {
    const saved = await getJSON<Record<string, WorkoutDay>>('lm.days', {});
    set({ days: saved });
  },
}));

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useWorkoutStore(s => s.hydrate);
  useEffect(() => { hydrate(); }, [hydrate]);
  return <>{children}</>;
}

