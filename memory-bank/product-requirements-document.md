# Product Requirements Document (PRD): Wayko

## 1. Mission

To provide travelers with a powerful yet simple solution to easily organize, centralize, and track their trips, allowing them to plan less and enjoy their travels more.

## 2. Core Value Proposition

Wayko eliminates the stress and fragmentation of travel planning. By consolidating all essential information into an intuitive interface, the app allows users to effortlessly manage their entire journey, from flights and hotels to expenses. Its motto: **Plan less. Enjoy more.**

## 3. Key Features

- **Detailed Itineraries:** Automatic, chronological generation of travel plans including flights, accommodations, and transportation.
- **Easy Sharing:** Seamlessly share trip details with family, friends, or collaborators.
- **Document Integration:** A central hub for all important documents like PDFs, e-tickets, and booking confirmations.
- **Real-time Flight Alerts:** Proactive notifications about flight status changes.
- **Intuitive Interface:** A clean, elegant, and easy-to-navigate design, optimized for a mobile-first experience.

---

## 4. Detailed User Journey

### 4.1. Onboarding and Trip Creation

The user's journey begins on a clean welcome screen featuring an inspiring image of the Earth and the "Wayko" logo. The value proposition is clearly stated, with a primary call-to-action button: **"Create a trip"**.

Upon tapping this button, the user is navigated to the trip creation screen. This is where the foundational details of the journey are established:

- **Trip Name:** A descriptive name for the trip (e.g., "Cancun Vacation").
- **Destination:** The city or country of travel.
- **Travel Dates:** A start and end date selected via an interactive calendar.
- **Number of Travelers:** A simple counter to set the number of people traveling.
- **Travel Budget:** A field to define a total budget and select the currency (e.g., €, $, £).

Once saved, the trip is created and added to the user's main dashboard.

### 4.2. The Main Dashboard: "My Trips"

This screen serves as the central hub for all past, present, and future trips. Trips are organized chronologically by year, with the nearest upcoming trip displayed first.

Each trip is presented as a visually appealing, interactive card that displays:

- An attractive cover photo of the destination.
- The trip name.
- A dynamic countdown ("Departure in X days").
- The trip dates.

A prominent "New" button is always visible, allowing for the quick creation of another trip.

### 4.3. The Magic: Automatic Itinerary and Expense Generation

Within a trip's detail screen, the "Organization" section reveals Wayko's key innovation: a unique email address dedicated to that specific trip (e.g., `cancun-xyz@wayko.app`).

The user simply forwards their booking confirmation emails (flights, hotels, car rentals) to this address. The Wayko system then automatically:

1.  **Parses Emails:** It intelligently extracts all relevant data, including flight numbers, departure/arrival times, hotel names, check-in/out dates, rental car details, and booking reference numbers.
2.  **Populates the Itinerary:** It uses the extracted data to build a detailed, chronological travel plan.
3.  **Aggregates Expenses:** It pulls cost information from the emails to automatically track spending against the budget.

### 4.4. The Consolidated Trip View: The Hub for Everything

The trip detail screen is the control center for a specific journey, centralizing all generated information for easy access.

- **At-a-Glance Info:** The top of the screen prominently displays the very next event, such as an upcoming flight.
- **The Three Pillars:** Large, accessible buttons for **Transport**, **Hotel**, and **Rental** provide quick access to all bookings within these categories. Badges on each icon (e.g., ②, ②, ①) show the number of bookings for each.
- **Detailed Itinerary:** A summary of the daily timeline is visible on the main screen, with a clear "See all days" link to navigate to the full, scrollable itinerary view. This view uses distinct icons (✈️, 🏨, 🚘) to differentiate event types.
- **Detailed Booking Information:** Tapping on any item in the itinerary opens a detailed view showing check-in/out dates, reservation numbers, addresses, and the specific cost of that booking.
- **Documents:** A dedicated section allows users to manually upload other relevant documents (PDFs, images, etc.), ensuring everything is stored in one place.

### 4.5. Effortless Expense Tracking

The "My Expenses" section provides a clear and automated financial overview, populated from the same booking emails.

- **Categorized Expenses:** Costs are automatically grouped under Transport, Hotel, and Rental.
- **Detailed Costs:** Each individual booking is listed with its specific cost.
- **Automatic Calculations:** The app calculates subtotals for each category and a cumulative grand total for the trip.
- **Budget vs. Actual:** A clear visual compares the total amount spent (e.g., €3,963.86) against the initial budget set by the user (e.g., €5,000.00), providing a real-time view of their financial standing.

---

## 5. Inspiration

- **Expense Sharing:** Tricount, Splitwise
- **Trip Organization:** TripIt, Polarsteps, Flighty, Tripsy
- **Idea Organization:** Notion

---

## 6. Visual Structure (Example Item Display)

#### ✈️ TRIP
- **Outbound:** `#AIRPORTNAME`, on `DATE` at `TIME` → `#AIRPORTNAME`, on `DATE` at `TIME`
- **Return:** `#AIRPORTNAME`, on `DATE` at `TIME` → `#AIRPORTNAME`, on `DATE` at `TIME`
- **Airline:** `#NAME` — Ref `#XXXX`
- **Total price:** `X €`
- ➡️ `[See travel document]`

#### 🏨 STAYS
- **Hotel:** `#HOTELNAME`
- **Address:** `#ADDRESS`
- **Check-in:** `DATE` at `TIME` — **Check-out:** `DATE` at `TIME`
- **Total price:** `X €`
- ➡️ `[See stay document]`

#### 🚘 TRANSPORT
- **Rental car:** `#RENTALCOMPANYNAME`
- **Agency address:** `#ADDRESS`
- **Pick-up:** `DATE` at `TIME` — **Return:** `DATE` at `TIME`
- **Total price:** `X €`
- ➡️ `[See rental document]` 