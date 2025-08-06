import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TripCardImage } from './TripCardImage';
import type { RootStackNavigationProp } from 'types/navigation';

interface TripCardProps {
  trip: {
    id: string;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    imageUrl?: string;
  };
  onDelete?: () => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onDelete }) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const calculateCountdown = () => {
    const startDate = new Date(trip.startDate);
    const today = new Date();
    const diffTime = startDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `Departure in ${diffDays} day${diffDays === 1 ? '' : 's'}`;
    } else if (diffDays === 0) {
      return 'Departure today';
    } else {
      return 'Trip completed';
    }
  };

  const formatDateRange = () => {
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    
    const formatOptions: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric' 
    };
    
    const start = startDate.toLocaleDateString('en-US', formatOptions);
    const end = endDate.toLocaleDateString('en-US', formatOptions);
    
    return `${start} - ${end}`;
  };

  const handlePress = () => {
    navigation.navigate('TripDetail', { id: trip.id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <TripCardImage 
          destination={trip.destination}
          priority="high"
        />
      </View>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>{trip.name}</Text>
        <Text style={styles.countdown}>{calculateCountdown()}</Text>
        <Text style={styles.dates}>{formatDateRange()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  countdown: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 2,
  },
  dates: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
  },
}); 