# Wayko Mobile App - Architecture Documentation

## Project Overview

Wayko is a React Native mobile application built with Expo, designed to help travelers organize and manage their trips. The architecture follows modern React Native best practices with file-based routing, TypeScript for type safety, and a component-based design system.

## Core Architecture Decisions

### 1. **Expo + Development Build Strategy**
- **Choice**: Expo SDK 53 with `expo-dev-client` 
- **Rationale**: Provides managed workflow benefits while supporting native dependencies
- **Benefits**: Fast development, over-the-air updates, easy deployment
- **Trade-offs**: Some native code limitations, bundle size considerations

### 2. **File-Based Routing (expo-router)**
- **Choice**: `expo-router` for navigation instead of React Navigation directly
- **Rationale**: Automatic route generation, better TypeScript support, Next.js-like DX
- **Structure**: Tab-based main navigation with stack navigation for details

### 3. **Styling Strategy (NativeWind)**
- **Choice**: NativeWind (Tailwind CSS for React Native)  
- **Rationale**: Utility-first CSS, consistent design system, rapid prototyping
- **Configuration**: Custom design tokens in `tailwind.config.js`
- **Fallback**: Inline styles for initial development due to configuration complexity

### 4. **State Management (React Context)**
- **Choice**: React Context API over Redux/Zustand
- **Rationale**: Simple state needs, avoiding over-engineering for MVP
- **Pattern**: Provider pattern with custom hooks for consumption

## File Structure & Responsibilities

```
wayko/
├── app/                          # Expo Router screens (file-based routing)
│   ├── _layout.tsx              # Root layout - app-wide providers
│   ├── (tabs)/                  # Tab navigation group
│   │   ├── _layout.tsx         # Tab bar configuration
│   │   ├── index.tsx           # My Trips screen (default tab)
│   │   ├── create-trip.tsx     # Trip creation form
│   │   └── profile.tsx         # User profile settings
│   ├── trip/[id].tsx           # Dynamic trip detail page
│   ├── itinerary/[id].tsx      # Full itinerary view  
│   └── booking/[id].tsx        # Individual booking details
├── components/                   # Reusable UI components
│   ├── common/                  # Generic components (Button, Input, etc.)
│   ├── trip/                    # Trip-specific components (TripCard, InfoPill)
│   └── itinerary/              # Timeline and itinerary components
├── lib/                         # Business logic and utilities
│   ├── context/                # React Context providers
│   │   └── TripContext.tsx     # Trip state management
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Helper functions
│   └── mock-data.ts           # Development data
├── types/                       # TypeScript type definitions
│   └── index.ts               # Central type exports
├── constants/                   # App-wide constants
└── assets/                     # Static assets (images, fonts)
```

## Key Files Explained

### Core Configuration Files

#### `babel.config.js`
```javascript
// Simplified configuration to avoid plugin conflicts
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'nativewind/babel'],
    // Minimal plugins to prevent 99.8% bundle hang
  };
};
```
**Purpose**: Transpilation configuration for React Native and NativeWind  
**Key Decision**: Simplified to resolve bundle hanging issues  
**Future**: Will add module-resolver and reanimated plugins incrementally

#### `app.json`
```json
{
  "expo": {
    "plugins": ["expo-router", "expo-dev-client"],
    "experiments": { "typedRoutes": true }
  }
}
```
**Purpose**: Expo project configuration  
**Key Features**: Development build support, typed routes for better DX

#### `tsconfig.json`
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "components/*": ["./components/*"],
      "lib/*": ["./lib/*"]
    }
  }
}
```
**Purpose**: TypeScript configuration with absolute import paths  
**Status**: Paths configured but temporarily using relative imports

### Application Structure

#### `app/_layout.tsx` - Root Layout
```typescript
// Root layout wraps entire app
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
```
**Purpose**: App-wide configuration, provider wrappers  
**Current**: Basic Stack navigator  
**Future**: Will add TripProvider, theme providers, error boundaries

#### `app/(tabs)/_layout.tsx` - Tab Navigation
```typescript
// Tab bar configuration with icons and styling
<Tabs screenOptions={{
  tabBarActiveTintColor: 'hsl(24 9.8% 10%)',
  tabBarInactiveTintColor: 'hsl(240 3.8% 46.1%)',
}}>
  <Tabs.Screen name="index" options={{ title: 'My Trips' }} />
  <Tabs.Screen name="create-trip" options={{ title: 'Create Trip' }} />
  <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
</Tabs>
```
**Purpose**: Main navigation structure  
**Features**: Three-tab layout with design system colors  
**Icons**: Uses `@expo/vector-icons` for consistent iconography

### Data Layer

#### `types/index.ts` - Type Definitions
```typescript
interface Trip {
  id: string;
  name: string;
  destination: string;
  flights: Flight[];
  hotels: Hotel[];
  rentals: Rental[];
  itinerary: ItineraryItem[];
  uniqueEmail: string; // Core feature for email parsing
  totalSpent: number;
}
```
**Purpose**: Comprehensive type safety across the app  
**Key Features**: Nested data structures, email integration types  
**Benefits**: Compile-time error checking, better IDE support

#### `lib/context/TripContext.tsx` - State Management
```typescript
interface TripContextType {
  trips: Trip[];
  getTripById: (id: string) => Trip | undefined;
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updatedTrip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
}
```
**Purpose**: Centralized trip state management  
**Pattern**: Context + custom hook pattern  
**Operations**: Full CRUD operations for trips  
**Status**: Created but temporarily disabled due to import issues

#### `lib/mock-data.ts` - Development Data
```typescript
export const mockTrips: Trip[] = [
  {
    id: '1',
    name: 'Cancun Vacation',
    flights: [/* detailed flight objects */],
    hotels: [/* hotel booking details */],
    // Comprehensive realistic data for development
  }
];
```
**Purpose**: Realistic data for development and testing  
**Features**: Complete trip objects with all nested data  
**Usage**: Populate UI during development, testing data flows

## Technical Architecture Patterns

### 1. **Component Architecture**
- **Pattern**: Atomic design principles
- **Structure**: Common components → Feature components → Screen components
- **Props**: TypeScript interfaces for all component props
- **Styling**: Utility-first with NativeWind (when enabled)

### 2. **Navigation Pattern**
- **Structure**: File-based routing with expo-router
- **Params**: Typed route parameters with TypeScript
- **Nesting**: Tab navigation with nested stack navigators
- **Deep Linking**: Automatic based on file structure

### 3. **State Management Pattern**
- **Global State**: React Context for trip data
- **Local State**: useState for component-specific state  
- **Forms**: React Hook Form for complex forms
- **Persistence**: In-memory for MVP, AsyncStorage planned

### 4. **Error Handling Strategy**
- **Boundaries**: React Error Boundaries (planned)
- **Async**: Try-catch blocks with user-friendly messaging
- **Validation**: TypeScript + runtime validation
- **Logging**: Development console, production logging planned

## Development Workflow

### 1. **Build Process**
- **Development**: `expo-dev-client` for native debugging
- **Bundling**: Metro bundler with custom configuration
- **Hot Reload**: Fast refresh enabled for rapid development
- **TypeScript**: Compile-time checking with strict mode

### 2. **Testing Strategy** (Planned)
- **Unit Tests**: Jest + React Native Testing Library
- **Integration**: End-to-end with Detox
- **Type Safety**: TypeScript as first line of defense
- **Manual**: Device testing with development build

### 3. **Performance Considerations**
- **Bundle Size**: Minimal dependencies, tree shaking
- **Rendering**: React.memo for expensive components
- **Lists**: FlatList with optimization props
- **Images**: expo-image with caching and optimization

## Known Technical Debt & Future Improvements

### Immediate (Phase 2)
1. **Re-enable NativeWind**: Gradual rollout of utility styling
2. **Absolute Imports**: Add back module-resolver plugin carefully
3. **Context Integration**: Re-enable TripProvider with error handling
4. **Component Library**: Build out common components

### Medium Term (Phase 3-4)
1. **Animation System**: Add react-native-reanimated properly
2. **Form Validation**: Comprehensive validation system
3. **Offline Support**: AsyncStorage + sync strategies
4. **Error Boundaries**: Comprehensive error handling

### Long Term (Post-MVP)
1. **Backend Integration**: API layer with caching
2. **Email Parsing**: Core feature implementation
3. **Push Notifications**: Expo push notification system
4. **Performance Optimization**: Bundle splitting, lazy loading

## Security Considerations

### Data Protection
- **Sensitive Data**: expo-secure-store for credentials
- **Local Storage**: Encrypted AsyncStorage for trip data
- **API Communication**: HTTPS only, token-based auth

### Privacy
- **Email Processing**: Server-side parsing, minimal data retention
- **User Data**: GDPR compliance considerations
- **Analytics**: Privacy-first analytics implementation

## Deployment Architecture

### Development
- **Local**: Expo development server + iOS/Android simulators
- **Testing**: Development build on physical devices
- **Debugging**: Flipper integration, React DevTools

### Production (Planned)
- **Build**: EAS Build for optimized production builds
- **Distribution**: App Store, Google Play Store
- **Updates**: EAS Update for over-the-air updates
- **Monitoring**: Error tracking and performance monitoring

---

This architecture provides a solid foundation for the Wayko mobile application, balancing rapid development needs with long-term maintainability and scalability.
