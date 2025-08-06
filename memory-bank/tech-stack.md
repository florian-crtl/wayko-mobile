# Wayko: Tech Stack

---

## Core Platform

-   **Mobile Framework**: React Native (with Expo)
-   **Backend & Database**: Supabase (Postgres, Auth, Storage, Edge Functions)

---

## UI & Styling

-   **Styling Engine**: NativeWind (Tailwind CSS for React Native)
-   **Component Strategy**: Custom Components
-   **Bottom Sheets**: Gorhom Bottom Sheet

---

## Navigation & Routing

-   **Navigation Library**: React Navigation v7
-   **Stack Navigation**: `@react-navigation/native-stack`
-   **Tab Navigation**: `@react-navigation/bottom-tabs`
-   **Navigation Container**: `@react-navigation/native`

---

## Key Libraries & Packages

-   **Form Management**: `react-hook-form`
-   **Date/Time Picker**: `react-native-modal-datetime-picker`
-   **Calendar**: `react-native-calendars`
-   **Icons**: `@expo/vector-icons`
-   **File Handling**: `expo-document-picker` & `expo-image-picker`
-   **Image Display**: `expo-image`
-   **Animations**: `react-native-reanimated`
-   **Safe Area**: `react-native-safe-area-context`
-   **Google Places**: `react-native-google-places-autocomplete`

---

## External Services

-   **Location Services**: Google Places API (Autocomplete)
-   **Email Parsing**: Mailgun or SendGrid
-   **Flight Alerts**: Third-Party Flight API (e.g., FlightAware)
-   **Push Notifications**: Expo Push Notifications

---

## Architecture

-   **Entry Point**: `App.tsx` (React Navigation setup)
-   **Screen Organization**: `src/screens/` directory
-   **Component Structure**: `src/components/` with feature-based organization
-   **State Management**: React Context API (`TripContext`)
-   **Type Safety**: TypeScript with navigation type definitions
-   **Code Organization**: Feature-based folder structure in `src/` 