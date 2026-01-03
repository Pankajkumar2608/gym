export type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Cardio';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const DAYS_OF_WEEK: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const MUSCLE_GROUPS: MuscleGroup[] = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio'];

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup[];
  description: string;
  steps: string[];
  tips: string[];
  image?: string;
  videoUrl?: string;
  defaultSets: number;
  defaultReps: string;
  gif?: string;
  thumbnail?: string;
}

export interface UserExerciseConfig {
  exerciseId: string;
  sets: number;
  reps: string;
  weight?: number;
  completed?: boolean;
}

export interface UserDayWorkout {
  day: DayOfWeek;
  muscleGroups: MuscleGroup[];
  exercises: UserExerciseConfig[];
  isRestDay: boolean;
}

export type UserWeeklySchedule = Record<DayOfWeek, UserDayWorkout>;

export interface RoutineDay {
  id: string;
  title: string;
  exercises: string[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  days: RoutineDay[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface WorkoutLog {
  id: string;
  date: string;
  day: DayOfWeek;
  exercises: UserExerciseConfig[];
  duration?: number;
  completed: boolean;
}
