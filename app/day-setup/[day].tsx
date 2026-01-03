import { EXERCISES, getExercisesByMuscleGroup } from '@/app/data/content';
import { generateExercisesForMuscleGroups, loadUserSchedule, saveUserSchedule } from '@/app/data/storage';
import { DayOfWeek, MUSCLE_GROUPS, MuscleGroup, UserExerciseConfig } from '@/app/data/types';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Switch, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MUSCLE_COLORS: Record<string, string> = {
    'Chest': '#ff6b6b',
    'Back': '#4ecdc4',
    'Legs': '#45b7d1',
    'Shoulders': '#f9ca24',
    'Arms': '#a29bfe',
    'Core': '#fd79a8',
    'Cardio': '#00b894',
};

const MUSCLE_EMOJIS: Record<string, string> = {
    'Chest': '🏋️',
    'Back': '🔙',
    'Legs': '🦵',
    'Shoulders': '💪',
    'Arms': '💪',
    'Core': '🎯',
    'Cardio': '🏃',
};

export default function DaySetupScreen() {
    const { day } = useLocalSearchParams<{ day: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroup[]>([]);
    const [exercises, setExercises] = useState<UserExerciseConfig[]>([]);
    const [isRestDay, setIsRestDay] = useState(false);
    const [loading, setLoading] = useState(true);

    const dayOfWeek = day as DayOfWeek;

    const loadDayData = useCallback(async () => {
        const schedule = await loadUserSchedule();
        const dayWorkout = schedule[dayOfWeek];

        if (dayWorkout) {
            setSelectedMuscles(dayWorkout.muscleGroups);
            setExercises(dayWorkout.exercises);
            setIsRestDay(dayWorkout.isRestDay);
        }
        setLoading(false);
    }, [dayOfWeek]);

    useEffect(() => {
        loadDayData();
    }, [loadDayData]);

    const toggleMuscleGroup = (muscle: MuscleGroup) => {
        if (isRestDay) return;

        setSelectedMuscles(prev => {
            const newSelection = prev.includes(muscle)
                ? prev.filter(m => m !== muscle)
                : [...prev, muscle];

            // Auto-generate exercises when muscle groups change
            const newExercises = generateExercisesForMuscleGroups(newSelection);
            setExercises(newExercises);

            return newSelection;
        });
    };

    const toggleRestDay = () => {
        const newValue = !isRestDay;
        setIsRestDay(newValue);
        if (newValue) {
            setSelectedMuscles([]);
            setExercises([]);
        }
    };

    const removeExercise = (index: number) => {
        setExercises(prev => prev.filter((_, i) => i !== index));
    };

    const moveExercise = (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === exercises.length - 1)
        ) {
            return;
        }

        const newExercises = [...exercises];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newExercises[index], newExercises[targetIndex]] = [newExercises[targetIndex], newExercises[index]];
        setExercises(newExercises);
    };

    const handleSave = async () => {
        const schedule = await loadUserSchedule();

        schedule[dayOfWeek] = {
            day: dayOfWeek,
            muscleGroups: isRestDay ? [] : selectedMuscles,
            exercises: isRestDay ? [] : exercises,
            isRestDay,
        };

        await saveUserSchedule(schedule);
        router.back();
    };

    const addExerciseFromLibrary = (exerciseId: string) => {
        const exercise = EXERCISES[exerciseId];
        if (!exercise) return;

        // Check if already added
        if (exercises.some(e => e.exerciseId === exerciseId)) {
            Alert.alert('Already Added', 'This exercise is already in your workout.');
            return;
        }

        setExercises(prev => [
            ...prev,
            {
                exerciseId,
                sets: exercise.defaultSets,
                reps: exercise.defaultReps,
                completed: false,
            },
        ]);
    };

    const getEstimatedTime = () => {
        return exercises.length * 8; // ~8 mins per exercise
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <Text style={{ color: '#fff' }}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: `${dayOfWeek} Setup`,
                    headerStyle: { backgroundColor: '#121212' },
                    headerTintColor: '#fff',
                }}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Day Header */}
                <View style={styles.dayHeader}>
                    <Text variant="headlineMedium" style={styles.dayTitle}>{dayOfWeek}</Text>
                    <Text style={styles.daySubtitle}>
                        {isRestDay ? 'Rest & Recovery' : `${exercises.length} exercises • ~${getEstimatedTime()} mins`}
                    </Text>
                </View>

                {/* Rest Day Toggle */}
                <Card style={styles.restDayCard}>
                    <View style={styles.restDayRow}>
                        <View style={styles.restDayInfo}>
                            <Text style={styles.restDayTitle}>🛏️ Rest Day</Text>
                            <Text style={styles.restDayDesc}>Take a break and recover</Text>
                        </View>
                        <Switch
                            value={isRestDay}
                            onValueChange={toggleRestDay}
                            color="#03dac6"
                        />
                    </View>
                </Card>

                {!isRestDay && (
                    <>
                        {/* Muscle Group Selection */}
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Select Muscle Groups
                        </Text>
                        <View style={styles.muscleGrid}>
                            {MUSCLE_GROUPS.map(muscle => {
                                const isSelected = selectedMuscles.includes(muscle);
                                return (
                                    <Pressable
                                        key={muscle}
                                        onPress={() => toggleMuscleGroup(muscle)}
                                        style={[
                                            styles.muscleChip,
                                            isSelected && {
                                                backgroundColor: MUSCLE_COLORS[muscle],
                                                borderColor: MUSCLE_COLORS[muscle],
                                            },
                                        ]}
                                    >
                                        <Text style={styles.muscleEmoji}>{MUSCLE_EMOJIS[muscle]}</Text>
                                        <Text style={[
                                            styles.muscleText,
                                            isSelected && styles.muscleTextSelected,
                                        ]}>
                                            {muscle}
                                        </Text>
                                        {isSelected && (
                                            <Ionicons name="checkmark-circle" size={18} color="#fff" />
                                        )}
                                    </Pressable>
                                );
                            })}
                        </View>

                        {/* Exercises List */}
                        <View style={styles.exercisesHeader}>
                            <Text variant="titleMedium" style={styles.sectionTitle}>
                                Exercises ({exercises.length})
                            </Text>
                        </View>

                        {exercises.length === 0 ? (
                            <Card style={styles.emptyCard}>
                                <Card.Content style={styles.emptyContent}>
                                    <Text style={styles.emptyEmoji}>🏋️</Text>
                                    <Text style={styles.emptyTitle}>No exercises yet</Text>
                                    <Text style={styles.emptyText}>
                                        Select muscle groups above to auto-populate exercises
                                    </Text>
                                </Card.Content>
                            </Card>
                        ) : (
                            exercises.map((ex, index) => {
                                const exercise = EXERCISES[ex.exerciseId];
                                if (!exercise) return null;

                                return (
                                    <Card key={index} style={styles.exerciseCard}>
                                        <View style={styles.exerciseRow}>
                                            <View style={styles.exerciseLeft}>
                                                <View style={styles.exerciseNumber}>
                                                    <Text style={styles.numberText}>{index + 1}</Text>
                                                </View>
                                                <View style={styles.exerciseInfo}>
                                                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                                                    <Text style={styles.exerciseSets}>
                                                        {ex.sets} sets × {ex.reps}
                                                    </Text>
                                                    <View style={styles.exerciseTags}>
                                                        {exercise.muscleGroup.slice(0, 2).map((m, i) => (
                                                            <Text key={i} style={[styles.tag, { color: MUSCLE_COLORS[m] }]}>
                                                                {m}
                                                            </Text>
                                                        ))}
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.exerciseActions}>
                                                <IconButton
                                                    icon="chevron-up"
                                                    size={18}
                                                    iconColor="#666"
                                                    onPress={() => moveExercise(index, 'up')}
                                                    disabled={index === 0}
                                                />
                                                <IconButton
                                                    icon="chevron-down"
                                                    size={18}
                                                    iconColor="#666"
                                                    onPress={() => moveExercise(index, 'down')}
                                                    disabled={index === exercises.length - 1}
                                                />
                                                <IconButton
                                                    icon="close"
                                                    size={18}
                                                    iconColor="#ff6b6b"
                                                    onPress={() => removeExercise(index)}
                                                />
                                            </View>
                                        </View>
                                    </Card>
                                );
                            })
                        )}

                        {/* Add More Exercises */}
                        {selectedMuscles.length > 0 && (
                            <View style={styles.addMoreSection}>
                                <Text style={styles.addMoreTitle}>Add More Exercises</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={styles.addMoreList}>
                                        {selectedMuscles.flatMap(muscle =>
                                            getExercisesByMuscleGroup(muscle)
                                                .filter(ex => !exercises.some(e => e.exerciseId === ex.id))
                                                .slice(0, 3)
                                        ).slice(0, 6).map(ex => (
                                            <Pressable
                                                key={ex.id}
                                                style={styles.addExerciseChip}
                                                onPress={() => addExerciseFromLibrary(ex.id)}
                                            >
                                                <Ionicons name="add" size={16} color="#03dac6" />
                                                <Text style={styles.addExerciseText}>{ex.name}</Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        )}
                    </>
                )}
            </ScrollView>

            {/* Save Button */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
                <Button
                    mode="contained"
                    style={styles.saveButton}
                    buttonColor="#bb86fc"
                    onPress={handleSave}
                >
                    Save {dayOfWeek}'s Workout
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
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },
    dayHeader: {
        marginBottom: 24,
    },
    dayTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    daySubtitle: {
        color: '#888',
        marginTop: 4,
    },
    restDayCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        marginBottom: 24,
    },
    restDayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    restDayInfo: {
        flex: 1,
    },
    restDayTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    restDayDesc: {
        color: '#888',
        fontSize: 13,
        marginTop: 2,
    },
    sectionTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    muscleGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 24,
    },
    muscleChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderColor: '#333',
    },
    muscleEmoji: {
        fontSize: 18,
    },
    muscleText: {
        color: '#888',
        fontWeight: '600',
    },
    muscleTextSelected: {
        color: '#fff',
    },
    exercisesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    emptyCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
    },
    emptyContent: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    emptyEmoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    emptyTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    emptyText: {
        color: '#888',
        textAlign: 'center',
        paddingHorizontal: 24,
    },
    exerciseCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        marginBottom: 10,
    },
    exerciseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    exerciseLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    exerciseNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    numberText: {
        color: '#fff',
        fontWeight: 'bold',
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
    exerciseTags: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 4,
    },
    tag: {
        fontSize: 11,
        fontWeight: '600',
    },
    exerciseActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addMoreSection: {
        marginTop: 16,
    },
    addMoreTitle: {
        color: '#888',
        fontSize: 13,
        marginBottom: 12,
    },
    addMoreList: {
        flexDirection: 'row',
        gap: 10,
    },
    addExerciseChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(3, 218, 198, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(3, 218, 198, 0.3)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    addExerciseText: {
        color: '#03dac6',
        fontSize: 13,
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
    saveButton: {
        borderRadius: 30,
        paddingVertical: 6,
    },
});
