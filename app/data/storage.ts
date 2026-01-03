import AsyncStorage from '@react-native-async-storage/async-storage';
import { getExercisesByMuscleGroup } from './content';
import {
    DayOfWeek,
    DAYS_OF_WEEK,
    MuscleGroup,
    UserDayWorkout,
    UserExerciseConfig,
    UserWeeklySchedule,
    WorkoutLog
} from './types';

const STORAGE_KEYS = {
  WEEKLY_SCHEDULE: '@gymapp/weekly_schedule',
  WORKOUT_LOGS: '@gymapp/workout_logs',
  USER_PREFERENCES: '@gymapp/preferences',
};

// Create default empty schedule
export const createDefaultSchedule = (): UserWeeklySchedule => {
  const schedule: Partial<UserWeeklySchedule> = {};
  
  DAYS_OF_WEEK.forEach(day => {
    schedule[day] = {
      day,
      muscleGroups: [],
      exercises: [],
      isRestDay: true,
    };
  });
  
  return schedule as UserWeeklySchedule;
};

// Generate exercises for selected muscle groups
export const generateExercisesForMuscleGroups = (muscleGroups: MuscleGroup[]): UserExerciseConfig[] => {
  const exercises: UserExerciseConfig[] = [];
  const addedIds = new Set<string>();
  
  muscleGroups.forEach(group => {
    const groupExercises = getExercisesByMuscleGroup(group);
    // Add up to 3-4 exercises per muscle group
    const limit = Math.min(groupExercises.length, muscleGroups.length === 1 ? 5 : 3);
    
    groupExercises.slice(0, limit).forEach(ex => {
      if (!addedIds.has(ex.id)) {
        addedIds.add(ex.id);
        exercises.push({
          exerciseId: ex.id,
          sets: ex.defaultSets,
          reps: ex.defaultReps,
          completed: false,
        });
      }
    });
  });
  
  return exercises;
};

// Load user schedule from storage
export const loadUserSchedule = async (): Promise<UserWeeklySchedule> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.WEEKLY_SCHEDULE);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading schedule:', error);
  }
  return createDefaultSchedule();
};

// Save user schedule to storage
export const saveUserSchedule = async (schedule: UserWeeklySchedule): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.WEEKLY_SCHEDULE, JSON.stringify(schedule));
  } catch (error) {
    console.error('Error saving schedule:', error);
  }
};

// Update a single day's workout
export const updateDayWorkout = async (
  day: DayOfWeek, 
  muscleGroups: MuscleGroup[], 
  exercises?: UserExerciseConfig[],
  isRestDay: boolean = false
): Promise<UserWeeklySchedule> => {
  const schedule = await loadUserSchedule();
  
  schedule[day] = {
    day,
    muscleGroups: isRestDay ? [] : muscleGroups,
    exercises: isRestDay ? [] : (exercises || generateExercisesForMuscleGroups(muscleGroups)),
    isRestDay,
  };
  
  await saveUserSchedule(schedule);
  return schedule;
};

// Get today's workout
export const getTodayWorkout = async (): Promise<UserDayWorkout | null> => {
  const schedule = await loadUserSchedule();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek;
  return schedule[today] || null;
};

// Get current day of week
export const getCurrentDayOfWeek = (): DayOfWeek => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek;
};

// Load workout logs
export const loadWorkoutLogs = async (): Promise<WorkoutLog[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.WORKOUT_LOGS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading logs:', error);
  }
  return [];
};

// Save workout log
export const saveWorkoutLog = async (log: WorkoutLog): Promise<void> => {
  try {
    const logs = await loadWorkoutLogs();
    logs.unshift(log); // Add new log at beginning
    // Keep only last 100 logs
    const trimmedLogs = logs.slice(0, 100);
    await AsyncStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(trimmedLogs));
  } catch (error) {
    console.error('Error saving log:', error);
  }
};

// Get weekly stats
export const getWeeklyStats = async (): Promise<{ workoutsCompleted: number; totalExercises: number }> => {
  const logs = await loadWorkoutLogs();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const weekLogs = logs.filter(log => new Date(log.date) >= oneWeekAgo && log.completed);
  
  return {
    workoutsCompleted: weekLogs.length,
    totalExercises: weekLogs.reduce((sum, log) => sum + log.exercises.length, 0),
  };
};

// Check if app has been set up (has any non-rest days)
export const hasUserSetup = async (): Promise<boolean> => {
  const schedule = await loadUserSchedule();
  return DAYS_OF_WEEK.some(day => !schedule[day].isRestDay);
};

// Clear all data (for reset)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.WEEKLY_SCHEDULE,
      STORAGE_KEYS.WORKOUT_LOGS,
      STORAGE_KEYS.USER_PREFERENCES,
    ]);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
