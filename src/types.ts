export type MuscleGroup =
  | 'Chest' | 'Back' | 'Biceps' | 'Triceps'
  | 'Shoulders' | 'Legs' | 'Core' | 'Other';

export type Exercise = {
  id: string;
  name: string;
  muscle: MuscleGroup;
};

export type SetEntry = {
  reps: number;
  weightKg: number;
};

export type WorkoutEntry = {
  id: string;             // unique id for this exercise log line
  dateISO: string;        // e.g. '2025-08-21'
  muscle: MuscleGroup;
  exerciseId: string;
  exerciseName: string;
  sets: SetEntry[];       // e.g. [{reps:12, weightKg:20}, ...]
  notes?: string;
};

export type WorkoutDay = {
  dateISO: string;
  entries: WorkoutEntry[]; // all entries that day
};
