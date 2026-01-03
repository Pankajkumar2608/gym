import { EXERCISES } from '@/app/data/content';
import { getCurrentDayOfWeek, loadUserSchedule } from '@/app/data/storage';
import { UserWeeklySchedule } from '@/app/data/types';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [schedule, setSchedule] = useState<UserWeeklySchedule | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const today = getCurrentDayOfWeek();
  const todayWorkout = schedule?.[today];

  const loadData = useCallback(async () => {
    const data = await loadUserSchedule();
    setSchedule(data);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getExerciseCount = () => {
    return todayWorkout?.exercises.length || 0;
  };

  const getEstimatedTime = () => {
    const count = getExerciseCount();
    return count * 8; // ~8 mins per exercise average
  };

  const getMuscleGroupsText = () => {
    if (todayWorkout?.isRestDay || !todayWorkout?.muscleGroups.length) {
      return 'Rest Day';
    }
    return todayWorkout.muscleGroups.join(' & ');
  };

  // Get upcoming workouts
  const getUpcomingDays = () => {
    if (!schedule) return [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
    const todayIndex = days.indexOf(today);
    const upcoming = [];

    for (let i = 1; i <= 3; i++) {
      const dayIndex = (todayIndex + i) % 7;
      const day = days[dayIndex];
      const workout = schedule[day];
      upcoming.push({
        day,
        workout,
        isRestDay: workout.isRestDay,
        muscleGroups: workout.muscleGroups,
      });
    }
    return upcoming;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#bb86fc" />
        }
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text variant="headlineMedium" style={styles.greeting}>{getGreeting()}</Text>
            <Text variant="titleMedium" style={styles.subtitle}>
              {todayWorkout?.isRestDay ? "It's rest day! Recover well 😴" : "Time to crush it! 💪"}
            </Text>
          </View>
          <Avatar.Icon size={50} icon="account" style={{ backgroundColor: '#333' }} />
        </View>

        {/* Today's Day Badge */}
        <View style={styles.dayBadge}>
          <Text style={styles.dayBadgeText}>{today.toUpperCase()}</Text>
        </View>

        {/* Hero Card: Today's Workout */}
        <Card style={styles.heroCard} mode="elevated">
          <LinearGradient
            colors={todayWorkout?.isRestDay ? ['#2d2d2d', '#1a1a1a'] : ['#6200ee', '#3700b3']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Card.Content>
              <Text variant="labelLarge" style={styles.cardLabel}>
                {todayWorkout?.isRestDay ? '😴 REST DAY' : "🔥 TODAY'S WORKOUT"}
              </Text>
              <Text variant="headlineSmall" style={styles.cardTitle}>
                {getMuscleGroupsText()}
              </Text>
              {!todayWorkout?.isRestDay && (
                <Text variant="bodyMedium" style={styles.cardSubtitle}>
                  {getEstimatedTime()} mins • {getExerciseCount()} Exercises
                </Text>
              )}

              {todayWorkout?.isRestDay ? (
                <Button
                  mode="outlined"
                  style={styles.outlineButton}
                  textColor="#fff"
                  onPress={() => router.push(`/day-setup/${today}` as any)}
                >
                  Add Workout
                </Button>
              ) : (
                <View style={styles.buttonRow}>
                  <Button
                    mode="contained"
                    style={styles.startButton}
                    buttonColor="#03dac6"
                    textColor="#000"
                    icon="play-circle"
                    onPress={() => router.push(`/workout/${today}` as any)}
                  >
                    Start Workout
                  </Button>
                  <IconButton
                    icon="pencil"
                    mode="contained"
                    containerColor="rgba(255,255,255,0.2)"
                    iconColor="#fff"
                    size={20}
                    onPress={() => router.push(`/day-setup/${today}` as any)}
                  />
                </View>
              )}
            </Card.Content>
          </LinearGradient>
        </Card>

        {/* Quick Preview of Exercises */}
        {!todayWorkout?.isRestDay && todayWorkout?.exercises.length > 0 && (
          <View style={styles.exercisePreview}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Today's Exercises</Text>
            {todayWorkout.exercises.slice(0, 3).map((ex, index) => {
              const exercise = EXERCISES[ex.exerciseId];
              if (!exercise) return null;
              return (
                <View key={index} style={styles.exerciseRow}>
                  <View style={styles.exerciseNumber}>
                    <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseSets}>{ex.sets} sets × {ex.reps}</Text>
                  </View>
                </View>
              );
            })}
            {todayWorkout.exercises.length > 3 && (
              <Text style={styles.moreText}>+{todayWorkout.exercises.length - 3} more exercises</Text>
            )}
          </View>
        )}

        {/* Upcoming Schedule */}
        <Text variant="titleLarge" style={[styles.sectionTitle, { marginTop: 24 }]}>
          Coming Up
        </Text>
        <View style={styles.upcomingContainer}>
          {getUpcomingDays().map((item, index) => (
            <Card
              key={index}
              style={[styles.upcomingCard, item.isRestDay && styles.restCard]}
              onPress={() => router.push(`/day-setup/${item.day}` as any)}
            >
              <Card.Content style={styles.upcomingContent}>
                <Text style={styles.upcomingDay}>{item.day.slice(0, 3)}</Text>
                <Text style={styles.upcomingMuscle}>
                  {item.isRestDay ? '💤' : item.muscleGroups.join(', ') || 'Not set'}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <Text variant="titleLarge" style={[styles.sectionTitle, { marginTop: 24 }]}>
          Quick Actions
        </Text>
        <View style={styles.actionsContainer}>
          <Card style={styles.actionCard} onPress={() => router.push('/(tabs)/schedule')}>
            <Card.Content style={styles.actionContent}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(187, 134, 252, 0.2)' }]}>
                <Text style={{ fontSize: 24 }}>📅</Text>
              </View>
              <Text style={styles.actionLabel}>Edit Schedule</Text>
            </Card.Content>
          </Card>
          <Card style={styles.actionCard} onPress={() => router.push('/(tabs)/progress')}>
            <Card.Content style={styles.actionContent}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(3, 218, 198, 0.2)' }]}>
                <Text style={{ fontSize: 24 }}>📊</Text>
              </View>
              <Text style={styles.actionLabel}>View Progress</Text>
            </Card.Content>
          </Card>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#bbb',
    marginTop: 4,
  },
  dayBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(187, 134, 252, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 16,
  },
  dayBadgeText: {
    color: '#bb86fc',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  heroCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 8,
  },
  gradient: {
    padding: 24,
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1.5,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 26,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  startButton: {
    borderRadius: 30,
    flex: 1,
    marginRight: 12,
  },
  outlineButton: {
    borderRadius: 30,
    borderColor: 'rgba(255,255,255,0.3)',
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  exercisePreview: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 16,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#bb86fc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  exerciseSets: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  moreText: {
    color: '#bb86fc',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  upcomingContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  upcomingCard: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
  },
  restCard: {
    opacity: 0.6,
  },
  upcomingContent: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  upcomingDay: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  upcomingMuscle: {
    color: '#888',
    fontSize: 11,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
  },
  actionContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});
