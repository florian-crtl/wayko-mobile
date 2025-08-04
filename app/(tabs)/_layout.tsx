import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'hsl(24 9.8% 10%)',
        tabBarInactiveTintColor: 'hsl(240 3.8% 46.1%)',
        tabBarStyle: {
          backgroundColor: 'hsl(0 0% 100%)',
          borderTopColor: 'hsl(240 5.9% 90%)',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Trips',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="airplane" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-trip"
        options={{
          title: 'Create Trip',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 