import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackNavigationProp, RootStackRouteProp } from 'types/navigation';

interface ItineraryEvent {
  type: 'flight' | 'hotel' | 'car';
  title: string;
  subtitle: string;
  time: string;
}

interface DayData {
  day: number;
  events: ItineraryEvent[];
}

const mockItineraryData: Record<string, DayData> = {
  "MER. 3 SEPT.": {
    day: 1,
    events: [
      {
        type: "flight",
        title: "CDG → YYZ",
        subtitle: "Départ",
        time: "12:40",
      },
      {
        type: "hotel",
        title: "Renaissance Cancun Resort...",
        subtitle: "Enregistrement",
        time: "15:00",
      },
      {
        type: "flight",
        title: "YYZ → CUN",
        subtitle: "Départ",
        time: "16:35",
      },
      {
        type: "car",
        title: "Europcar",
        subtitle: "Prise en charge",
        time: "17:15",
      },
    ],
  },
  "VEN. 12 SEPT.": {
    day: 10,
    events: [
      {
        type: "hotel",
        title: "Renaissance Cancun Resort...",
        subtitle: "Départ",
        time: "12:00",
      },
      {
        type: "hotel",
        title: "Ikal Tulum Hotel",
        subtitle: "Enregistrement",
        time: "15:00",
      },
    ],
  },
  "MAR. 23 SEPT.": {
    day: 20,
    events: [
      {
        type: "car",
        title: "Europcar",
        subtitle: "Remise",
        time: "10:30",
      },
      {
        type: "hotel",
        title: "Ikal Tulum Hotel",
        subtitle: "Départ",
        time: "12:00",
      },
      {
        type: "flight",
        title: "CUN → YUL",
        subtitle: "Départ",
        time: "14:00",
      },
      {
        type: "flight",
        title: "YUL → CDG",
        subtitle: "Départ",
        time: "21:20",
      },
    ],
  },
};

const getEventIcon = (type: string) => {
  switch (type) {
    case 'flight':
      return 'airplane';
    case 'hotel':
      return 'bed';
    case 'car':
      return 'car';
    default:
      return 'location';
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'flight':
      return { bg: '#DBEAFE', color: '#1E40AF' }; // Blue
    case 'hotel':
      return { bg: '#FED7AA', color: '#C2410C' }; // Orange
    case 'car':
      return { bg: '#E9D5FF', color: '#7C3AED' }; // Purple
    default:
      return { bg: '#F3F4F6', color: '#374151' }; // Gray
  }
};

interface EventItemProps {
  event: ItineraryEvent;
  isLast: boolean;
  onHotelPress?: () => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, isLast, onHotelPress }) => {
  const colors = getEventColor(event.type);
  const icon = getEventIcon(event.type);
  const isHotel = event.type === 'hotel';

  const EventWrapper = isHotel ? TouchableOpacity : View;

  return (
    <EventWrapper
      style={styles.eventItem}
      onPress={isHotel ? onHotelPress : undefined}
      activeOpacity={isHotel ? 0.7 : 1}
    >
      {/* Timeline dot */}
      <View style={styles.timelineDot}>
        <View style={[styles.eventIcon, { backgroundColor: colors.bg }]}>
          <Ionicons name={icon as any} size={18} color={colors.color} />
        </View>
      </View>

      {/* Event content */}
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
      </View>

      {/* Event time */}
      <Text style={styles.eventTime}>{event.time}</Text>

      {/* Timeline line */}
      {!isLast && <View style={styles.timelineLine} />}
    </EventWrapper>
  );
};

export default function ItineraryScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<RootStackRouteProp<'Itinerary'>>();
  const { id } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleHotelPress = () => {
    // Navigate to hotel detail screen with hotel booking ID
    navigation.navigate('BookingDetail', { id: 'hotel-1' });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.location}>Cancún, Mexique</Text>
            <Text style={styles.title}>Mon itinéraire</Text>
          </View>
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.closeButton}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Card header */}
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleSection}>
              <Ionicons name="globe" size={20} color="#374151" />
              <Text style={styles.cardTitle}>Itinéraire</Text>
            </View>
            <TouchableOpacity style={styles.dateSelector}>
              <Text style={styles.dateSelectorText}>Choisir une date</Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Itinerary content */}
          <View style={styles.cardContent}>
            {Object.entries(mockItineraryData).map(([date, data], dayIndex) => (
              <View key={dayIndex} style={[styles.daySection, dayIndex === Object.keys(mockItineraryData).length - 1 && styles.lastDaySection]}>
                {/* Day header */}
                <View style={styles.dayHeader}>
                  <Text style={styles.dayDate}>{date}</Text>
                  <Text style={styles.dayNumber}>Jour {data.day}</Text>
                </View>

                {/* Timeline container */}
                <View style={styles.timelineContainer}>
                  {data.events.map((event, eventIndex) => (
                    <EventItem
                      key={eventIndex}
                      event={event}
                      isLast={eventIndex === data.events.length - 1}
                      onHotelPress={handleHotelPress}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    paddingTop: 8,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  cardTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateSelectorText: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardContent: {
    padding: 16,
  },
  daySection: {
    marginBottom: 24,
  },
  lastDaySection: {
    marginBottom: 0,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  dayDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dayNumber: {
    fontSize: 14,
    color: '#6B7280',
  },
  timelineContainer: {
    paddingLeft: 20,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    marginBottom: 24,
  },
  timelineDot: {
    position: 'absolute',
    left: -20,
    top: 0,
    zIndex: 10,
  },
  eventIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'white',
  },
  eventContent: {
    flex: 1,
    paddingLeft: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  eventSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  eventTime: {
    fontSize: 14,
    color: '#374151',
    paddingTop: 2,
  },
  timelineLine: {
    position: 'absolute',
    left: -4,
    top: 32,
    bottom: -24,
    width: 2,
    backgroundColor: '#E5E7EB',
  },
}); 