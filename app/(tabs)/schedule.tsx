import { loadUserSchedule } from '@/app/data/storage';
import { DAYS_OF_WEEK, DayOfWeek, UserWeeklySchedule } from '@/app/data/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DAY_COLORS: Record<string, string> = {
    'Chest': '#ff6b6b',
    'Back': '#4ecdc4',
    'Legs': '#45b7d1',
    'Shoulders': '#f9ca24',
    'Arms': '#a29bfe',
    'Core': '#fd79a8',
    'Cardio': '#00b894',
};

const DAY_EMOJIS: Record<DayOfWeek, string> = {
    'Monday': '💪',
    'Tuesday': '🔥',
    'Wednesday': '⚡',
    'Thursday': '🏋️',
    'Friday': '🎯',
    'Saturday': '🌟',
    'Sunday': '🧘',
};

export default function ScheduleScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [schedule, setSchedule] = useState<UserWeeklySchedule | null>(null);
    const [refreshing, setRefreshing] = useState(false);

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

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek;

    const getMuscleGroupColor = (groups: string[]) => {
        if (groups.length === 0) return '#333';
        return DAY_COLORS[groups[0]] || '#bb86fc';
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text variant="headlineMedium" style={styles.title}>Weekly Schedule</Text>
                <Text variant="bodyMedium" style={styles.subtitle}>
                    Tap any day to customize your workout
                </Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#bb86fc" />
                }
            >
                {DAYS_OF_WEEK.map((day) => {
                    const workout = schedule?.[day];
                    const isToday = day === today;
                    const isRestDay = workout?.isRestDay ?? true;
                    const muscleGroups = workout?.muscleGroups || [];
                    const exerciseCount = workout?.exercises.length || 0;

                    return (
                        <Pressable
                            key={day}
                            onPress={() => router.push(`/day-setup/${day}` as any)}
                        >
                            <Card style={[
                                styles.dayCard,
                                isToday && styles.todayCard,
                                isRestDay && styles.restCard,
                            ]}>
                                <View style={styles.cardRow}>
                                    {/* Day Info */}
                                    <View style={styles.dayInfo}>
                                        <View style={styles.dayHeader}>
                                            <Text style={styles.dayEmoji}>{DAY_EMOJIS[day]}</Text>
                                            <View>
                                                <Text style={[styles.dayName, isToday && styles.todayText]}>
                                                    {day}
                                                    {isToday && <Text style={styles.todayBadge}> TODAY</Text>}
                                                </Text>
                                                <Text style={styles.dayType}>
                                                    {isRestDay ? 'Rest Day' : muscleGroups.join(' • ')}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Right Side */}
                                    <View style={styles.rightSide}>
                                        {!isRestDay && (
                                            <View style={styles.statsContainer}>
                                                <View style={[styles.muscleIndicator, { backgroundColor: getMuscleGroupColor(muscleGroups) }]} />
                                                <Text style={styles.exerciseCount}>{exerciseCount} exercises</Text>
                                            </View>
                                        )}
                                        <Ionicons
                                            name="chevron-forward"
                                            size={20}
                                            color="#666"
                                        />
                                    </View>
                                </View>

                                {/* Muscle Group Chips */}
                                {!isRestDay && muscleGroups.length > 0 && (
                                    <View style={styles.chipContainer}>
                                        {muscleGroups.map((group, index) => (
                                            <View
                                                key={index}
                                                style={[styles.chip, { backgroundColor: `${DAY_COLORS[group]}20` }]}
                                            >
                                                <Text style={[styles.chipText, { color: DAY_COLORS[group] }]}>
                                                    {group}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </Card>
                        </Pressable>
                    );
                })}

                {/* Tips Card */}
                <Card style={styles.tipsCard}>
                    <Card.Content>
                        <Text style={styles.tipsTitle}>💡 Pro Tip</Text>
                        <Text style={styles.tipsText}>
                            For best results, train each muscle group at least twice per week.
                            Consider splitting your week into Push/Pull/Legs or Upper/Lower routines.
                        </Text>
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 16,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#888',
        marginTop: 4,
    },
    scrollContent: {
        padding: 16,
        paddingTop: 8,
        gap: 12,
    },
    dayCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#333',
        marginBottom: 0,
    },
    todayCard: {
        borderColor: '#bb86fc',
        borderWidth: 2,
        backgroundColor: '#252030',
    },
    restCard: {
        opacity: 0.7,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    dayInfo: {
        flex: 1,
    },
    dayHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dayEmoji: {
        fontSize: 28,
    },
    dayName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    todayText: {
        color: '#bb86fc',
    },
    todayBadge: {
        fontSize: 11,
        color: '#bb86fc',
        fontWeight: '700',
    },
    dayType: {
        color: '#888',
        fontSize: 13,
        marginTop: 2,
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    muscleIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    exerciseCount: {
        color: '#aaa',
        fontSize: 12,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 0,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    chipText: {
        fontSize: 12,
        fontWeight: '600',
    },
    tipsCard: {
        backgroundColor: 'rgba(187, 134, 252, 0.1)',
        borderRadius: 16,
        marginTop: 8,
        borderWidth: 1,
        borderColor: 'rgba(187, 134, 252, 0.2)',
    },
    tipsTitle: {
        color: '#bb86fc',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    tipsText: {
        color: '#aaa',
        lineHeight: 20,
    },
});
