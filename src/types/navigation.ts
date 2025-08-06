import type { NavigationProp, RouteProp } from '@react-navigation/native';

// Root Stack Navigator types
export type RootStackParamList = {
  Welcome: undefined;
  Main: { screen?: string };
  TripDetail: { id: string };
  BookingDetail: { id: string };
  Expenses: { id: string };
  Itinerary: { id: string };
};

// Tab Navigator types
export type TabParamList = {
  MyTrips: undefined;
  CreateTrip: undefined;
  Profile: undefined;
};

// Navigation props
export type RootStackNavigationProp = NavigationProp<RootStackParamList>;
export type TabNavigationProp = NavigationProp<TabParamList>;

// Route props
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
export type TabRouteProp<T extends keyof TabParamList> = RouteProp<TabParamList, T>; 