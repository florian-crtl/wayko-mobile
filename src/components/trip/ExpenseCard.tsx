import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Trip, ManualExpense, ExpenseBreakdown } from 'types';
import { RootStackNavigationProp } from 'types/navigation';

interface ExpenseCardProps {
  trip: Trip;
  onAddExpense?: (expense: ManualExpense) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ trip, onAddExpense }) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'other' as ManualExpense['category'],
    description: '',
  });

  // Calculate expense breakdown
  const calculateExpenseBreakdown = (): ExpenseBreakdown => {
    const transport = trip.flights.reduce((sum, flight) => sum + flight.price, 0);
    const hotel = trip.hotels.reduce((sum, hotel) => sum + hotel.price, 0);
    const rental = trip.rentals.reduce((sum, rental) => sum + rental.price, 0);
    const manual = trip.manualExpenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
    const total = transport + hotel + rental + manual;

    return { transport, hotel, rental, manual, total };
  };

  const expenses = calculateExpenseBreakdown();

  const categoryIcons = {
    transport: 'airplane',
    hotel: 'bed',
    food: 'restaurant',
    activities: 'ticket',
    shopping: 'bag',
    other: 'card',
  };

  const categoryLabels = {
    transport: 'Transport',
    hotel: 'Hôtel',
    food: 'Restauration',
    activities: 'Activités',
    shopping: 'Shopping',
    other: 'Autre',
  };

  const handleAddExpense = () => {
    if (!newExpense.title.trim() || !newExpense.amount.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir le titre et le montant');
      return;
    }

    const expense: ManualExpense = {
      id: Date.now().toString(),
      title: newExpense.title.trim(),
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      currency: trip.currency,
      date: new Date().toISOString().split('T')[0],
      description: newExpense.description.trim() || undefined,
    };

    onAddExpense?.(expense);
    setNewExpense({ title: '', amount: '', category: 'other', description: '' });
    setIsModalVisible(false);
  };

  const handleViewAllExpenses = () => {
    navigation.navigate('Expenses', { id: trip.id });
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('fr-FR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })} ${trip.currency}`;
  };

  // Create expense items for display (similar to itinerary events)
  const expenseEvents = [];

  // Add top expenses (transport, hotel, rental)
  if (expenses.transport > 0) {
    expenseEvents.push({
      icon: 'airplane',
      color: '#DBEAFE',
      textColor: '#1E40AF',
      title: 'Transport',
      subtitle: formatCurrency(expenses.transport),
      time: '',
    });
  }

  if (expenses.hotel > 0) {
    expenseEvents.push({
      icon: 'bed',
      color: '#FED7AA',
      textColor: '#C2410C',
      title: 'Hôtel',
      subtitle: formatCurrency(expenses.hotel),
      time: '',
    });
  }

  if (expenses.rental > 0) {
    expenseEvents.push({
      icon: 'car',
      color: '#E9D5FF',
      textColor: '#7C3AED',
      title: 'Location',
      subtitle: formatCurrency(expenses.rental),
      time: '',
    });
  }

  // Add recent manual expenses
  if (trip.manualExpenses && trip.manualExpenses.length > 0) {
    trip.manualExpenses.slice(0, 2).forEach(expense => {
      expenseEvents.push({
        icon: categoryIcons[expense.category] || 'card',
        color: '#F3F4F6',
        textColor: '#374151',
        title: expense.title,
        subtitle: `${categoryLabels[expense.category] || 'Autre'}`,
        time: formatCurrency(expense.amount),
      });
    });
  }

  return (
    <View style={styles.expenseCard}>
      {/* Header - Same style as ItineraryCard */}
      <View style={styles.expenseHeader}>
        <View style={styles.expenseTitleSection}>
          <Ionicons name="wallet" size={24} color="hsl(240 3.8% 46.1%)" />
          <Text style={styles.expenseTitle}>Mes Dépenses</Text>
        </View>
        <TouchableOpacity 
          style={styles.addExpenseButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.addExpenseText}>Ajouter</Text>
          <Ionicons name="add" size={16} color="hsl(240 3.8% 46.1%)" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.expenseDivider} />
      
      {/* Content - Same style as ItineraryCard */}
      <View style={styles.expenseContent}>
        <View style={styles.timelineContainer}>
          <View style={styles.timelineLine} />
          
          <View style={styles.eventsContainer}>
            {expenseEvents.map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <View style={[styles.eventIcon, { backgroundColor: event.color }]}>
                  <Ionicons name={event.icon as any} size={18} color={event.textColor} />
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
                </View>
                {event.time ? <Text style={styles.eventTime}>{event.time}</Text> : null}
              </View>
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.expenseDivider} />
      
      {/* View All Link - Same style as ItineraryCard */}
      <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllExpenses}>
        <Text style={styles.viewAllText}>Voir toutes les dépenses</Text>
        <Ionicons name="arrow-forward" size={20} color="hsl(24 9.8% 10%)" />
      </TouchableOpacity>

      {/* Add Expense Modal - Simplified */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalCancel}>Annuler</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nouvelle Dépense</Text>
            <TouchableOpacity onPress={handleAddExpense}>
              <Text style={styles.modalSave}>Ajouter</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Titre *</Text>
              <TextInput
                style={styles.textInput}
                value={newExpense.title}
                onChangeText={(text) => setNewExpense({...newExpense, title: text})}
                placeholder="ex: Déjeuner au restaurant"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Montant ({trip.currency}) *</Text>
              <TextInput
                style={styles.textInput}
                value={newExpense.amount}
                onChangeText={(text) => setNewExpense({...newExpense, amount: text})}
                placeholder="0.00"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Catégorie</Text>
              <View style={styles.categoryGrid}>
                {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryOption,
                      newExpense.category === category && styles.categoryOptionSelected
                    ]}
                    onPress={() => setNewExpense({...newExpense, category})}
                  >
                    <Ionicons 
                      name={categoryIcons[category] as any} 
                      size={20} 
                      color={newExpense.category === category ? 'white' : '#6B7280'} 
                    />
                    <Text style={[
                      styles.categoryOptionText,
                      newExpense.category === category && styles.categoryOptionTextSelected
                    ]}>
                      {categoryLabels[category]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main card - Same as ItineraryCard (white with border)
  expenseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'hsl(214.3 31.8% 91.4%)',
    marginBottom: 32,
    overflow: 'hidden',
  },
  
  // Header - Same as ItineraryCard (white background)
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  expenseTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'hsl(24 9.8% 10%)',
    marginLeft: 12,
  },
  addExpenseButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addExpenseText: {
    fontSize: 14,
    color: 'hsl(240 3.8% 46.1%)',
    marginRight: 4,
  },
  
  // Divider - Same as ItineraryCard
  expenseDivider: {
    height: 1,
    backgroundColor: 'hsl(214.3 31.8% 91.4%)',
  },
  
  // Content - Same as ItineraryCard
  expenseContent: {
    padding: 24,
  },
  
  // Timeline - Same as ItineraryCard
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
  
  // View All Button - Same as ItineraryCard
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
  
  // Modal styles - Simplified
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalCancel: {
    fontSize: 16,
    color: '#6B7280',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'hsl(24 9.8% 10%)',
  },
  modalSave: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'hsl(24 9.8% 10%)',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: 'hsl(24 9.8% 10%)',
    backgroundColor: 'white',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryOptionSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryOptionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  categoryOptionTextSelected: {
    color: 'white',
  },
});

export default ExpenseCard; 