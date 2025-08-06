export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  currency: string;
  uniqueEmail: string;
  flights: Flight[];
  hotels: Hotel[];
  rentals: Rental[];
  itinerary: ItineraryItem[];
  totalSpent: number;
  manualExpenses?: ManualExpense[];
}

export interface Flight {
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

export interface Hotel {
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

export interface Rental {
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

export interface ItineraryItem {
  id: string;
  type: 'flight' | 'hotel' | 'rental';
  date: string;
  time: string;
  title: string;
  subtitle: string;
  icon: string;
  relatedId: string;
}

export interface ManualExpense {
  id: string;
  category: 'transport' | 'hotel' | 'food' | 'activities' | 'shopping' | 'other';
  title: string;
  amount: number;
  currency: string;
  date: string;
  description?: string;
}

export interface ExpenseBreakdown {
  transport: number;
  hotel: number;
  rental: number;
  manual: number;
  total: number;
} 