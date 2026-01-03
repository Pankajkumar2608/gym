import { Redirect } from 'expo-router';

// Redirect to tabs when the app opens
export default function Index() {
  return <Redirect href={'/(tabs)' as any} />;
}
