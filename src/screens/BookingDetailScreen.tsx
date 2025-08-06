import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackNavigationProp, RootStackRouteProp } from 'types/navigation';

interface BookingDetailProps {
  type: 'hotel' | 'flight' | 'car';
  title: string;
  location: string;
  details: BookingDetail[];
  reservationNumber: string;
  address?: string;
  cost: number;
  currency: string;
}

interface BookingDetail {
  icon: string;
  label: string;
  date: string;
  time: string;
}

// Mock data - in real app this would come from API/context
const mockBookingData: Record<string, BookingDetailProps> = {
  'hotel-1': {
    type: 'hotel',
    title: 'Ikal Tulum Hotel',
    location: 'Cancún, Mexique',
    details: [
      {
        icon: 'calendar',
        label: 'Enregistrement',
        date: 'ven. 12 sept.',
        time: '15:00',
      },
      {
        icon: 'calendar',
        label: 'Départ',
        date: 'ven. 23 sept.',
        time: '12:00',
      },
    ],
    reservationNumber: 'BK2001992',
    address: 'Parque Nacional al Lado de Pancho Villa, 77760 Tulum, Mexique',
    cost: 920.00,
    currency: '€',
  },
  'flight-1': {
    type: 'flight',
    title: 'Vol CDG → YYZ',
    location: 'Air France',
    details: [
      {
        icon: 'airplane',
        label: 'Départ',
        date: 'mer. 3 sept.',
        time: '12:40',
      },
      {
        icon: 'airplane',
        label: 'Arrivée',
        date: 'mer. 3 sept.',
        time: '15:25',
      },
    ],
    reservationNumber: 'AF2847X',
    address: 'Terminal 2E, Aéroport Charles de Gaulle',
    cost: 650.00,
    currency: '€',
  },
  'car-1': {
    type: 'car',
    title: 'Europcar',
    location: 'Cancún, Mexique',
    details: [
      {
        icon: 'car',
        label: 'Prise en charge',
        date: 'mer. 3 sept.',
        time: '17:15',
      },
      {
        icon: 'car',
        label: 'Remise',
        date: 'mar. 23 sept.',
        time: '10:30',
      },
    ],
    reservationNumber: 'EU789456',
    address: 'Aéroport International de Cancún, Terminal 3',
    cost: 280.00,
    currency: '€',
  },
};

const getBookingIcon = (type: string) => {
  switch (type) {
    case 'hotel':
      return 'bed';
    case 'flight':
      return 'airplane';
    case 'car':
      return 'car';
    default:
      return 'document';
  }
};

const getBookingTitle = (type: string) => {
  switch (type) {
    case 'hotel':
      return 'Coût de l\'hébergement';
    case 'flight':
      return 'Coût du vol';
    case 'car':
      return 'Coût de la location';
    default:
      return 'Coût total';
  }
};

const calculateDays = (details: BookingDetail[]) => {
  if (details.length < 2) return 1;
  
  // Simple calculation for demo - in real app would use proper date parsing
  const startDate = new Date('2024-09-03');
  const endDate = new Date('2024-09-23');
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function BookingDetailScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<RootStackRouteProp<'BookingDetail'>>();
  const { id } = route.params;
  
  const booking = mockBookingData[id as string];

  const handleBack = () => {
    navigation.goBack();
  };

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Réservation non trouvée</Text>
      </View>
    );
  }

  const days = calculateDays(booking.details);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            <Text style={styles.location}>{booking.location}</Text>
            <Text style={styles.title}>{booking.title}</Text>
          </View>
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.closeButton}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Date Details */}
        <View style={styles.section}>
          {booking.details.map((detail, index) => (
            <View key={index} style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Ionicons name={detail.icon as any} size={20} color="#9CA3AF" />
                <Text style={styles.detailLabel}>{detail.label}</Text>
              </View>
              <View style={styles.detailRight}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>{detail.date}</Text>
                </View>
                <View style={styles.timeBadge}>
                  <Text style={styles.timeText}>{detail.time}</Text>
                </View>
              </View>
            </View>
          ))}
          
          {booking.type === 'hotel' && (
            <View style={styles.daysRow}>
              <Text style={styles.daysLabel}>Nombre de jours</Text>
              <Text style={styles.daysValue}>{days}</Text>
            </View>
          )}
        </View>

        {/* Reservation Details Card */}
        <View style={styles.reservationCard}>
          <View style={styles.reservationField}>
            <Text style={styles.fieldLabel}>Numéro de réservation</Text>
            <Text style={styles.fieldValue}>{booking.reservationNumber}</Text>
          </View>
          
          {booking.address && (
            <View style={styles.reservationField}>
              <Text style={styles.fieldLabel}>Adresse</Text>
              <Text style={styles.fieldValue}>{booking.address}</Text>
            </View>
          )}
        </View>

        {/* Cost Card */}
        <View style={styles.costCard}>
          <View style={styles.costLeft}>
            <Ionicons name="wallet" size={20} color="#000" />
            <Text style={styles.costLabel}>{getBookingTitle(booking.type)}</Text>
          </View>
          <Text style={styles.costValue}>
            {booking.cost.toLocaleString('fr-FR', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })} {booking.currency}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerInfo: {
    flex: 1,
  },
  location: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 40,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    paddingTop: 8,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  detailRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  timeBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  daysLabel: {
    fontSize: 16,
    color: '#374151',
  },
  daysValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  reservationCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  reservationField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    lineHeight: 22,
  },
  costCard: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  costLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
  },
  costValue: {
    fontSize: 16,
    color: '#6B7280',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 100,
  },
}); 