import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Button } from '../components/common/Button';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleCreateTrip = () => {
    // Navigate directly to the create trip tab
    router.replace('/(tabs)/create-trip' as any);
  };



  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <Text style={styles.welcomeTitle}>Bienvenue</Text>

      <View style={styles.card}>
        {/* Background Image */}
        <Image 
          source={require('../assets/earth.jpg')}
          style={styles.backgroundImage}
          contentFit="cover"
          placeholder="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
        />
        
        {/* Overlay for better text readability */}
        <View style={styles.overlay} />

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.brandSection}>
            <Text style={styles.brandName}>Wayko</Text>
            <Text style={styles.tagline}>Planifiez moins. Profitez plus.</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Créer un voyage"
              onPress={handleCreateTrip}
              variant="secondary"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(0 0% 100%)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 64, // Account for status bar + extra padding
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)', // foreground color
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    height: 312,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: -2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    opacity: 0.95,
    fontWeight: '400',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
}); 