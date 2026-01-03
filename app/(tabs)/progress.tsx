import { getWeeklyStats, loadWorkoutLogs } from '@/app/data/storage';
import { WorkoutLog } from '@/app/data/types';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Card, ProgressBar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProgressScreen() {
    const insets = useSafeAreaInsets();
    const [logs, setLogs] = useState<WorkoutLog[]>([]);
    const [stats, setStats] = useState({ workoutsCompleted: 0, totalExercises: 0 });
    const [refreshing, setRefreshing] = useState(false);

    const loadData = useCallback(async () => {
        const [logsData, statsData] = await Promise.all([
            loadWorkoutLogs(),
            getWeeklyStats(),
        ]);
        setLogs(logsData);
        setStats(statsData);
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    }, [loadData]);

    const weeklyGoal = 5; // workouts per week goal
    const progress = Math.min(stats.workoutsCompleted / weeklyGoal, 1);

    // Calculate streak (consecutive days)
    const calculateStreak = () => {
        if (logs.length === 0) return 0;
        let streak = 0;
        const today = new Date();

        for (let i = 0; i < 30; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];

            if (logs.some(log => log.date.startsWith(dateStr) && log.completed)) {
                streak++;
            } else if (i > 0) {
                break;
            }
        }
        return streak;
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text variant="headlineMedium" style={styles.title}>Your Progress</Text>
                <Text variant="bodyMedium" style={styles.subtitle}>
                    Track your fitness journey
                </Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#bb86fc" />
                }
            >
                {/* Weekly Progress Card */}
                <Card style={styles.progressCard}>
                    <Card.Content>
                        <Text style={styles.cardTitle}>Weekly Goal</Text>
                        <View style={styles.progressRow}>
                            <Text style={styles.progressText}>
                                {stats.workoutsCompleted}/{weeklyGoal} workouts
                            </Text>
                            <Text style={styles.percentText}>{Math.round(progress * 100)}%</Text>
                        </View>
                        <ProgressBar
                            progress={progress}
                            color="#03dac6"
                            style={styles.progressBar}
                        />
                    </Card.Content>
                </Card>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                            <Text style={styles.statEmoji}>🔥</Text>
                            <Text style={styles.statValue}>{calculateStreak()}</Text>
                            <Text style={styles.statLabel}>Day Streak</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                            <Text style={styles.statEmoji}>💪</Text>
                            <Text style={styles.statValue}>{stats.workoutsCompleted}</Text>
                            <Text style={styles.statLabel}>This Week</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                            <Text style={styles.statEmoji}>🏋️</Text>
                            <Text style={styles.statValue}>{stats.totalExercises}</Text>
                            <Text style={styles.statLabel}>Exercises</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                            <Text style={styles.statEmoji}>📊</Text>
                            <Text style={styles.statValue}>{logs.length}</Text>
                            <Text style={styles.statLabel}>Total Sessions</Text>
                        </Card.Content>
                    </Card>
                </View>

                {/* Recent History */}
                <Text variant="titleLarge" style={styles.sectionTitle}>Recent History</Text>

                {logs.length === 0 ? (
                    <Card style={styles.emptyCard}>
                        <Card.Content style={styles.emptyContent}>
                            <Text style={styles.emptyEmoji}>📝</Text>
                            <Text style={styles.emptyTitle}>No workouts yet</Text>
                            <Text style={styles.emptyText}>
                                Complete your first workout to see your history here!
                            </Text>
                        </Card.Content>
                    </Card>
                ) : (
                    logs.slice(0, 10).map((log, index) => {
                        const date = new Date(log.date);
                        const formattedDate = date.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                        });

                        return (
                            <Card key={index} style={styles.historyCard}>
                                <Card.Content style={styles.historyContent}>
                                    <View>
                                        <Text style={styles.historyDay}>{log.day}</Text>
                                        <Text style={styles.historyDate}>{formattedDate}</Text>
                                    </View>
                                    <View style={styles.historyRight}>
                                        <Text style={styles.historyExercises}>
                                            {log.exercises.length} exercises
                                        </Text>
                                        <View style={[
                                            styles.completedBadge,
                                            log.completed ? styles.completedTrue : styles.completedFalse
                                        ]}>
                                            <Text style={styles.completedText}>
                                                {log.completed ? '✓' : '○'}
                                            </Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        );
                    })
                )}

                {/* Motivation Card */}
                <Card style={styles.motivationCard}>
                    <Card.Content>
                        <Text style={styles.motivationQuote}>
                            "The only bad workout is the one that didn't happen."
                        </Text>
                        <Text style={styles.motivationAuthor}>— Unknown</Text>
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
        gap: 16,
    },
    progressCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
    },
    cardTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 12,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressText: {
        color: '#aaa',
    },
    percentText: {
        color: '#03dac6',
        fontWeight: 'bold',
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#333',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
    },
    statContent: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    statEmoji: {
        fontSize: 28,
        marginBottom: 8,
    },
    statValue: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#888',
        fontSize: 12,
        marginTop: 4,
    },
    sectionTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 8,
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
        fontSize: 18,
        marginBottom: 8,
    },
    emptyText: {
        color: '#888',
        textAlign: 'center',
    },
    historyCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
    },
    historyContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    historyDay: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    historyDate: {
        color: '#888',
        fontSize: 12,
        marginTop: 2,
    },
    historyRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    historyExercises: {
        color: '#aaa',
        fontSize: 13,
    },
    completedBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedTrue: {
        backgroundColor: '#03dac6',
    },
    completedFalse: {
        backgroundColor: '#333',
    },
    completedText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    motivationCard: {
        backgroundColor: 'rgba(187, 134, 252, 0.1)',
        borderRadius: 16,
        marginTop: 8,
        borderWidth: 1,
        borderColor: 'rgba(187, 134, 252, 0.2)',
    },
    motivationQuote: {
        color: '#bb86fc',
        fontStyle: 'italic',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
    },
    motivationAuthor: {
        color: '#888',
        textAlign: 'center',
        marginTop: 8,
    },
});
