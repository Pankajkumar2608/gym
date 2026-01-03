import { PROGRAMS } from '@/app/data/content';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, RadioButton, Text } from 'react-native-paper';

export default function SetupScreen() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<string>(PROGRAMS[0].id);

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.header}>Choose Your Routine</Text>
            <Text variant="bodyMedium" style={styles.subHeader}>Select a plan that fits your goals.</Text>

            <FlatList
                data={PROGRAMS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 16, paddingBottom: 80 }}
                renderItem={({ item }) => (
                    <Card
                        style={[styles.card, selectedId === item.id && styles.selectedCard]}
                        onPress={() => setSelectedId(item.id)}
                        mode="outlined"
                    >
                        <Card.Content style={styles.cardContent}>
                            <View style={{ flex: 1 }}>
                                <Text variant="titleMedium" style={styles.title}>{item.title}</Text>
                                <Text variant="bodySmall" style={styles.desc}>{item.description}</Text>
                                <View style={styles.badge}>
                                    <Text variant="labelSmall" style={{ color: '#000' }}>{item.level}</Text>
                                </View>
                            </View>
                            <RadioButton
                                value={item.id}
                                status={selectedId === item.id ? 'checked' : 'unchecked'}
                                onPress={() => setSelectedId(item.id)}
                            />
                        </Card.Content>
                    </Card>
                )}
            />

            <View style={styles.footer}>
                <Button mode="contained" onPress={() => router.push('/')} style={styles.button}>
                    Confirm Plan
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212', padding: 16, marginTop: 50 },
    header: { color: '#fff', fontWeight: 'bold', marginBottom: 4 },
    subHeader: { color: '#bbb', marginBottom: 20 },
    card: { backgroundColor: '#1e1e1e', borderColor: '#333' },
    selectedCard: { borderColor: '#bb86fc', backgroundColor: '#252525' },
    cardContent: { flexDirection: 'row', alignItems: 'center' },
    title: { color: '#fff', fontWeight: 'bold' },
    desc: { color: '#aaa', marginTop: 4 },
    badge: { backgroundColor: '#03dac6', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginTop: 8 },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#121212' },
    button: { paddingVertical: 6 },
});
