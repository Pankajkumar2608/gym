import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3DarkTheme as PaperDarkTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Create custom theme
const customTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#bb86fc',
    secondary: '#03dac6',
    background: '#121212',
    surface: '#1e1e1e',
  },
};

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ flex: 1, paddingTop: 20 }} >
      <PaperProvider theme={customTheme}>
        <ThemeProvider value={DarkTheme}>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#121212' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="setup" options={{ title: 'Choose Your Plan', headerShown: false }} />
            <Stack.Screen name="day-setup/[day]" options={{ title: 'Day Setup' }} />
            <Stack.Screen name="workout/[day]" options={{ title: 'Workout' }} />
            <Stack.Screen name="routine/[id]" options={{ title: 'Workout Details' }} />
            <Stack.Screen name="exercise/[id]" options={{ title: 'Exercise Guide' }} />
          </Stack>
          <StatusBar style="light" />
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
