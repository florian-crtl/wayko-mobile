import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Trip } from 'types';
import { mockTrips } from '../mock-data';

interface TripContextType {
  trips: Trip[];
  getTripById: (id: string) => Trip | undefined;
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updatedTrip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};

interface TripProviderProps {
  children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);

  const getTripById = (id: string): Trip | undefined => {
    return trips.find(trip => trip.id === id);
  };

  const addTrip = (trip: Trip) => {
    setTrips(prev => [...prev, trip]);
  };

  const updateTrip = (id: string, updatedTrip: Partial<Trip>) => {
    setTrips(prev => 
      prev.map(trip => 
        trip.id === id ? { ...trip, ...updatedTrip } : trip
      )
    );
  };

  const deleteTrip = (id: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
  };

  const value: TripContextType = {
    trips,
    getTripById,
    addTrip,
    updateTrip, 
    deleteTrip,
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
}; 