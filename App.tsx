import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import WelcomeScreen from 'screens/WelcomeScreen';
import MyTripsScreen from 'screens/MyTripsScreen';
import CreateTripScreen from 'screens/CreateTripScreen';
import ProfileScreen from 'screens/ProfileScreen';
import TripDetailScreen from 'screens/TripDetailScreen';
import BookingDetailScreen from 'screens/BookingDetailScreen';
import ExpensesScreen from 'screens/ExpensesScreen';
import ItineraryScreen from 'screens/ItineraryScreen';

// Import context
import { TripProvider } from 'context/TripContext';

// Global styles
import './globals.css';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'MyTrips') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CreateTrip') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="MyTrips" 
        component={MyTripsScreen} 
        options={{ tabBarLabel: 'Mes Voyages' }}
      />
      <Tab.Screen 
        name="CreateTrip" 
        component={CreateTripScreen} 
        options={{ tabBarLabel: 'Créer' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Profil' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <TripProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator 
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="TripDetail" component={TripDetailScreen} />
            <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
            <Stack.Screen name="Expenses" component={ExpensesScreen} />
            <Stack.Screen name="Itinerary" component={ItineraryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </TripProvider>
    </SafeAreaProvider>
  );
} 