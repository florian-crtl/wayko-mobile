import { Trip, Flight, Hotel, Rental, ItineraryItem } from 'types';

interface TripFormData {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelerCount: number;
  budget: number;
  currency: string;
}

// Random data pools for generating realistic content
const airlines = ['Air France', 'Lufthansa', 'British Airways', 'KLM', 'Emirates', 'Turkish Airlines'];
const hotelChains = ['Marriott', 'Hilton', 'Hyatt', 'InterContinental', 'Four Seasons', 'Radisson'];
const carRentals = ['Hertz', 'Avis', 'Enterprise', 'Budget', 'Sixt', 'Europcar'];

const getRandomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
const getRandomPrice = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFlightNumber = () => `${getRandomItem(['AF', 'LH', 'BA', 'KL', 'EK', 'TK'])}${Math.floor(Math.random() * 9000) + 1000}`;
const getRandomReference = () => Math.random().toString(36).substring(2, 8).toUpperCase();

const generateUniqueEmail = (destination: string, tripName: string): string => {
  const cleanDestination = destination.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanName = tripName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const randomSuffix = Math.random().toString(36).substring(2, 5);
  return `${cleanDestination}-${cleanName}-${randomSuffix}@wayko.app`;
};

const formatTime = (hour: number) => `${hour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 6) * 10}`;

const getDestinationAirport = (destination: string): string => {
  const airportCodes: { [key: string]: string } = {
    'cancun': 'CUN',
    'mexico': 'CUN',
    'tokyo': 'NRT',
    'japan': 'NRT',
    'paris': 'CDG',
    'france': 'CDG',
    'london': 'LHR',
    'uk': 'LHR',
    'new york': 'JFK',
    'usa': 'JFK',
    'dubai': 'DXB',
    'barcelona': 'BCN',
    'spain': 'BCN',
    'rome': 'FCO',
    'italy': 'FCO',
  };
  
  const key = Object.keys(airportCodes).find(k => destination.toLowerCase().includes(k));
  return key ? airportCodes[key] : 'INT';
};

export const generateFakeTrip = (formData: TripFormData, imageUrl?: string): Trip => {
  const tripId = Date.now().toString();
  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);
  const tripDurationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Generate flights
  const outboundFlight: Flight = {
    id: `flight-out-${tripId}`,
    type: 'outbound',
    fromAirport: 'CDG', // Assuming Paris departure
    toAirport: getDestinationAirport(formData.destination),
    date: formData.startDate,
    time: formatTime(8 + Math.floor(Math.random() * 8)), // 8-16h
    airline: getRandomItem(airlines),
    flightNumber: getRandomFlightNumber(),
    reference: getRandomReference(),
    price: getRandomPrice(300, 800),
  };

  const returnFlight: Flight = {
    id: `flight-return-${tripId}`,
    type: 'return',
    fromAirport: getDestinationAirport(formData.destination),
    toAirport: 'CDG',
    date: formData.endDate,
    time: formatTime(10 + Math.floor(Math.random() * 8)), // 10-18h
    airline: outboundFlight.airline,
    flightNumber: getRandomFlightNumber(),
    reference: getRandomReference(),
    price: getRandomPrice(300, 800),
  };

  // Generate hotel
  const hotel: Hotel = {
    id: `hotel-${tripId}`,
    name: `${getRandomItem(hotelChains)} ${formData.destination.split(',')[0]}`,
    address: `123 ${formData.destination.split(',')[0]} Avenue, ${formData.destination}`,
    checkInDate: formData.startDate,
    checkInTime: '15:00',
    checkOutDate: formData.endDate,
    checkOutTime: '11:00',
    price: getRandomPrice(80, 200) * tripDurationDays,
    reference: getRandomReference(),
  };

  // Generate car rental (optional, 70% chance)
  const rentals: Rental[] = [];
  if (Math.random() > 0.3) {
    rentals.push({
      id: `rental-${tripId}`,
      company: getRandomItem(carRentals),
      agencyAddress: `Airport ${getDestinationAirport(formData.destination)}, ${formData.destination}`,
      pickUpDate: formData.startDate,
      pickUpTime: '12:00',
      returnDate: formData.endDate,
      returnTime: '09:00',
      price: getRandomPrice(30, 80) * tripDurationDays,
      reference: getRandomReference(),
    });
  }

  // Generate itinerary items
  const itinerary: ItineraryItem[] = [
    {
      id: `itinerary-outbound-${tripId}`,
      type: 'flight',
      date: formData.startDate,
      time: outboundFlight.time,
      title: `Vol ${outboundFlight.flightNumber}`,
      subtitle: `${outboundFlight.fromAirport} → ${outboundFlight.toAirport}`,
      icon: '✈️',
      relatedId: outboundFlight.id,
    },
    {
      id: `itinerary-checkin-${tripId}`,
      type: 'hotel',
      date: formData.startDate,
      time: hotel.checkInTime,
      title: 'Check-in',
      subtitle: hotel.name,
      icon: '🏨',
      relatedId: hotel.id,
    },
  ];

  // Add car rental pickup if exists
  if (rentals.length > 0) {
    itinerary.push({
      id: `itinerary-pickup-${tripId}`,
      type: 'rental',
      date: formData.startDate,
      time: rentals[0].pickUpTime,
      title: 'Récupération voiture',
      subtitle: rentals[0].company,
      icon: '🚗',
      relatedId: rentals[0].id,
    });
  }

  // Add checkout and return flight
  itinerary.push(
    {
      id: `itinerary-checkout-${tripId}`,
      type: 'hotel',
      date: formData.endDate,
      time: hotel.checkOutTime,
      title: 'Check-out',
      subtitle: hotel.name,
      icon: '🏨',
      relatedId: hotel.id,
    },
    {
      id: `itinerary-return-${tripId}`,
      type: 'flight', 
      date: formData.endDate,
      time: returnFlight.time,
      title: `Vol ${returnFlight.flightNumber}`,
      subtitle: `${returnFlight.fromAirport} → ${returnFlight.toAirport}`,
      icon: '✈️',
      relatedId: returnFlight.id,
    }
  );

  // Calculate total spent (80-90% of budget for realism)
  const totalSpent = Math.floor(formData.budget * (0.8 + Math.random() * 0.1));

  return {
    id: tripId,
    name: formData.name,
    destination: formData.destination,
    startDate: formData.startDate,
    endDate: formData.endDate,
    travelers: formData.travelerCount,
    budget: formData.budget,
    currency: formData.currency,
    uniqueEmail: generateUniqueEmail(formData.destination, formData.name),
    flights: [outboundFlight, returnFlight],
    hotels: [hotel],
    rentals,
    itinerary: itinerary.sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime()),
    totalSpent,
  };
}; 