import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Trip } from '../../types';
import { useCityImage } from '../../lib/hooks/useCityImage';

interface TripCardProps {
  trip: Trip;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const router = useRouter();
  const { imageUrl: cityImageUrl } = useCityImage(trip.destination);

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
    router.push(`/trip/${trip.id}` as any);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <Image 
        source={{ uri: cityImageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' }} 
        style={styles.image}
        contentFit="cover"
        placeholder="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
      />
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