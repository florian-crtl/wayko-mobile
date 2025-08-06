import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTripContext } from 'context/TripContext';
import { useCityImage } from 'hooks/useCityImage';
import ExpenseCard from 'components/trip/ExpenseCard';
import { ManualExpense } from 'types';
import type { RootStackNavigationProp, RootStackRouteProp } from 'types/navigation';

const CategoryButton = ({ 
  icon, 
  label, 
  count, 
  color,
  onPress 
}: {
  icon: string;
  label: string;
  count: number;
  color: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={[styles.categoryButton, { backgroundColor: color }]} onPress={onPress}>
    <View style={styles.categoryBadge}>
      <Text style={styles.categoryBadgeText}>{count}</Text>
    </View>
    <Ionicons name={icon as any} size={40} color="white" />
    <Text style={styles.categoryLabel}>{label}</Text>
  </TouchableOpacity>
);

const FlightInfoCard = ({ flight }: { flight: any }) => (
  <View style={styles.flightCard}>
    <View style={styles.flightHeader}>
      <View style={styles.flightRoute}>
        <View style={styles.airportSection}>
          <Text style={styles.cityName}>Paris</Text>
          <Text style={styles.airportCode}>CDG</Text>
          <Text style={styles.flightTime}>12:40</Text>
        </View>
        
        <View style={styles.flightMiddle}>
          <Text style={styles.flightNumber}>AC873</Text>
          <View style={styles.flightLine}>
            <View style={styles.lineLeft} />
            <Ionicons name="airplane" size={20} color="#3B82F6" />
            <View style={styles.lineRight} />
          </View>
          <Text style={styles.flightDate}>mer. 3 sept.</Text>
        </View>
        
        <View style={styles.airportSection}>
          <Text style={styles.cityName}>Toronto</Text>
          <Text style={styles.airportCode}>YYZ</Text>
          <Text style={styles.flightTime}>14:50</Text>
        </View>
      </View>
    </View>
  </View>
);

const OrganizationCard = () => (
  <View style={styles.organizationCard}>
    <View style={styles.organizationHeader}>
      <Ionicons name="mail" size={24} color="white" />
      <Text style={styles.organizationTitle}>Organisation</Text>
    </View>
    <View style={styles.organizationDivider} />
    <View style={styles.organizationContent}>
      <Text style={styles.organizationText}>
        Transférez vos mails de réservations à #adresse-email et laissez Wayko organiser votre itinéraire automatiquement pour votre voyage.
      </Text>
      <TouchableOpacity 
        style={styles.copyButton}
        onPress={() => Alert.alert('Email copié!', 'cancun-abc123@wayko.app')}
      >
        <Text style={styles.copyButtonText}>Copier</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert('Comment ça marche?', 'Fonctionnalité à venir!')}>
        <Text style={styles.howItWorksText}>Comment ça marche ?</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ItineraryCard = ({ onViewFullItinerary }: { onViewFullItinerary: () => void }) => {
  const events = [
    {
      icon: 'airplane',
      color: '#DBEAFE',
      textColor: '#1E40AF',
      title: 'CDG → YYZ',
      subtitle: 'Départ',
      time: '12:40',
    },
    {
      icon: 'bed',
      color: '#FED7AA',
      textColor: '#C2410C',
      title: 'Renaissance Cancun Resort...',
      subtitle: 'Enregistrement',
      time: '15:00',
    },
    {
      icon: 'airplane',
      color: '#DBEAFE',
      textColor: '#1E40AF',
      title: 'YYZ → CUN',
      subtitle: 'Départ',
      time: '16:35',
    },
    {
      icon: 'car',
      color: '#E9D5FF',
      textColor: '#7C3AED',
      title: 'Europcar',
      subtitle: 'Prise en charge',
      time: '17:15',
    },
  ];

  return (
    <View style={styles.itineraryCard}>
      <View style={styles.itineraryHeader}>
        <View style={styles.itineraryTitleSection}>
          <Ionicons name="globe" size={24} color="hsl(240 3.8% 46.1%)" />
          <Text style={styles.itineraryTitle}>Itinéraire</Text>
        </View>
        <TouchableOpacity style={styles.dateSelector}>
          <Text style={styles.dateSelectorText}>Choisir une date</Text>
          <Ionicons name="chevron-down" size={16} color="hsl(240 3.8% 46.1%)" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.itineraryDivider} />
      
      <View style={styles.itineraryContent}>
        <Text style={styles.dayTitle}>Jour 1</Text>
        
        <View style={styles.timelineContainer}>
          <View style={styles.timelineLine} />
          
          <View style={styles.eventsContainer}>
            {events.map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <View style={[styles.eventIcon, { backgroundColor: event.color }]}>
                  <Ionicons name={event.icon as any} size={18} color={event.textColor} />
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
                </View>
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.itineraryDivider} />
      
      <TouchableOpacity style={styles.viewAllButton} onPress={onViewFullItinerary}>
        <Text style={styles.viewAllText}>Voir tous les jours</Text>
        <Ionicons name="arrow-forward" size={20} color="hsl(24 9.8% 10%)" />
      </TouchableOpacity>
    </View>
  );
};

const DocumentsCard = () => {
  const docIcons = ['ticket', 'mail', 'image', 'link'];

  return (
    <View style={styles.documentsCard}>
      <View style={styles.documentsHeader}>
        <Ionicons name="folder" size={28} color="hsl(240 3.8% 46.1%)" />
        <Text style={styles.documentsTitle}>Documents</Text>
      </View>
      
      <View style={styles.documentsContent}>
        <View style={styles.docIconsContainer}>
          {docIcons.map((icon, index) => (
            <View key={index} style={styles.docIcon}>
              <Ionicons name={icon as any} size={24} color="hsl(240 3.8% 46.1%)" />
            </View>
          ))}
        </View>
        
        <Text style={styles.documentsText}>
          Commencez à importer vos documents de voyage et suivez votre itinéraire déjà organisé.
        </Text>
        
        <TouchableOpacity 
          style={styles.importButton}
          onPress={() => Alert.alert('Import', 'Fonctionnalité à venir!')}
        >
          <Text style={styles.importButtonText}>Importer un document</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function TripDetailScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<RootStackRouteProp<'TripDetail'>>();
  const { id } = route.params;
  const { getTripById } = useTripContext();
  
  // Find the trip by ID
  const trip = getTripById(id);
  
  // Get city image for background
  const { imageUrl: cityImageUrl, isLoading: imageLoading } = useCityImage(trip?.destination || '');
  
  if (!trip) {
    return (
      <View style={styles.container}>
        <Text>Trip not found</Text>
      </View>
    );
  }

  const handleClose = () => {
    navigation.goBack();
  };

      const handleViewFullItinerary = () => {
      navigation.navigate('Itinerary', { id });
    };

  const calculateCountdown = () => {
    const today = new Date();
    const departure = new Date(trip.startDate);
    const diffTime = departure.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `Départ dans ${diffDays} jours à ...`;
    } else if (diffDays === 0) {
      return "Départ aujourd'hui";
    } else {
      return "Voyage terminé";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={28} color="hsl(24 9.8% 10%)" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButton}>Fermer</Text>
          </TouchableOpacity>
        </View>

        {/* Trip Info */}
        <View style={styles.tripInfo}>
          <Text style={styles.countdownText}>
            {calculateCountdown()}
          </Text>
          <Text style={styles.destinationTitle}>{trip.destination.split(',')[0]}</Text>
        </View>

        {/* Destination Image with Flight Card */}
        <View style={styles.imageSection}>
          <Image 
            source={{ uri: cityImageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' }}
            style={styles.destinationImage}
            contentFit="cover"
            placeholder="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
          />
          
          {/* Loading overlay for API image fetch */}
          {imageLoading && (
            <View style={styles.imageLoadingOverlay}>
              <ActivityIndicator size="large" color="rgba(255, 255, 255, 0.9)" />
            </View>
          )}
          
          {/* Flight Info Card Overlay */}
          <View style={styles.flightCardContainer}>
            <FlightInfoCard flight={trip.flights[0]} />
          </View>
        </View>

        {/* Category Buttons */}
        <View style={styles.categoriesContainer}>
          <CategoryButton
            icon="airplane"
            label="Transport"
            count={trip.flights.length}
            color="#3B82F6"
          />
          <CategoryButton
            icon="bed"
            label="Hôtel"
            count={trip.hotels.length}
            color="#F59E0B"
          />
          <CategoryButton
            icon="car"
            label="Location"
            count={trip.rentals.length}
            color="#8B5CF6"
          />
        </View>

        {/* Organization Card */}
        <OrganizationCard />

        {/* Itinerary Card */}
        <ItineraryCard onViewFullItinerary={handleViewFullItinerary} />

        {/* Expense Card */}
        <ExpenseCard 
          trip={trip}
          onAddExpense={(expense: ManualExpense) => {
            // For MVP, we'll just show an alert
            // In real app, this would update the trip context
            Alert.alert(
              'Dépense ajoutée', 
              `${expense.title}: ${expense.amount.toLocaleString('fr-FR', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })} ${expense.currency}`
            );
          }}
        />

        {/* Documents Card */}
        <DocumentsCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(0 0% 100%)',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    fontSize: 18,
    fontWeight: '500',
    color: 'hsl(24 9.8% 10%)',
  },
  tripInfo: {
    marginBottom: 16,
  },
  countdownText: {
    fontSize: 16,
    color: 'hsl(240 3.8% 46.1%)',
    marginBottom: 4,
  },
  destinationTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)',
  },
  imageSection: {
    position: 'relative',
    marginBottom: 80,
  },
  destinationImage: {
    width: '100%',
    height: 300,
    borderRadius: 24,
  },
  flightCardContainer: {
    position: 'absolute',
    bottom: -48,
    left: '5%',
    right: '5%',
  },
  flightCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  flightHeader: {
    alignItems: 'center',
  },
  flightRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  airportSection: {
    flex: 1,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 14,
    color: 'hsl(240 3.8% 46.1%)',
    marginBottom: 4,
  },
  airportCode: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)',
    marginBottom: 4,
  },
  flightTime: {
    fontSize: 14,
    color: 'hsl(24 9.8% 10%)',
  },
  flightMiddle: {
    flex: 1,
    alignItems: 'center',
  },
  flightNumber: {
    fontSize: 12,
    color: 'hsl(240 3.8% 46.1%)',
    marginBottom: 4,
  },
  flightLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 4,
  },
  lineLeft: {
    flex: 1,
    height: 2,
    backgroundColor: '#BFDBFE',
  },
  lineRight: {
    flex: 1,
    height: 2,
    backgroundColor: '#BFDBFE',
  },
  flightDate: {
    fontSize: 12,
    color: 'hsl(240 3.8% 46.1%)',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  categoryButton: {
    width: 112,
    height: 112,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)',
  },
  categoryLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  organizationCard: {
    backgroundColor: 'hsl(24 9.8% 10%)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  organizationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  organizationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 12,
  },
  organizationDivider: {
    height: 1,
    backgroundColor: 'hsl(240 3.8% 46.1%)',
    marginBottom: 16,
  },
  organizationContent: {
    alignItems: 'center',
  },
  organizationText: {
    color: 'hsl(210 40% 98%)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  copyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 12,
  },
  copyButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  howItWorksText: {
    color: 'hsl(240 3.8% 46.1%)',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  itineraryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'hsl(214.3 31.8% 91.4%)',
    marginBottom: 32,
    overflow: 'hidden',
  },
  itineraryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  itineraryTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itineraryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'hsl(24 9.8% 10%)',
    marginLeft: 12,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateSelectorText: {
    fontSize: 14,
    color: 'hsl(240 3.8% 46.1%)',
    marginRight: 4,
  },
  itineraryDivider: {
    height: 1,
    backgroundColor: 'hsl(214.3 31.8% 91.4%)',
  },
  itineraryContent: {
    padding: 24,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)',
    marginBottom: 24,
  },
  timelineContainer: {
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'hsl(214.3 31.8% 91.4%)',
  },
  eventsContainer: {
    gap: 32,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  eventContent: {
    flex: 1,
    marginLeft: 24,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)',
    marginBottom: 4,
  },
  eventSubtitle: {
    fontSize: 14,
    color: 'hsl(240 3.8% 46.1%)',
  },
  eventTime: {
    fontSize: 14,
    color: 'hsl(240 3.8% 46.1%)',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  viewAllText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'hsl(24 9.8% 10%)',
    marginRight: 8,
  },
  documentsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'hsl(214.3 31.8% 91.4%)',
    marginBottom: 32,
    overflow: 'hidden',
  },
  documentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  documentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)',
    marginLeft: 12,
  },
  documentsContent: {
    backgroundColor: 'hsl(210 40% 98%)',
    padding: 48,
    alignItems: 'center',
  },
  docIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  docIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentsText: {
    textAlign: 'center',
    color: 'hsl(240 3.8% 46.1%)',
    marginBottom: 24,
    maxWidth: 280,
    lineHeight: 20,
  },
  importButton: {
    backgroundColor: 'hsl(24 9.8% 10%)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  importButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  imageLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
}); 