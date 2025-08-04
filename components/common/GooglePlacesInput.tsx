import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_KEYS } from 'constants/api';

interface PlaceData {
  description: string;
  place_id: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}

interface GooglePlacesInputProps {
  placeholder?: string;
  onPlaceSelected: (data: PlaceData, details: any) => void;
  onError?: (error: Error) => void;
  showSearchResults?: boolean;
  onSearchResults?: (results: PlaceData[]) => void;
  onSearchTextChange?: (text: string) => void;
}

export const GooglePlacesInput: React.FC<GooglePlacesInputProps> = ({
  placeholder = 'Rechercher une destination',
  onPlaceSelected,
  onError,
  showSearchResults = false,
  onSearchResults,
  onSearchTextChange,
}) => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchPlaces = async (query: string) => {
    if (query.length < 2) {
      onSearchResults?.([]);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${API_KEYS.GOOGLE_PLACES}&language=fr&types=(cities)`
      );
      
      const data = await response.json();
      
      if (data.status === 'OK') {
        // Limit to 4 results
        const results = data.predictions.slice(0, 4).map((prediction: any) => ({
          description: prediction.description,
          place_id: prediction.place_id,
          structured_formatting: prediction.structured_formatting,
        }));
        
        onSearchResults?.(results);
      } else {
        console.log('Google Places API error:', data.status);
        onError?.(new Error(`API Error: ${data.status}`));
        onSearchResults?.([]);
      }
    } catch (error) {
      console.error('Google Places API request failed:', error);
      onError?.(error as Error);
      onSearchResults?.([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextChange = (text: string) => {
    setSearchText(text);
    onSearchTextChange?.(text);
    
    // Debounce API calls
    const timeoutId = setTimeout(() => {
      searchPlaces(text);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handlePlaceSelect = (place: PlaceData) => {
    setSearchText(place.description);
    onSearchResults?.([]);
    onPlaceSelected(place, null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.searchIcon}>
          <Ionicons name="search" size={20} color="#666" />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={handleTextChange}
          autoCapitalize="words"
          autoCorrect={false}
        />
        {isLoading && (
          <View style={styles.loadingIndicator}>
            <Ionicons name="refresh" size={20} color="#666" />
          </View>
        )}
        {searchText.length > 0 && !isLoading && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSearchText('');
              onSearchTextChange?.('');
              onSearchResults?.([]);
            }}
          >
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// SearchResultItem component for use in parent
export const SearchResultItem: React.FC<{
  place: PlaceData;
  onPress: (place: PlaceData) => void;
}> = ({ place, onPress }) => {
  // Get icon based on place type
  const getPlaceIcon = (description: string) => {
    const lower = description.toLowerCase();
    if (lower.includes('france')) return { icon: 'storefront', color: '#3B82F6', bg: '#F0F9FF' };
    if (lower.includes('spain') || lower.includes('espagne')) return { icon: 'golf', color: '#10B981', bg: '#D1FAE5' };
    if (lower.includes('italy') || lower.includes('italie')) return { icon: 'library', color: '#F59E0B', bg: '#FEF3C7' };
    if (lower.includes('greece') || lower.includes('grèce')) return { icon: 'library', color: '#F59E0B', bg: '#FEF3C7' };
    if (lower.includes('united kingdom') || lower.includes('uk')) return { icon: 'business', color: '#8B5CF6', bg: '#F3E8FF' };
    if (lower.includes('germany') || lower.includes('allemagne')) return { icon: 'business', color: '#EF4444', bg: '#FEE2E2' };
    return { icon: 'location', color: '#6B7280', bg: '#F3F4F6' };
  };

  const iconInfo = getPlaceIcon(place.description);

  return (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => onPress(place)}
    >
      <View style={[styles.suggestionIcon, { backgroundColor: iconInfo.bg }]}>
        <Ionicons name={iconInfo.icon as any} size={24} color={iconInfo.color} />
      </View>
      <View style={styles.suggestionInfo}>
        <Text style={styles.suggestionName}>
          {place.structured_formatting?.main_text || place.description}
        </Text>
        <Text style={styles.suggestionDescription}>
          {place.structured_formatting?.secondary_text || 'Destination'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 24,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  loadingIndicator: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    height: 50,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flex: 1,
  },
  // Styles for SearchResultItem component
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
}); 