import { EXERCISES } from '@/app/data/content';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Divider, Text } from 'react-native-paper';
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

export default function ExerciseDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const exercise = EXERCISES[id as string];
    const [expandedStep, setExpandedStep] = useState<number | null>(null);

    if (!exercise) {
        return (
            <View style={styles.centered}>
                <Text style={{ color: '#fff', fontSize: 48, marginBottom: 16 }}>❌</Text>
                <Text style={{ color: '#fff', fontSize: 18 }}>Exercise not found</Text>
                <Button mode="contained" style={{ marginTop: 24 }} onPress={() => router.back()}>
                    Go Back
                </Button>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: exercise.name }} />

            <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.mediaPlaceholder}>
                        <Text style={styles.placeholderEmoji}>🏋️</Text>
                        <Text style={styles.placeholderText}>Exercise Animation</Text>
                    </View>
                </View>

                {/* Exercise Info */}
                <View style={styles.infoSection}>
                    <Text variant="headlineSmall" style={styles.title}>{exercise.name}</Text>

                    <View style={styles.muscleChips}>
                        {exercise.muscleGroup.map((m, i) => (
                            <Chip
                                key={i}
                                style={[styles.chip, { backgroundColor: `${MUSCLE_COLORS[m]}20` }]}
                                textStyle={{ color: MUSCLE_COLORS[m], fontWeight: '600' }}
                            >
                                {m}
                            </Chip>
                        ))}
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{exercise.defaultSets}</Text>
                            <Text style={styles.statLabel}>Sets</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{exercise.defaultReps}</Text>
                            <Text style={styles.statLabel}>Reps</Text>
                        </View>
                    </View>

                    <Text style={styles.description}>{exercise.description}</Text>
                </View>

                <Divider style={styles.divider} />

                {/* Instructions */}
                <View style={styles.section}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>
                        📋 Instructions
                    </Text>

                    {exercise.steps.map((step, i) => (
                        <Pressable
                            key={i}
                            onPress={() => setExpandedStep(expandedStep === i ? null : i)}
                        >
                            <Card style={[styles.stepCard, expandedStep === i && styles.stepCardExpanded]}>
                                <View style={styles.stepRow}>
                                    <View style={styles.stepNumber}>
                                        <Text style={styles.stepNumberText}>{i + 1}</Text>
                                    </View>
                                    <Text style={[
                                        styles.stepText,
                                        expandedStep !== i && styles.stepTextCollapsed,
                                    ]}>
                                        {step}
                                    </Text>
                                    <Ionicons
                                        name={expandedStep === i ? 'chevron-up' : 'chevron-down'}
                                        size={20}
                                        color="#666"
                                    />
                                </View>
                            </Card>
                        </Pressable>
                    ))}
                </View>

                <Divider style={styles.divider} />

                {/* Pro Tips */}
                <View style={styles.section}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>
                        💡 Pro Tips
                    </Text>

                    {exercise.tips.map((tip, i) => (
                        <Card key={i} style={styles.tipCard}>
                            <Card.Content style={styles.tipContent}>
                                <Ionicons name="bulb" size={20} color="#f9ca24" />
                                <Text style={styles.tipText}>{tip}</Text>
                            </Card.Content>
                        </Card>
                    ))}
                </View>

                {/* Common Mistakes */}
                <View style={styles.section}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>
                        ⚠️ Common Mistakes
                    </Text>

                    <Card style={styles.mistakesCard}>
                        <Card.Content>
                            <View style={styles.mistakeItem}>
                                <Ionicons name="close-circle" size={18} color="#ff6b6b" />
                                <Text style={styles.mistakeText}>Using too much weight and sacrificing form</Text>
                            </View>
                            <View style={styles.mistakeItem}>
                                <Ionicons name="close-circle" size={18} color="#ff6b6b" />
                                <Text style={styles.mistakeText}>Rushing through reps without control</Text>
                            </View>
                            <View style={styles.mistakeItem}>
                                <Ionicons name="close-circle" size={18} color="#ff6b6b" />
                                <Text style={styles.mistakeText}>Not warming up properly before heavy sets</Text>
                            </View>
                        </Card.Content>
                    </Card>
                </View>

            </ScrollView>

            {/* Action Footer */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
                <Button
                    mode="contained"
                    style={styles.button}
                    buttonColor="#bb86fc"
                    onPress={() => router.back()}
                >
                    Got It!
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 16,
    },
    centered: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        paddingBottom: 100,
    },
    heroSection: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    mediaPlaceholder: {
        height: 200,
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderEmoji: {
        fontSize: 64,
        marginBottom: 8,
    },
    placeholderText: {
        color: '#666',
        fontSize: 14,
    },
    infoSection: {
        padding: 16,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    muscleChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    chip: {
        backgroundColor: '#333',
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        color: '#03dac6',
        fontSize: 28,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#888',
        fontSize: 14,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        backgroundColor: '#333',
    },
    description: {
        color: '#bbb',
        fontSize: 16,
        lineHeight: 24,
    },
    divider: {
        backgroundColor: '#333',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    section: {
        padding: 16,
        paddingTop: 8,
    },
    sectionTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    stepCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        marginBottom: 10,
        padding: 14,
    },
    stepCardExpanded: {
        backgroundColor: '#252525',
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#bb86fc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepNumberText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    stepText: {
        color: '#ddd',
        fontSize: 15,
        flex: 1,
        lineHeight: 22,
    },
    stepTextCollapsed: {
        numberOfLines: 2,
    },
    tipCard: {
        backgroundColor: '#1e1e1e',
        marginBottom: 10,
        borderRadius: 12,
    },
    tipContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    tipText: {
        color: '#ddd',
        flex: 1,
        lineHeight: 22,
    },
    mistakesCard: {
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 107, 0.2)',
    },
    mistakeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    mistakeText: {
        color: '#ddd',
        flex: 1,
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
    button: {
        borderRadius: 30,
        paddingVertical: 6,
    },
});
