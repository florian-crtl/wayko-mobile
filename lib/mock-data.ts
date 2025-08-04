import { Trip, Flight, Hotel, Rental, ItineraryItem } from 'types';

export const mockTrips: Trip[] = [
  {
    id: '1',
    name: 'Santorini Getaway',
    destination: 'Santorini, Greece',
    startDate: '2024-12-15',
    endDate: '2024-12-22',
    travelers: 2,
    budget: 5000,
    currency: 'EUR',
    uniqueEmail: 'cancun-abc123@wayko.app',
    totalSpent: 3963.86,
    manualExpenses: [
      {
        id: 'me1',
        title: 'Déjeuner restaurant de plage',
        amount: 85.50,
        category: 'food',
        currency: 'EUR',
        date: '2024-12-16',
        description: 'Restaurant Mariscos El Galeon - vue sur mer'
      },
      {
        id: 'me2',
        title: 'Excursion Chichen Itza',
        amount: 180.00,
        category: 'activities',
        currency: 'EUR',
        date: '2024-12-18'
      },
      {
        id: 'me3',
        title: 'Souvenirs au marché',
        amount: 45.30,
        category: 'shopping',
        currency: 'EUR',
        date: '2024-12-20',
        description: 'Artisanat local et cadeaux famille'
      },
      {
        id: 'me4',
        title: 'Taxi vers cenote',
        amount: 35.00,
        category: 'transport',
        currency: 'EUR',
        date: '2024-12-17'
      }
    ],
    flights: [
      {
        id: 'f1',
        type: 'outbound',
        fromAirport: 'CDG',
        toAirport: 'CUN',
        date: '2024-12-15',
        time: '10:30',
        airline: 'Air France',
        flightNumber: 'AF438',
        reference: 'ABC123',
        price: 850.00
      },
      {
        id: 'f2',
        type: 'return',
        fromAirport: 'CUN',
        toAirport: 'CDG',
        date: '2024-12-22',
        time: '14:45',
        airline: 'Air France',
        flightNumber: 'AF439',
        reference: 'ABC124',
        price: 850.00
      }
    ],
    hotels: [
      {
        id: 'h1',
        name: 'Grand Oasis Cancun',
        address: 'Blvd. Kukulcan Km 16.5, Zona Hotelera, 77500 Cancún',
        checkInDate: '2024-12-15',
        checkInTime: '15:00',
        checkOutDate: '2024-12-22',
        checkOutTime: '12:00',
        price: 1890.50,
        reference: 'HTL456'
      }
    ],
    rentals: [
      {
        id: 'r1',
        company: 'Hertz',
        agencyAddress: 'Cancun International Airport, Terminal 3',
        pickUpDate: '2024-12-15',
        pickUpTime: '18:00',
        returnDate: '2024-12-22',
        returnTime: '11:00',
        price: 373.36,
        reference: 'RNT789'
      }
    ],
    itinerary: [
      {
        id: 'i1',
        type: 'flight',
        date: '2024-12-15',
        time: '10:30',
        title: 'Flight to Cancun',
        subtitle: 'CDG → CUN - Air France AF438',
        icon: '✈️',
        relatedId: 'f1'
      },
      {
        id: 'i2',
        type: 'hotel',
        date: '2024-12-15',
        time: '15:00',
        title: 'Check-in',
        subtitle: 'Grand Oasis Cancun',
        icon: '🏨',
        relatedId: 'h1'
      },
      {
        id: 'i3',
        type: 'rental',
        date: '2024-12-15',
        time: '18:00',
        title: 'Car Pickup',
        subtitle: 'Hertz - Cancun Airport',
        icon: '🚘',
        relatedId: 'r1'
      },
      {
        id: 'i4',
        type: 'hotel',
        date: '2024-12-22',
        time: '12:00',
        title: 'Check-out',
        subtitle: 'Grand Oasis Cancun',
        icon: '🏨',
        relatedId: 'h1'
      },
      {
        id: 'i5',
        type: 'rental',
        date: '2024-12-22',
        time: '11:00',
        title: 'Car Return',
        subtitle: 'Hertz - Cancun Airport',
        icon: '🚘',
        relatedId: 'r1'
      },
      {
        id: 'i6',
        type: 'flight',
        date: '2024-12-22',
        time: '14:45',
        title: 'Return Flight',
        subtitle: 'CUN → CDG - Air France AF439',
        icon: '✈️',
        relatedId: 'f2'
      }
    ]
  },
  {
    id: '2',
    name: 'Bali Retreat',
    destination: 'Bali, Indonesia',
    startDate: '2025-03-10',
    endDate: '2025-03-17',
    travelers: 1,
    budget: 3500,
    currency: 'EUR',
    uniqueEmail: 'bali-def456@wayko.app',
    totalSpent: 2850.75,
    flights: [
      {
        id: 'f3',
        type: 'outbound',
        fromAirport: 'CDG',
        toAirport: 'NRT',
        date: '2025-03-10',
        time: '13:15',
        airline: 'JAL',
        flightNumber: 'JL406',
        reference: 'DEF123',
        price: 1200.00
      },
      {
        id: 'f4',
        type: 'return',
        fromAirport: 'NRT',
        toAirport: 'CDG',
        date: '2025-03-17',
        time: '17:30',
        airline: 'JAL',
        flightNumber: 'JL405',
        reference: 'DEF124',
        price: 1200.00
      }
    ],
    hotels: [
      {
        id: 'h2',
        name: 'Park Hyatt Tokyo',
        address: '3-7-1-2 Nishi Shinjuku, Shinjuku City, Tokyo 163-1055',
        checkInDate: '2025-03-10',
        checkInTime: '15:00',
        checkOutDate: '2025-03-17',
        checkOutTime: '12:00',
        price: 450.75,
        reference: 'HTL789'
      }
    ],
    rentals: [],
    itinerary: [
      {
        id: 'i7',
        type: 'flight',
        date: '2025-03-10',
        time: '13:15',
        title: 'Flight to Tokyo',
        subtitle: 'CDG → NRT - JAL JL406',
        icon: '✈️',
        relatedId: 'f3'
      },
      {
        id: 'i8',
        type: 'hotel',
        date: '2025-03-10',
        time: '15:00',
        title: 'Check-in',
        subtitle: 'Park Hyatt Tokyo',
        icon: '🏨',
        relatedId: 'h2'
      },
      {
        id: 'i9',
        type: 'hotel',
        date: '2025-03-17',
        time: '12:00',
        title: 'Check-out',
        subtitle: 'Park Hyatt Tokyo',
        icon: '🏨',
        relatedId: 'h2'
      },
      {
        id: 'i10',
        type: 'flight',
        date: '2025-03-17',
        time: '17:30',
        title: 'Return Flight',
        subtitle: 'NRT → CDG - JAL JL405',
        icon: '✈️',
        relatedId: 'f4'
      }
    ]
  }
]; 