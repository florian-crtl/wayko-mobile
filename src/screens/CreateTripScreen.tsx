import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import Animated, { 
  LinearTransition, 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolate,
  Extrapolate,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTripContext } from 'context/TripContext';
import { GooglePlacesInput, SearchResultItem } from 'components/common/GooglePlacesInput';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import { generateFakeTrip } from 'utils/generateFakeTrip';
import type { RootStackNavigationProp } from 'types/navigation';

type ExpandedSection = 'name' | 'dates' | 'location' | 'guests' | 'budget' | null;

interface TravelerInputProps {
  index: number;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}

const TravelerInput: React.FC<TravelerInputProps> = React.memo(({ 
  index, 
  value, 
  onChangeText, 
  placeholder,
  autoFocus = false
}) => {
  const inputRef = React.useRef<TextInput>(null);
  
  React.useEffect(() => {
    if (autoFocus) {
      // Petit délai pour laisser l'animation se faire
      setTimeout(() => {
        inputRef.current?.focus();
      }, 350);
    }
  }, [autoFocus]);
  
  return (
    <View style={styles.travelerInputContainer}>
      <View style={styles.travelerNumberBadge}>
        <Text style={styles.travelerNumberText}>{index + 1}</Text>
      </View>
      <TextInput
        ref={inputRef}
        style={styles.travelerInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="words"
      />
    </View>
  );
});

// Optimized trip name input that doesn't cause re-renders
const TripNameInput = React.memo(({ 
  value, 
  onChangeText,
  onFocus,
  onBlur,
  isExpanded
}: { 
  value: string; 
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isExpanded?: boolean;
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);
  
  React.useEffect(() => {
    if (isExpanded) {
      // Petit délai pour laisser l'animation se faire
      setTimeout(() => {
        inputRef.current?.focus();
      }, 350);
    }
  }, [isExpanded]);
  
  const handleClear = React.useCallback(() => {
    onChangeText('');
  }, [onChangeText]);
  
  const handleFocus = React.useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);
  
  const handleBlur = React.useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);
  
  return (
    <View style={styles.airbnbInputWrapper}>
      <TextInput
        ref={inputRef}
        style={[
          styles.airbnbInput,
          isFocused && styles.airbnbInputFocused,
          value && value.length > 0 && styles.airbnbInputFilled
        ]}
        placeholder="Donnez un nom à votre voyage"
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCorrect={false}
        autoCapitalize="words"
        returnKeyType="done"
        selectionColor="#000000"
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      {value && value.length > 0 && (
        <View style={styles.airbnbClearButton}>
          <TouchableOpacity 
            onPress={handleClear}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close-circle-outline" size={22} color="#6B7280" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}

const CURRENCIES: CurrencyOption[] = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'Dollar US' },
  { code: 'GBP', symbol: '£', name: 'Livre Sterling' },
  { code: 'CHF', symbol: 'CHF', name: 'Franc Suisse' },
  { code: 'CAD', symbol: 'C$', name: 'Dollar Canadien' },
  { code: 'JPY', symbol: '¥', name: 'Yen Japonais' },
];

interface ExpandableSectionProps {
  title: string;
  value: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  onLayout?: (event: any) => void;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = React.memo(({
  title,
  value,
  isExpanded,
  onToggle,
  children,
  onLayout
}) => {
  const height = useSharedValue(isExpanded ? 1 : 0);
  const opacity = useSharedValue(isExpanded ? 1 : 0);
  const sectionRef = useRef<View>(null);

  React.useEffect(() => {
    if (isExpanded) {
      height.value = withTiming(1, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      height.value = withTiming(0, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [isExpanded]);

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      height: height.value === 0 ? 0 : 'auto',
      opacity: opacity.value,
      overflow: 'hidden',
    };
  });

  return (
    <Animated.View 
      ref={sectionRef}
      style={styles.section} 
      layout={LinearTransition.duration(300)}
      onLayout={onLayout}
    >
      <TouchableOpacity
        style={[styles.sectionHeader, isExpanded && styles.sectionHeaderExpanded]}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        {!isExpanded && (
          <Text style={styles.sectionValue}>{value}</Text>
        )}
      </TouchableOpacity>

      {isExpanded && (
        <Animated.View 
          style={[styles.expandedContent, animatedContentStyle]}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
        >
          {children}
        </Animated.View>
      )}
    </Animated.View>
  );
});

export default function CreateTripScreen() {
  const router = useNavigation<RootStackNavigationProp>();
  const { addTrip } = useTripContext();
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Refs pour chaque section
  const sectionRefs = useRef<{ [key: string]: { y: number } }>({});
  
  // Form data
  const [tripName, setTripName] = useState('');
  
  // Memoize the callback to prevent re-renders
  const handleTripNameChange = React.useCallback((text: string) => {
    setTripName(text);
  }, []);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelerCount, setTravelerCount] = useState(1);
  const [travelerNames, setTravelerNames] = useState<string[]>(['']);
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState<CurrencyOption>(CURRENCIES[0]); // Default to EUR

  // Search state
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);



  // Default destination image
  const destinationImageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';

  // Destinations suggestions
  const destinationSuggestions = [
    { id: 1, name: 'Marseille, Provence-Alpes-Côte d\'Azur', description: 'Destination balnéaire prisée', icon: 'storefront' },
    { id: 2, name: 'Athènes, Grèce', description: 'Célèbre pour des sites comme : Acropole d\'Athènes', icon: 'library' },
    { id: 3, name: 'Nice, Provence-Alpes-Côte d\'Azur', description: 'Pour sa gastronomie exceptionnelle', icon: 'restaurant' },
    { id: 4, name: 'Lille, Hauts-de-France', description: 'Populaire auprès des voyageurs à proximité', icon: 'business' },
  ];

  const handleBack = () => {
    router.goBack();
  };

  const handleSave = () => {
    // Validate required fields
    if (!tripName.trim() || !destination.trim() || !startDate || !endDate || !budget) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs requis.');
      return;
    }

    // Create trip data
    const tripFormData = {
      name: tripName.trim(),
      destination: destination.trim(),
      startDate,
      endDate,
      travelerCount,
      budget: parseFloat(budget),
      currency: currency.code,
    };

    // Generate fake trip with realistic data
    const newTrip = generateFakeTrip(tripFormData, destinationImageUrl);
    
    // Save to context
    addTrip(newTrip);
    
    // Success feedback
    Alert.alert(
      'Voyage créé !',
      `Votre voyage "${tripName}" a été créé avec succès.`,
      [
                  {
            text: 'OK',
            onPress: () => router.navigate('Main', { screen: 'MyTrips' })
          }
      ]
    );
  };

  const toggleSection = (section: ExpandedSection) => {
    // Fermer le clavier quand on change de section
    Keyboard.dismiss();
    
    const isOpening = expandedSection !== section;
    setExpandedSection(expandedSection === section ? null : section);
    
    // Scroll vers la section après un court délai pour l'animation
    if (isOpening && section && sectionRefs.current[section]) {
      setTimeout(() => {
        const sectionY = sectionRefs.current[section].y;
        // Offsets spéciaux selon les sections
        let offset = 20; // Par défaut
        if (section === 'dates') {
          offset = 100; // Plus d'espace pour le calendrier
        } else if (section === 'location') {
          offset = 80; // Plus d'espace pour voir le champ du dessus
        }
        
        scrollViewRef.current?.scrollTo({
          x: 0,
          y: Math.max(0, sectionY - offset),
          animated: true
        });
      }, section === 'dates' ? 350 : 100); // Plus de délai pour dates à cause de l'animation du calendrier
    }
  };

  const formatDateRange = () => {
    if (!startDate) return 'Définir une date';
    if (!endDate) return startDate;
    return `${startDate} - ${endDate}`;
  };

  const formatGuestCount = () => {
    if (travelerCount === 1) return '1 voyageur';
    return `${travelerCount} voyageurs`;
  };

  const formatBudget = () => {
    if (!budget) return 'Définir un budget';
    const numBudget = parseFloat(budget.replace(/\s/g, '')); // Remove spaces for parsing
    if (isNaN(numBudget)) return 'Définir un budget';
    return `${numBudget.toLocaleString('fr-FR')} ${currency.symbol}`;
  };

  const handleBudgetChange = (text: string) => {
    // Remove all non-digit characters except decimals
    const numericValue = text.replace(/[^\d]/g, '');
    
    if (numericValue) {
      // Format with spaces for thousands
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      setBudget(formattedValue);
    } else {
      setBudget('');
    }
  };

  const handleTravelerCountChange = (newCount: number) => {
    const count = Math.max(1, newCount);
    setTravelerCount(count);
    
    // Adjust travelerNames array
    const currentNames = [...travelerNames];
    if (count > currentNames.length) {
      // Add empty strings for new travelers
      while (currentNames.length < count) {
        currentNames.push('');
      }
    } else if (count < currentNames.length) {
      // Remove excess names
      currentNames.splice(count);
    }
    setTravelerNames(currentNames);
  };

  const handleTravelerNameChange = (index: number, name: string) => {
    const updatedNames = [...travelerNames];
    updatedNames[index] = name;
    setTravelerNames(updatedNames);
  };

  const handleDateSelect = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      // First selection or reset
      setStartDate(day.dateString);
      setEndDate('');
    } else if (day.dateString > startDate) {
      // End date selection - complete the range
      setEndDate(day.dateString);
      // Auto-collapse after selecting both dates
      setTimeout(() => setExpandedSection(null), 300);
    } else {
      // New start date
      setStartDate(day.dateString);
      setEndDate('');
    }
  };

  const getMarkedDates = () => {
    const marked: any = {};
    
    if (startDate) {
      marked[startDate] = {
        startingDay: true,
        color: '#3B82F6',
        textColor: 'white'
      };
    }
    
    if (endDate) {
      marked[endDate] = {
        endingDay: true,
        color: '#3B82F6',
        textColor: 'white'
      };
      
      // Mark days in between
      const start = new Date(startDate);
      const end = new Date(endDate);
      const current = new Date(start);
      current.setDate(current.getDate() + 1);
      
      while (current < end) {
        const dateString = current.toISOString().split('T')[0];
        marked[dateString] = {
          color: '#DBEAFE',
          textColor: '#1E40AF'
        };
        current.setDate(current.getDate() + 1);
      }
    }
    
    return marked;
  };

  const handleCurrencyChange = () => {
    const currentIndex = CURRENCIES.findIndex(curr => curr.code === currency.code);
    const nextIndex = (currentIndex + 1) % CURRENCIES.length;
    setCurrency(CURRENCIES[nextIndex]);
  };
  
  // Check if all required fields are filled
  const isFormComplete = () => {
    return (
      tripName.trim() !== '' &&
      destination.trim() !== '' &&
      startDate !== '' &&
      endDate !== '' &&
      budget.trim() !== ''
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Background Image */}
      <Image 
        source={require('../../assets/bg-earth.jpg')}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      
      {/* Gradient Overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Animated.Text 
            style={styles.headerTitle}
            entering={FadeIn.duration(300)}
            layout={LinearTransition.duration(200)}
          >
            {tripName.trim() ? tripName : 'Nouveau voyage'}
          </Animated.Text>
        </View>

        {/* Form Sections */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.formContainer} 
          contentContainerStyle={styles.formContentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={true}
        >
          
          {/* Trip Name Section */}
          <ExpandableSection
            title="Nom du voyage"
            value={tripName || 'Nommer votre voyage'}
            isExpanded={expandedSection === 'name'}
            onToggle={() => toggleSection('name')}
            onLayout={(event) => {
              sectionRefs.current['name'] = { y: event.nativeEvent.layout.y };
            }}
          >
            <TripNameInput 
              value={tripName}
              onChangeText={handleTripNameChange}
              isExpanded={expandedSection === 'name'}
            />
          </ExpandableSection>
          
          {/* Location Section */}
          <ExpandableSection
            title="Où ?"
            value={destination || 'Rechercher une destination'}
            isExpanded={expandedSection === 'location'}
            onToggle={() => toggleSection('location')}
            onLayout={(event) => {
              sectionRefs.current['location'] = { y: event.nativeEvent.layout.y };
            }}
          >
            <GooglePlacesInput
              placeholder="Rechercher une destination"
              autoFocus={expandedSection === 'location'}
              onPlaceSelected={(data, details) => {
                console.log('Selected destination:', data.description);
                setDestination(data.description);
                setExpandedSection(null);
                setIsSearching(false);
                setSearchResults([]);
                setSearchText('');
              }}
              onError={(error) => {
                console.log('Google Places error:', error);
              }}
              onSearchResults={(results) => {
                setSearchResults(results);
              }}
              onSearchTextChange={(text) => {
                setSearchText(text);
                setIsSearching(text.length >= 2);
              }}
            />
            
            {/* Show search results when searching, otherwise show default suggestions */}
            {isSearching && searchResults.length > 0 ? (
              // Search results (max 4)
              searchResults.map((place) => (
                <SearchResultItem
                  key={place.place_id}
                  place={place}
                  onPress={(selectedPlace) => {
                    setDestination(selectedPlace.description);
                    setExpandedSection(null);
                    setIsSearching(false);
                    setSearchResults([]);
                    setSearchText('');
                  }}
                />
              ))
            ) : !isSearching ? (
              // Default suggestions when not searching
              destinationSuggestions.map((suggestion) => (
                <TouchableOpacity
                  key={suggestion.id}
                  style={styles.suggestionItem}
                  onPress={() => {
                    setDestination(suggestion.name);
                    setExpandedSection(null);
                  }}
                >
                  <View style={styles.suggestionIcon}>
                    <Ionicons name={suggestion.icon as any} size={24} color="#3B82F6" />
                  </View>
                  <View style={styles.suggestionInfo}>
                    <Text style={styles.suggestionName}>{suggestion.name}</Text>
                    <Text style={styles.suggestionDescription}>{suggestion.description}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : null}
          </ExpandableSection>

          {/* Dates Section */}
          <ExpandableSection
            title="Quand ?"
            value={formatDateRange()}
            isExpanded={expandedSection === 'dates'}
            onToggle={() => toggleSection('dates')}
            onLayout={(event) => {
              sectionRefs.current['dates'] = { y: event.nativeEvent.layout.y };
            }}
          >
            <View style={styles.dateOptions}>
              <TouchableOpacity style={[styles.dateOption, styles.dateOptionActive]}>
                <Text style={[styles.dateOptionText, styles.dateOptionTextActive]}>Dates</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateOption}>
                <Text style={styles.dateOptionText}>Mois</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateOption}>
                <Text style={styles.dateOptionText}>Flexible</Text>
              </TouchableOpacity>
            </View>

            <Calendar
              style={styles.calendar}
              onDayPress={handleDateSelect}
              markingType="period"
              markedDates={getMarkedDates()}
              theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                textSectionTitleColor: '#666',
                dayTextColor: '#333',
                todayTextColor: '#3B82F6',
                selectedDayTextColor: 'white',
                monthTextColor: '#333',
                arrowColor: '#3B82F6',
              }}
              minDate={new Date().toISOString().split('T')[0]}
            />

            <View style={styles.dateShortcuts}>
              <TouchableOpacity style={styles.shortcutButton}>
                <Text style={styles.shortcutText}>Dates exactes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shortcutButton}>
                <Text style={styles.shortcutText}>± 1 jour</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shortcutButton}>
                <Text style={styles.shortcutText}>± 2 jours</Text>
              </TouchableOpacity>
            </View>
          </ExpandableSection>

          {/* Guests Section */}
          <ExpandableSection
            title="Qui ?"
            value={formatGuestCount()}
            isExpanded={expandedSection === 'guests'}
            onToggle={() => toggleSection('guests')}
            onLayout={(event) => {
              sectionRefs.current['guests'] = { y: event.nativeEvent.layout.y };
            }}
          >
            {/* Traveler Counter */}
            <View style={styles.counterSection}>
              <Text style={styles.counterTitle}>Nombre de voyageurs</Text>
              <View style={styles.counterControls}>
                <TouchableOpacity
                  style={[styles.counterButton, travelerCount <= 1 && styles.counterButtonDisabled]}
                  onPress={() => handleTravelerCountChange(travelerCount - 1)}
                  disabled={travelerCount <= 1}
                >
                  <Ionicons name="remove" size={16} color={travelerCount <= 1 ? '#ccc' : '#666'} />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{travelerCount}</Text>
                <TouchableOpacity 
                  style={styles.counterButton} 
                  onPress={() => handleTravelerCountChange(travelerCount + 1)}
                >
                  <Ionicons name="add" size={16} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Traveler Names */}
            <Text style={styles.namesTitle}>Prénoms des voyageurs</Text>
            {travelerNames.map((name, index) => (
              <TravelerInput
                key={index}
                index={index}
                value={name}
                onChangeText={(text) => handleTravelerNameChange(index, text)}
                placeholder={`Prénom du voyageur ${index + 1}`}
                autoFocus={index === 0 && expandedSection === 'guests'}
              />
            ))}
          </ExpandableSection>

          {/* Budget Section */}
          <ExpandableSection
            title="Pour combien ?"
            value={formatBudget()}
            isExpanded={expandedSection === 'budget'}
            onToggle={() => toggleSection('budget')}
            onLayout={(event) => {
              sectionRefs.current['budget'] = { y: event.nativeEvent.layout.y };
            }}
          >
            {/* Budget Input with Currency */}
            <View style={styles.budgetInputSection}>
              <Text style={styles.budgetTitle}>Budget total</Text>
              <View style={styles.budgetInputContainer}>
                <TouchableOpacity style={styles.currencySelector} onPress={handleCurrencyChange}>
                  <Text style={styles.budgetCurrency}>{currency.symbol}</Text>
                  <Text style={styles.currencyCode}>{currency.code}</Text>
                </TouchableOpacity>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.budgetInput}
                    placeholder="2 500"
                    placeholderTextColor="#9CA3AF"
                    value={budget}
                    onChangeText={handleBudgetChange}
                    keyboardType="numeric"
                    autoFocus={expandedSection === 'budget'}
                  />
                  <Text style={styles.eurSuffix}>{currency.code}</Text>
                </View>
              </View>
            </View>
          </ExpandableSection>

          {/* Save Button - in flow, not sticky */}
          <Animated.View 
            style={styles.footer}
            entering={FadeIn.duration(300)}
            layout={LinearTransition}
          >
            <TouchableOpacity
              style={[
                styles.createButton,
                !isFormComplete() && styles.createButtonDisabled
              ]}
              onPress={isFormComplete() ? handleSave : undefined}
              activeOpacity={isFormComplete() ? 0.8 : 1}
              disabled={!isFormComplete()}
            >
              <Text style={[
                styles.createButtonText,
                !isFormComplete() && styles.createButtonTextDisabled
              ]}>
                Créer le voyage
              </Text>
            </TouchableOpacity>
          </Animated.View>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  formContentContainer: {
    paddingBottom: 150, // Espace pour le clavier et le bouton
  },
  section: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    padding: 20,
  },
  sectionHeaderExpanded: {
    // Removed the borderBottomWidth and borderBottomColor - no more divider!
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 16,
    color: '#666',
  },
  expandedContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 0,
  },
  
  // Location Section Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  suggestionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  suggestionDescription: {
    fontSize: 14,
    color: '#666',
  },
  
  // Optimized Section Styles (for trip name)
  simpleExpandedContent: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  
  // Airbnb-style Input
  airbnbInputWrapper: {
    position: 'relative',
    marginTop: -4,
    marginBottom: -8,
    paddingHorizontal: 0,
  },
  airbnbInput: {
    fontSize: 17,
    fontWeight: '400',
    color: '#222222',
    paddingVertical: 16,
    paddingHorizontal: 0,
    paddingRight: 30, // Espace pour le bouton clear
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    backgroundColor: 'transparent',
    width: '100%',
  },
  airbnbInputFocused: {
    borderBottomColor: '#222222',
    borderBottomWidth: 2,
  },
  airbnbInputFilled: {
    fontWeight: '500',
  },
  airbnbClearButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    marginTop: -11,
  },
  
  // Dates Section Styles
  dateOptions: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 3,
  },
  dateOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 7,
  },
  dateOptionActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateOptionText: {
    fontSize: 14,
    color: '#666',
  },
  dateOptionTextActive: {
    color: '#333',
    fontWeight: '600',
  },
  calendar: {
    marginBottom: 16,
  },
  dateShortcuts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shortcutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'transparent',
  },
  shortcutText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  
  // Guests Section Styles
  counterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  counterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  counterButtonDisabled: {
    opacity: 0.5,
  },
  counterValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  namesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  travelerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  travelerNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  travelerNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  travelerInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  
  // Budget Section Styles
  budgetInputSection: {
    marginBottom: 20,
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  budgetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#F1F5F9',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  budgetInput: {
    flex: 1,
    paddingVertical: 18,
    fontSize: 28,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'right',
    letterSpacing: -0.5,
  },
  budgetCurrency: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B82F6',
    letterSpacing: -0.2,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#EBF8FF',
    borderWidth: 1.5,
    borderColor: '#93C5FD',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  currencyCode: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eurSuffix: {
    fontSize: 28,
    fontWeight: '600',
    color: '#9CA3AF',
    marginLeft: 8,
    letterSpacing: -0.5,
  },
  

  
  // Footer
  footer: {
    paddingHorizontal: 0,
    paddingTop: 24,
    paddingBottom: 40,
  },
  
  // Create button styles
  createButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  createButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  createButtonTextDisabled: {
    color: '#FFFFFF',
  },
}); 