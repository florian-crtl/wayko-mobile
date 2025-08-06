import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useCityImage } from 'hooks/useCityImage';

interface TripCardImageProps {
  destination: string;
  priority?: 'low' | 'normal' | 'high';
}

export const TripCardImage: React.FC<TripCardImageProps> = ({ 
  destination,
  priority = 'normal'
}) => {
  const { imageUrl, isLoading } = useCityImage(destination);

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: imageUrl }}
        style={styles.tripImage}
        contentFit="cover"
        placeholder="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
        cachePolicy="memory-disk"
        priority={priority}
        transition={200}
        recyclingKey={destination}
      />
      
      {/* Show loading indicator only for API calls */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="rgba(255, 255, 255, 0.8)" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  tripImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
}); 