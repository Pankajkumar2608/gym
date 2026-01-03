import { EXERCISES, PROGRAMS } from '@/app/data/content';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';
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

export default function RoutineDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Find the routine day by ID
    let routineDay = null;
    let parentProgram = null;

    for (const prog of PROGRAMS) {
        const day = prog.days.find(d => d.id === id);
        if (day) {
            routineDay = day;
            parentProgram = prog;
            break;
        }
    }

    if (!routineDay) {
        return (
            <View style={styles.centered}>
                <Text style={{ color: '#fff', fontSize: 48, marginBottom: 16 }}>❌</Text>
                <Text style={{ color: '#fff', fontSize: 18 }}>Routine not found</Text>
                <Button mode="contained" style={{ marginTop: 24 }} onPress={() => router.back()}>
                    Go Back
                </Button>
            </View>
        );
    }

    const exercises = routineDay.exercises.map(exId => EXERCISES[exId]).filter(Boolean);
    const estimatedTime = exercises.length * 8;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: routineDay.title }} />

            {/* Header Card */}
            <View style={styles.headerCard}>
                <View style={styles.headerInfo}>
                    <Text style={styles.programName}>{parentProgram?.title}</Text>
                    <Text variant="headlineSmall" style={styles.routineTitle}>{routineDay.title}</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <Ionicons name="barbell" size={18} color="#03dac6" />
                            <Text style={styles.statText}>{exercises.length} Exercises</Text>
                        </View>
                        <View style={styles.stat}>
                            <Ionicons name="time" size={18} color="#bb86fc" />
                            <Text style={styles.statText}>~{estimatedTime} mins</Text>
                        </View>
                    </View>
                </View>
            </View>

            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: insets.bottom + 100 }}
                ListHeaderComponent={
                    <Text variant="titleMedium" style={styles.sectionTitle}>Exercises</Text>
                }
                renderItem={({ item, index }) => (
                    <Pressable onPress={() => router.push(`/exercise/${item.id}`)}>
                        <Card style={styles.card} mode="outlined">
                            <Card.Content style={styles.cardContent}>
                                <View style={styles.numberBox}>
                                    <Text style={styles.number}>{index + 1}</Text>
                                </View>
                                <View style={styles.exerciseInfo}>
                                    <Text variant="titleMedium" style={styles.exerciseName}>{item.name}</Text>
                                    <Text variant="bodySmall" style={styles.exerciseSets}>
                                        {item.defaultSets} sets × {item.defaultReps}
                                    </Text>
                                    <View style={styles.chipContainer}>
                                        {item.muscleGroup.slice(0, 2).map((m, i) => (
                                            <Text
                                                key={i}
                                                style={[styles.muscleChip, { color: MUSCLE_COLORS[m] }]}
                                            >
                                                {m}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                                <IconButton icon="chevron-right" iconColor="#666" />
                            </Card.Content>
                        </Card>
                    </Pressable>
                )}
            />

            {/* Start Button */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
                <Button
                    mode="contained"
                    style={styles.startButton}
                    buttonColor="#03dac6"
                    textColor="#000"
                    icon="play-circle"
                    onPress={() => router.back()}
                >
                    Start This Routine
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
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCard: {
        backgroundColor: '#1e1e1e',
        padding: 20,
        margin: 16,
        marginBottom: 0,
        borderRadius: 16,
    },
    headerInfo: {},
    programName: {
        color: '#bb86fc',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    routineTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 20,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        color: '#aaa',
        fontSize: 14,
    },
    sectionTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    card: {
        backgroundColor: '#1e1e1e',
        borderColor: '#333',
        borderRadius: 12,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        color: '#fff',
        fontWeight: 'bold',
    },
    exerciseInfo: {
        flex: 1,
        paddingHorizontal: 12,
    },
    exerciseName: {
        color: '#fff',
        fontWeight: 'bold',
    },
    exerciseSets: {
        color: '#bbb',
        marginTop: 2,
    },
    chipContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 6,
    },
    muscleChip: {
        fontSize: 11,
        fontWeight: '600',
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
    startButton: {
        borderRadius: 30,
        paddingVertical: 6,
    },
});
