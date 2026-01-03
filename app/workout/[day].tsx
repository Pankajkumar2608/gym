import { EXERCISES } from '@/app/data/content';
import { loadUserSchedule, saveWorkoutLog } from '@/app/data/storage';
import { DayOfWeek, UserExerciseConfig, WorkoutLog } from '@/app/data/types';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, ProgressBar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WorkoutScreen() {
    const { day } = useLocalSearchParams<{ day: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [exercises, setExercises] = useState<UserExerciseConfig[]>([]);
    const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [startTime] = useState(Date.now());

    const dayOfWeek = day as DayOfWeek;
    const completedCount = exercises.filter(e => e.completed).length;
    const progress = exercises.length > 0 ? completedCount / exercises.length : 0;

    const loadData = useCallback(async () => {
        const schedule = await loadUserSchedule();
        const dayWorkout = schedule[dayOfWeek];

        if (dayWorkout && !dayWorkout.isRestDay) {
            setExercises(dayWorkout.exercises.map(e => ({ ...e, completed: false })));
            setMuscleGroups(dayWorkout.muscleGroups);
        }
        setLoading(false);
    }, [dayOfWeek]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const toggleExercise = (index: number) => {
        setExercises(prev => {
            const newExercises = [...prev];
            newExercises[index] = {
                ...newExercises[index],
                completed: !newExercises[index].completed,
            };
            return newExercises;
        });
    };

    const finishWorkout = async () => {
        const duration = Math.round((Date.now() - startTime) / 1000 / 60); // in minutes

        const log: WorkoutLog = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            day: dayOfWeek,
            exercises: exercises,
            duration,
            completed: completedCount === exercises.length,
        };

        await saveWorkoutLog(log);

        Alert.alert(
            '🎉 Workout Complete!',
            `Great job! You completed ${completedCount}/${exercises.length} exercises in ${duration} minutes.`,
            [
                { text: 'View Progress', onPress: () => router.replace('/(tabs)/progress') },
                { text: 'Go Home', onPress: () => router.replace('/(tabs)') },
            ]
        );
    };

    const confirmFinish = () => {
        if (completedCount < exercises.length) {
            Alert.alert(
                'Finish Early?',
                `You've completed ${completedCount}/${exercises.length} exercises. Are you sure you want to finish?`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Finish Anyway', onPress: finishWorkout },
                ]
            );
        } else {
            finishWorkout();
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={{ color: '#fff' }}>Loading...</Text>
            </View>
        );
    }

    if (exercises.length === 0) {
        return (
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        title: `${dayOfWeek} Workout`,
                        headerStyle: { backgroundColor: '#121212' },
                        headerTintColor: '#fff',
                    }}
                />
                <View style={styles.centered}>
                    <Text style={styles.emptyEmoji}>🛏️</Text>
                    <Text style={styles.emptyTitle}>No workout scheduled</Text>
                    <Text style={styles.emptyText}>Set up your workout first</Text>
                    <Button
                        mode="contained"
                        style={{ marginTop: 24 }}
                        onPress={() => router.replace(`/day-setup/${dayOfWeek}`)}
                    >
                        Set Up Workout
                    </Button>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: `${dayOfWeek} Workout`,
                    headerStyle: { backgroundColor: '#121212' },
                    headerTintColor: '#fff',
                }}
            />

            {/* Progress Header */}
            <View style={[styles.progressHeader, { paddingTop: 8 }]}>
                <View style={styles.progressInfo}>
                    <Text style={styles.progressTitle}>
                        {muscleGroups.join(' & ')} Day
                    </Text>
                    <Text style={styles.progressSubtitle}>
                        {completedCount}/{exercises.length} exercises completed
                    </Text>
                </View>
                <View style={styles.progressCircle}>
                    <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
                </View>
            </View>

            <ProgressBar
                progress={progress}
                color="#03dac6"
                style={styles.progressBar}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {exercises.map((ex, index) => {
                    const exercise = EXERCISES[ex.exerciseId];
                    if (!exercise) return null;

                    return (
                        <Card
                            key={index}
                            style={[styles.exerciseCard, ex.completed && styles.completedCard]}
                            onPress={() => router.push(`/exercise/${ex.exerciseId}`)}
                        >
                            <View style={styles.exerciseRow}>
                                <Pressable
                                    style={styles.checkboxWrapper}
                                    onPress={() => toggleExercise(index)}
                                >
                                    <View style={[
                                        styles.checkbox,
                                        ex.completed && styles.checkboxChecked,
                                    ]}>
                                        {ex.completed && (
                                            <Ionicons name="checkmark" size={18} color="#000" />
                                        )}
                                    </View>
                                </Pressable>

                                <View style={styles.exerciseInfo}>
                                    <Text style={[
                                        styles.exerciseName,
                                        ex.completed && styles.completedText,
                                    ]}>
                                        {exercise.name}
                                    </Text>
                                    <Text style={styles.exerciseSets}>
                                        {ex.sets} sets × {ex.reps}
                                    </Text>
                                    <View style={styles.muscleTags}>
                                        {exercise.muscleGroup.slice(0, 2).map((m, i) => (
                                            <Text key={i} style={styles.muscleTag}>{m}</Text>
                                        ))}
                                    </View>
                                </View>

                                <Ionicons name="chevron-forward" size={20} color="#666" />
                            </View>
                        </Card>
                    );
                })}

                {/* Motivation Message */}
                {completedCount > 0 && completedCount < exercises.length && (
                    <View style={styles.motivationBox}>
                        <Text style={styles.motivationEmoji}>💪</Text>
                        <Text style={styles.motivationText}>
                            {exercises.length - completedCount} more to go! Keep pushing!
                        </Text>
                    </View>
                )}

                {completedCount === exercises.length && (
                    <View style={[styles.motivationBox, styles.successBox]}>
                        <Text style={styles.motivationEmoji}>🎉</Text>
                        <Text style={styles.motivationText}>
                            All exercises done! You crushed it!
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Finish Button */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
                <Button
                    mode="contained"
                    style={styles.finishButton}
                    buttonColor={completedCount === exercises.length ? '#03dac6' : '#bb86fc'}
                    textColor={completedCount === exercises.length ? '#000' : '#fff'}
                    onPress={confirmFinish}
                >
                    {completedCount === exercises.length ? '🎉 Finish Workout' : 'Finish Early'}
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyEmoji: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    emptyText: {
        color: '#888',
        marginTop: 8,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    progressInfo: {
        flex: 1,
    },
    progressTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    progressSubtitle: {
        color: '#888',
        marginTop: 4,
    },
    progressCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1e1e1e',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#03dac6',
    },
    progressPercent: {
        color: '#03dac6',
        fontWeight: 'bold',
        fontSize: 16,
    },
    progressBar: {
        height: 4,
        backgroundColor: '#333',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },
    exerciseCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        marginBottom: 12,
    },
    completedCard: {
        backgroundColor: 'rgba(3, 218, 198, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(3, 218, 198, 0.3)',
    },
    exerciseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    checkboxWrapper: {
        marginRight: 12,
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#666',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#03dac6',
        borderColor: '#03dac6',
    },
    exerciseInfo: {
        flex: 1,
    },
    exerciseName: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    completedText: {
        textDecorationLine: 'line-through',
        opacity: 0.7,
    },
    exerciseSets: {
        color: '#888',
        fontSize: 14,
        marginTop: 4,
    },
    muscleTags: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 6,
    },
    muscleTag: {
        fontSize: 11,
        color: '#03dac6',
        backgroundColor: 'rgba(3, 218, 198, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
    },
    motivationBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(187, 134, 252, 0.1)',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        gap: 12,
    },
    successBox: {
        backgroundColor: 'rgba(3, 218, 198, 0.1)',
    },
    motivationEmoji: {
        fontSize: 28,
    },
    motivationText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#121212',
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    finishButton: {
        borderRadius: 30,
        paddingVertical: 6,
    },
});
