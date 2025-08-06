import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackNavigationProp, RootStackRouteProp } from 'types/navigation';
import { useTripContext } from 'context/TripContext';

interface CategorySection {
  title: string;
  icon: string;
  items: ExpenseItem[];
  total: number;
}

interface ExpenseItem {
  title: string;
  amount: number;
  currency: string;
}

export default function ExpensesScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<RootStackRouteProp<'Expenses'>>();
  const { id } = route.params;
  const { getTripById } = useTripContext();
  
  // Find the trip by ID
  const trip = getTripById(id as string);

  const handleBack = () => {
    navigation.goBack();
  };

  if (!trip) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Voyage non trouvé</Text>
      </View>
    );
  }

  // Build category sections
  const sections: CategorySection[] = [];

  // Transport section
  if (trip.flights.length > 0) {
    const transportItems: ExpenseItem[] = trip.flights.map(flight => ({
      title: `${flight.fromAirport} → ${flight.toAirport}`,
      amount: flight.price,
      currency: trip.currency,
    }));
    const transportTotal = transportItems.reduce((sum, item) => sum + item.amount, 0);
    
    sections.push({
      title: 'Transport',
      icon: 'airplane',
      items: transportItems,
      total: transportTotal,
    });
  }

  // Hôtel section
  if (trip.hotels.length > 0) {
    const hotelItems: ExpenseItem[] = trip.hotels.map(hotel => ({
      title: hotel.name.replace('Grand Oasis Cancun', 'Renaissance Cancun Resort...'),
      amount: hotel.price,
      currency: trip.currency,
    }));
    const hotelTotal = hotelItems.reduce((sum, item) => sum + item.amount, 0);
    
    sections.push({
      title: 'Hôtel',
      icon: 'bed',
      items: hotelItems,
      total: hotelTotal,
    });
  }

  // Location section
  if (trip.rentals.length > 0) {
    const rentalItems: ExpenseItem[] = trip.rentals.map(rental => ({
      title: rental.company,
      amount: rental.price,
      currency: trip.currency,
    }));
    const rentalTotal = rentalItems.reduce((sum, item) => sum + item.amount, 0);
    
    sections.push({
      title: 'Location',
      icon: 'car',
      items: rentalItems,
      total: rentalTotal,
    });
  }

  // Calculate grand total
  const grandTotal = sections.reduce((sum, section) => sum + section.total, 0);

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('fr-FR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })} ${trip.currency}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.location}>{trip.destination}</Text>
            <Text style={styles.title}>Mes dépenses</Text>
          </View>
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.closeButton}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Category Sections */}
        {sections.map((section, index) => (
          <View key={index} style={styles.categoryCard}>
            {/* Category Header */}
            <View style={styles.categoryHeader}>
              <Ionicons name={section.icon as any} size={20} color="#000" />
              <Text style={styles.categoryTitle}>{section.title}</Text>
            </View>

            {/* Category Items */}
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.categoryItem}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemAmount}>{formatCurrency(item.amount)}</Text>
              </View>
            ))}

            {/* Category Total */}
            <View style={styles.categoryTotal}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>{formatCurrency(section.total)}</Text>
            </View>
          </View>
        ))}

        {/* Grand Total Card */}
        <View style={styles.grandTotalCard}>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalAmount}>{formatCurrency(grandTotal)}</Text>
          </View>
          <View style={styles.budgetRow}>
            <Text style={styles.budgetLabel}>Budget</Text>
            <Text style={styles.budgetAmount}>{formatCurrency(trip.budget)}</Text>
          </View>
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
  location: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  title: {
    fontSize: 34,
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
    paddingHorizontal: 24,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 16,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemTitle: {
    fontSize: 15,
    color: '#000',
    flex: 1,
  },
  itemAmount: {
    fontSize: 15,
    color: '#8E8E93',
    fontWeight: '400',
  },
  categoryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  totalAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  grandTotalCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 32,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  grandTotalLabel: {
    fontSize: 17,
    fontWeight: '300',
    color: '#8E8E93',
  },
  grandTotalAmount: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 17,
    fontWeight: '300',
    color: '#8E8E93',
  },
  budgetAmount: {
    fontSize: 17,
    fontWeight: '400',
    color: '#8E8E93',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 100,
  },
}); 