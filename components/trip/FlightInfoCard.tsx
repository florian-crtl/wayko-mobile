import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Flight } from '../../types';

interface FlightInfoCardProps {
  flight: Flight;
}

export const FlightInfoCard: React.FC<FlightInfoCardProps> = ({ flight }) => {
  const formatTime = (time: string) => {
    // Assuming time is in HH:MM format
    return time;
  };

  const formatDate = (date: string) => {
    const flightDate = new Date(date);
    return flightDate.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="airplane" size={20} color="hsl(24 9.8% 10%)" />
        <Text style={styles.flightType}>
          {flight.type === 'outbound' ? 'Outbound Flight' : 'Return Flight'}
        </Text>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.airportContainer}>
          <Text style={styles.airportCode}>{flight.fromAirport}</Text>
          <Text style={styles.time}>{formatTime(flight.time)}</Text>
        </View>

        <View style={styles.arrow}>
          <Ionicons name="arrow-forward" size={20} color="hsl(240 3.8% 46.1%)" />
        </View>

        <View style={styles.airportContainer}>
          <Text style={styles.airportCode}>{flight.toAirport}</Text>
          <Text style={styles.time}>--:--</Text>
        </View>
      </View>

      <View style={styles.flightDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{formatDate(flight.date)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Airline:</Text>
          <Text style={styles.detailValue}>{flight.airline}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Flight:</Text>
          <Text style={styles.detailValue}>{flight.flightNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Reference:</Text>
          <Text style={styles.detailValue}>{flight.reference}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'hsl(0 0% 100%)', // card background
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'hsl(214.3 31.8% 91.4%)', // border
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  flightType: {
    fontSize: 16,
    fontWeight: '600',
    color: 'hsl(24 9.8% 10%)', // foreground
    marginLeft: 8,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  airportContainer: {
    alignItems: 'center',
    flex: 1,
  },
  airportCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)', // foreground
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: 'hsl(240 3.8% 46.1%)', // muted-foreground
  },
  arrow: {
    paddingHorizontal: 16,
  },
  flightDetails: {
    borderTopWidth: 1,
    borderTopColor: 'hsl(214.3 31.8% 91.4%)', // border
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: 'hsl(240 3.8% 46.1%)', // muted-foreground
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: 'hsl(24 9.8% 10%)', // foreground
  },
}); 