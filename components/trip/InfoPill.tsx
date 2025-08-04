import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InfoPillProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  count: number;
  onPress?: () => void;
}

export const InfoPill: React.FC<InfoPillProps> = ({ 
  icon, 
  label, 
  count, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="hsl(24 9.8% 10%)" />
        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'hsl(0 0% 100%)', // card background
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'hsl(214.3 31.8% 91.4%)', // border
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'hsl(24 9.8% 10%)', // primary
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'hsl(210 40% 98%)', // primary-foreground
    fontSize: 12,
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'hsl(24 9.8% 10%)', // foreground
    textAlign: 'center',
  },
}); 