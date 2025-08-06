import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTripContext } from 'context/TripContext';
import { TripCardImage } from 'components/trip/TripCardImage';
import type { RootStackNavigationProp } from 'types/navigation';

export default function MyTripsScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { trips, deleteTrip } = useTripContext();

  const handleNewTrip = () => {
    // Navigate to CreateTrip tab within the Main navigator
    navigation.navigate('Main', { screen: 'CreateTrip' });
  };

  const handleTripPress = (tripId: string) => {
    navigation.navigate('TripDetail', { id: tripId });
  };

  const handleDeleteTrip = (tripId: string, tripName: string) => {
    Alert.alert(
      'Supprimer le voyage',
      `Êtes-vous sûr de vouloir supprimer "${tripName}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => deleteTrip(tripId)
        },
      ]
    );
  };

  const calculateCountdown = (startDate: string) => {
    const today = new Date();
    const departure = new Date(startDate);
    const diffTime = departure.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `Départ dans ${diffDays} jours`;
    } else if (diffDays === 0) {
      return "Départ aujourd'hui";
    } else {
      return "Voyage terminé";
    }
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startDay = start.getDate();
    const endDay = end.getDate();
    const startMonth = start.toLocaleDateString('fr-FR', { month: 'long' });
    const endMonth = end.toLocaleDateString('fr-FR', { month: 'long' });
    
    if (startMonth === endMonth) {
      return `${startDay} → ${endDay} ${startMonth}`;
    } else {
      return `${startDay} ${startMonth} → ${endDay} ${endMonth}`;
    }
  };

  // Sort trips by departure date: upcoming first (closest first), then past (most recent first)
  const sortedTrips = [...trips].sort((a, b) => {
    const today = new Date();
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    
    const isAUpcoming = dateA >= today;
    const isBUpcoming = dateB >= today;
    
    // If both are upcoming, sort by closest departure
    if (isAUpcoming && isBUpcoming) {
      return dateA.getTime() - dateB.getTime();
    }
    
    // If both are past, sort by most recent first
    if (!isAUpcoming && !isBUpcoming) {
      return dateB.getTime() - dateA.getTime();
    }
    
    // Upcoming trips come before past trips
    return isAUpcoming ? -1 : 1;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mes Voyages</Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.yearSelector}>
          <Text style={styles.yearText}>2025</Text>
          <Ionicons name="chevron-down" size={24} color="hsl(24 9.8% 10%)" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.newButton} onPress={handleNewTrip}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.newButtonText}>Nouveau</Text>
        </TouchableOpacity>
      </View>

      {/* Trip Cards */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                  {sortedTrips.map((trip) => (
          <TouchableOpacity 
            key={trip.id} 
            style={styles.tripCard}
            onPress={() => handleTripPress(trip.id)}
            activeOpacity={0.9}
          >
                            <TripCardImage 
                  destination={trip.destination} 
                />
            <View style={styles.tripOverlay} />
            
            {/* Delete Menu Button */}
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={(e) => {
                e.stopPropagation(); // Prevent trip card click
                handleDeleteTrip(trip.id, trip.name);
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="ellipsis-vertical" size={20} color="white" />
            </TouchableOpacity>
            
            <View style={styles.tripContent}>
              <Text style={styles.countdownText}>
                {calculateCountdown(trip.startDate)}
              </Text>
              <Text style={styles.destinationText}>{trip.destination.split(',')[0]}</Text>
              <Text style={styles.dateText}>
                {formatDateRange(trip.startDate, trip.endDate)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(0 0% 100%)',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)',
    marginRight: 4,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'hsl(24 9.8% 10%)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  newButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  tripCard: {
    width: '100%',
    height: 256,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },

  tripOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  tripContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    justifyContent: 'flex-end',
  },
  countdownText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  destinationText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  deleteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
}); 