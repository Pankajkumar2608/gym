import { clearAllData } from '@/app/data/storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Divider, List, Switch, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    const handleResetData = () => {
        Alert.alert(
            'Reset All Data',
            'This will clear your entire workout schedule and history. This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        await clearAllData();
                        Alert.alert('Done', 'All data has been reset.');
                    }
                },
            ]
        );
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <Avatar.Icon size={80} icon="account" style={styles.avatar} />
                    <Text variant="headlineSmall" style={styles.userName}>Fitness Warrior</Text>
                    <Text style={styles.userTagline}>Building strength, one rep at a time 💪</Text>
                </View>

                {/* Quick Stats */}
                <Card style={styles.statsCard}>
                    <Card.Content style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>7</Text>
                            <Text style={styles.statLabel}>Days Active</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>28</Text>
                            <Text style={styles.statLabel}>Workouts</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>5</Text>
                            <Text style={styles.statLabel}>Day Streak</Text>
                        </View>
                    </Card.Content>
                </Card>

                {/* Settings Section */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Settings</Text>

                <Card style={styles.settingsCard}>
                    <List.Item
                        title="Workout Reminders"
                        description="Get notified about your workouts"
                        titleStyle={styles.listTitle}
                        descriptionStyle={styles.listDescription}
                        left={() => <List.Icon icon="bell" color="#bb86fc" />}
                        right={() => (
                            <Switch
                                value={notifications}
                                onValueChange={setNotifications}
                                color="#bb86fc"
                            />
                        )}
                    />
                    <Divider style={styles.divider} />
                    <List.Item
                        title="Dark Mode"
                        description="Toggle dark/light theme"
                        titleStyle={styles.listTitle}
                        descriptionStyle={styles.listDescription}
                        left={() => <List.Icon icon="moon-waning-crescent" color="#bb86fc" />}
                        right={() => (
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                color="#bb86fc"
                            />
                        )}
                    />
                </Card>

                {/* App Info Section */}
                <Text variant="titleMedium" style={styles.sectionTitle}>App</Text>

                <Card style={styles.settingsCard}>
                    <List.Item
                        title="About GymApp"
                        titleStyle={styles.listTitle}
                        left={() => <List.Icon icon="information" color="#888" />}
                        right={() => <List.Icon icon="chevron-right" color="#666" />}
                        onPress={() => { }}
                    />
                    <Divider style={styles.divider} />
                    <List.Item
                        title="Privacy Policy"
                        titleStyle={styles.listTitle}
                        left={() => <List.Icon icon="shield-check" color="#888" />}
                        right={() => <List.Icon icon="chevron-right" color="#666" />}
                        onPress={() => { }}
                    />
                    <Divider style={styles.divider} />
                    <List.Item
                        title="Terms of Service"
                        titleStyle={styles.listTitle}
                        left={() => <List.Icon icon="file-document" color="#888" />}
                        right={() => <List.Icon icon="chevron-right" color="#666" />}
                        onPress={() => { }}
                    />
                </Card>

                {/* Danger Zone */}
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: '#ff6b6b' }]}>
                    Danger Zone
                </Text>

                <Card style={[styles.settingsCard, styles.dangerCard]}>
                    <Card.Content>
                        <Text style={styles.dangerTitle}>Reset All Data</Text>
                        <Text style={styles.dangerDescription}>
                            Clear your schedule, workout history, and all preferences.
                            This action cannot be undone.
                        </Text>
                        <Button
                            mode="outlined"
                            textColor="#ff6b6b"
                            style={styles.dangerButton}
                            onPress={handleResetData}
                        >
                            Reset Everything
                        </Button>
                    </Card.Content>
                </Card>

                {/* App Version */}
                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>GymApp v1.0.0</Text>
                    <Text style={styles.versionText2}>Made By Pankaj with 💜</Text>
                    <Text style={styles.versionSubtext}>Made with 💜 for fitness enthusiasts</Text>
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
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    avatar: {
        backgroundColor: '#333',
    },
    userName: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 12,
    },
    userTagline: {
        color: '#888',
        marginTop: 4,
    },
    statsCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        marginBottom: 24,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        color: '#03dac6',
        fontSize: 28,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#888',
        fontSize: 12,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        backgroundColor: '#333',
    },
    sectionTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 8,
    },
    settingsCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        marginBottom: 16,
        padding: 8,
        paddingLeft: 16,
        overflow: 'hidden',
    },
    listTitle: {
        color: '#fff',
    },
    listDescription: {
        color: '#888',
    },
    divider: {
        backgroundColor: '#333',
    },
    dangerCard: {
        borderColor: 'rgba(255, 107, 107, 0.3)',
        borderWidth: 1,
    },
    dangerTitle: {
        color: '#ff6b6b',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    dangerDescription: {
        color: '#888',
        marginBottom: 16,
        lineHeight: 20,
    },
    dangerButton: {
        borderColor: '#ff6b6b',
    },
    versionContainer: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    versionText: {
        color: '#666',
        fontSize: 13,
    },
    versionText2: {
        color: '#30c729ff',
        fontSize: 13,
    },
    versionSubtext: {
        color: '#555',
        fontSize: 12,
        marginTop: 4,
    },
});
