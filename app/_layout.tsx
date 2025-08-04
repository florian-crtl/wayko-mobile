import { Stack } from 'expo-router';
import { TripProvider } from 'lib/context/TripContext';

export default function RootLayout() {
  return (
    <TripProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="design-system" options={{ headerShown: false }} />
        <Stack.Screen name="trip/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="itinerary/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="booking/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="expenses/[id]" options={{ headerShown: false }} />
      </Stack>
    </TripProvider>
  );
} 