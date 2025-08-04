# Wayko Mobile App - MVP Implementation Plan

This document provides a step-by-step guide for an AI developer to build the Minimum Viable Product (MVP) of the Wayko mobile application. The plan is based on the Product Requirements Document, the official Tech Stack, and an analysis of the provided web prototypes.

---

## Phase 1: Project Setup & Foundation

### Step 1.1: Initialize Expo Project

**Instruction:** Create a new Expo project using the `expo-router` template. Use the name `wayko`.

**Validation:** After initialization, run `npx expo start`. The default app should launch successfully in the simulator or on a physical device.

### Step 1.2: Install Core Dependencies

**Instruction:** Install all required dependencies as specified in `tech-stack.md`. This includes `nativewind`, `tailwindcss`, `react-hook-form`, `react-native-modal-datetime-picker`, `@expo/vector-icons`, and `expo-image`.

**Validation:** Check the `package.json` file to confirm that all specified libraries have been added to the dependencies section.

### Step 1.3: Set Up Project Directory Structure

**Instruction:** Based on the architectural guidelines, create the initial directory structure inside the project root. Create the following empty directories: `app`, `components/common`, `components/trip`, `components/itinerary`, `lib/hooks`, `lib/utils`, `lib/context`, `types`, `constants`, and `assets`.

**Validation:** List the contents of the project's root directory to verify that all new folders have been created correctly.

### Step 1.4: Configure NativeWind & Tailwind CSS

**Instruction:** Initialize and configure Tailwind CSS and NativeWind. Create a `tailwind.config.js` file. In this file, configure the `content` to scan all `.tsx` files within the `app` and `components` directories. Use the existing `globals.css` design system with its comprehensive color palette, spacing, and radius values. The colors are already defined using OKLCH format with both light and dark mode support.

**Validation:** In `app/index.tsx`, add `className="text-primary bg-background"` to a `<Text>` component. Launch the app and verify the colors from the design system are applied correctly.

### Step 1.5: Configure Absolute Imports

**Instruction:** Configure absolute imports for the project. Modify the `babel.config.js` and `tsconfig.json` files to include path aliases for the directories created in Step 1.3 (e.g., `components/*`, `lib/*`, `types/*`, `constants/*`).

**Validation:** Create a temporary test component in `components/common/Test.tsx`. Import it in `app/index.tsx` using `import Test from 'components/common/Test';`. The app should compile and run without errors.

### Step 1.6: Create Central Types Definition

**Instruction:** Create a `types/index.ts` file with comprehensive TypeScript interfaces for the app's data structure:

```typescript
interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  currency: string;
  imageUrl: string;
  uniqueEmail: string; // e.g., "cancun-xyz@wayko.app"
  flights: Flight[];
  hotels: Hotel[];
  rentals: Rental[];
  itinerary: ItineraryItem[];
  totalSpent: number;
}

interface Flight {
  id: string;
  type: 'outbound' | 'return';
  fromAirport: string;
  toAirport: string;
  date: string;
  time: string;
  airline: string;
  flightNumber: string;
  reference: string;
  price: number;
}

interface Hotel {
  id: string;
  name: string;
  address: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  price: number;
  reference: string;
}

interface Rental {
  id: string;
  company: string;
  agencyAddress: string;
  pickUpDate: string;
  pickUpTime: string;
  returnDate: string;
  returnTime: string;
  price: number;
  reference: string;
}

interface ItineraryItem {
  id: string;
  type: 'flight' | 'hotel' | 'rental';
  date: string;
  time: string;
  title: string;
  subtitle: string;
  icon: string;
  relatedId: string; // ID of the flight/hotel/rental
}
```

**Validation:** Import these types in other files to ensure they're accessible via absolute imports.

### Step 1.7: Set Up React Context for State Management

**Instruction:** Create a `lib/context/TripContext.tsx` file to manage trip data using React Context. This will handle all trip CRUD operations, form state, and data persistence in memory for the MVP. The context should provide methods for creating, updating, and retrieving trips.

**Validation:** Wrap the app in the TripProvider and verify that trip data can be accessed from any component.

### Step 1.8: Create Mock Data

**Instruction:** Create a `lib/mock-data.ts` file with 2-3 comprehensive trip objects that include all nested data (flights, hotels, rentals, itinerary items). Each trip should have realistic data matching the structure defined in `types/index.ts`. Include calculated `totalSpent` values and unique email addresses for each trip.

**Validation:** Import and log the mock data to verify the structure is correct and complete.

### Step 1.9: Set Up Tab Navigation with `expo-router`

**Instruction:** Create a `(tabs)` directory inside `app`. Set up a `_layout.tsx` file inside `app/(tabs)` to define the tab bar structure. Create three initial tabs: `index.tsx` (for "My Trips"), `create-trip.tsx`, and `profile.tsx`. Use icons from `@expo/vector-icons` for each tab. Style the tab bar using the design system colors.

**Validation:** Launch the app. A tab bar with three icons should be visible at the bottom. Tapping each icon should navigate to its corresponding screen, which can be a simple placeholder `<Text>` for now.

---

## Phase 2: Core Component Development

### Step 2.1: Create a Reusable `Button` Component

**Instruction:** Create a `Button.tsx` file in `components/common`. This component should accept `title`, `onPress`, and an optional `variant` ('primary' or 'secondary') prop. Use the design system colors from `globals.css` - primary variant uses `bg-primary text-primary-foreground`, secondary uses `bg-secondary text-secondary-foreground`. Reference the visual style from `PROTO/create-voyage-screen.tsx` for layout and spacing.

**Validation:** Import and render two `Button` components on the `profile.tsx` screen, one primary and one secondary. Verify they display with the correct design system colors and that the `onPress` function logs a message to the console when tapped.

### Step 2.2: Create a Reusable `Input` Component

**Instruction:** Create an `Input.tsx` file in `components/common`. This component will be used in forms. It should accept a `label`, `placeholder`, and all standard text input props. Style it using design system colors (`bg-input`, `border-border`, `text-foreground`) and reference the visual style from `PROTO/create-voyage-screen.tsx`.

**Validation:** Render the `Input` component on the `profile.tsx` screen. Verify it displays with the correct label and design system styling and that you can type text into it.

### Step 2.3: Create a `TripCard` Component

**Instruction:** Based on `PROTO/my-trips-screen.tsx` and the PRD, create a `TripCard.tsx` file in `components/trip`. It should accept props for `trip: Trip` (full trip object) and display `imageUrl`, `name`, countdown calculation, and `dates`. Use the `expo-image` component for the background image. Add navigation to `/trip/[id]` when pressed. Style using design system colors.

**Validation:** Import trip data from `lib/mock-data.ts` into `app/(tabs)/index.tsx`. Use a `FlatList` to render a list of `TripCard` components. Verify they display correctly with the mock data and navigate to trip detail screens when tapped.

### Step 2.4: Create an `InfoPill` Component

**Instruction:** In the `PROTO/trip-detail-screen.tsx`, there are large buttons for "Transport", "Hotel", and "Rental" with badges. Create a component `InfoPill.tsx` in `components/trip` that takes an `icon`, `label`, and `count`. Style using design system colors (`bg-card`, `text-card-foreground`, badges with `bg-primary`).

**Validation:** Render three `InfoPill` components on the `profile.tsx` screen with different icons, labels, and counts. Verify they display correctly and match the prototype's styling with design system colors.

### Step 2.5: Create `FlightInfoCard` Component

**Instruction:** Based on `PROTO/trip-detail-screen.tsx`, create a `FlightInfoCard.tsx` in `components/trip`. This component displays details for an upcoming flight from the `Flight` interface, including airports, times, and flight number. It will be positioned prominently on the Trip Detail screen. Style using design system colors.

**Validation:** Render the `FlightInfoCard` on the `profile.tsx` screen with mock flight data. Verify it matches the layout from the prototype with proper design system styling.

---

## Phase 3: Screen Implementation

### Step 3.1: Build the "My Trips" Screen

**Instruction:** Flesh out the `app/(tabs)/index.tsx` screen. It should have a title "My Trips" and a "New" button in the header. Use the `TripCard` component created earlier to display a list of trips from the React Context. The layout should be a vertical scrollable list using FlatList with proper performance optimizations (`removeClippedSubviews`, `maxToRenderPerBatch`).

**Validation:** The screen should display a list of trip cards from the context data. The "New" button in the header should navigate to the "Create Trip" tab when pressed using `router.push()`.

### Step 3.2: Build the "Create Trip" Screen (Form Logic)

**Instruction:** Implement the form in `app/(tabs)/create-trip.tsx` using `react-hook-form`. Add the fields specified in the PRD and seen in `PROTO/create-voyage-screen.tsx`: Trip Name, Destination, Dates, Travelers, and Budget. Use the custom `Input` component for text fields. For date selection, integrate `react-native-modal-datetime-picker`. For the "Travelers" and "Budget" inputs, implement custom picker components that open modals for selection. Include a section showing the unique email address that will be generated for this trip (simulated). Save data to React Context.

**Validation:** The form should be fully interactive. When you fill out all fields and press the "Save" button, the form data should be saved to context and navigation should return to My Trips screen. The date picker modal should appear when the date input field is pressed. The traveler and budget selection modals should also appear and correctly update the form state.

### Step 3.3: Set Up the Trip Detail Page

**Instruction:** Create a dynamic route for trip details at `app/trip/[id].tsx`. This screen will display the information for a single trip retrieved from React Context using the ID parameter. Use full-screen navigation (stack) from `expo-router`.

**Validation:** Verify that navigating to `app/trip/1` retrieves and displays the correct trip data from context. The TripCard navigation should work correctly.

### Step 3.4: Build the Header of the Trip Detail Screen

**Instruction:** In `app/trip/[id].tsx`, build the top section based on `PROTO/trip-detail-screen.tsx`. This includes the destination image as a background, the trip name, and dates. Fetch the specific trip's data from React Context based on the `id` param. Style using design system colors with proper contrast for text over images.

**Validation:** When navigating to a trip's detail page, the header should display the correct background image, name, and dates for that specific trip from the context data.

### Step 3.5: Implement the "Pillars" Section

**Instruction:** In `app/trip/[id].tsx`, below the header, add the three `InfoPill` components for Transport, Hotel, and Rental. The `count` for each pill should be calculated from the trip's flights, hotels, and rentals arrays. Add navigation to filtered booking lists when pressed.

**Validation:** The three info pills should be displayed correctly below the header, showing the right count for bookings in each category for the selected trip based on context data.

### Step 3.6: Build the Itinerary Summary with Email Simulation

**Instruction:** In `app/trip/[id].tsx`, create a summary view of the itinerary as seen in `PROTO/trip-detail-screen.tsx`. Create a new component `components/itinerary/ItineraryItem.tsx` that takes an `ItineraryItem` object and displays `icon`, `title`, `subtitle`, and `time`. List the first few itinerary events from the trip data. Add a "See all days" link that navigates to `/itinerary/[id]`. Include a section showing the trip's unique email address with a note that booking confirmations sent here will be automatically parsed (simulated for MVP).

**Validation:** The screen should display a short, scrollable list of itinerary items below the info pills. Each item should have the correct icon (✈️, 🏨, 🚘) and information from the trip's itinerary array. The "See all days" link should navigate correctly.

---

## Phase 4: Finalizing MVP

### Step 4.1: Create Full Itinerary Screen

**Instruction:** Create a new screen at `app/itinerary/[id].tsx`. When the "See all days" link from the trip detail screen is pressed, navigate to this full-screen route. This screen should display the *full* chronological itinerary for the trip, grouped by day, using the trip's itinerary array from context.

**Validation:** Tapping "See all days" on a trip detail page should navigate to the full itinerary screen using `router.push()`. The screen should list all itinerary events for that trip from context, correctly organized by day.

### Step 4.2: Create Booking Detail Screen

**Instruction:** Based on `PROTO/hotel-detail-screen.tsx`, create a generic booking detail screen at `app/booking/[id].tsx`. This screen should display detailed information for any booking item (flight, hotel, or rental) using the appropriate interface from `types/index.ts`. Show all relevant details like check-in/out times, reservation numbers, addresses, and costs. Use full-screen navigation.

**Validation:** Update the `ItineraryItem` component to navigate to this new screen using `router.push('/booking/[id]')`, passing a booking ID. Verify that the correct booking details from context are displayed on the screen.

### Step 4.3: Implement Manual Expense Entry

**Instruction:** Add a simple expense tracking feature to the trip detail screen. Create a section that shows calculated expenses from bookings and allows manual entry of additional expenses. Display budget vs actual spending with visual indicators using design system colors. Update the `totalSpent` field in the trip context.

**Validation:** Verify that booking costs are automatically calculated and displayed, manual expenses can be added, and the budget comparison updates in real-time.

### Step 4.4: Basic Profile Screen

**Instruction:** Implement a basic placeholder screen in `app/(tabs)/profile.tsx`. It can simply contain user info placeholders and a "Log Out" button styled with design system colors. This is minimal for MVP.

**Validation:** The profile tab should show the placeholder content and the styled "Log Out" button.

### Step 4.5: Review and Refine Styling

**Instruction:** Do a final pass on all created components and screens. Ensure that spacing, font sizes, and colors consistently use the design system from `globals.css`. Verify dark mode support works correctly. Clean up any temporary validation code. Ensure the UI matches the visual identity presented in the `MVP - *.png` images and `PROTO` files but implemented with the proper tech stack.

**Validation:** Manually navigate through the entire application. Test both light and dark modes. The UI should look polished, cohesive, and professional, with no visual bugs or misaligned elements. All interactions should be smooth and responsive. 