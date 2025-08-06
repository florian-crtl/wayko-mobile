import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackNavigationProp } from 'types/navigation';
import { Button } from 'components/common/Button';

export default function ProfileScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnecter', 
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            navigation.navigate('Welcome');
          }
        },
      ]
    );
  };

  const handleViewDesignSystem = () => {
    console.log('Design system pressed - not implemented yet');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>User settings and preferences</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>

        <View style={styles.actions}>
          <Button 
            title="View Design System" 
            onPress={handleViewDesignSystem} 
            variant="secondary"
          />
          
          <View style={{ height: 16 }} />
          
          <Button 
            title="Log Out" 
            onPress={handleLogout} 
            variant="primary"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(0 0% 100%)',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'hsl(240 3.8% 46.1%)',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'hsl(24 9.8% 10%)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: 'hsl(210 40% 98%)',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: 'hsl(24 9.8% 10%)',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'hsl(240 3.8% 46.1%)',
  },
  actions: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
  },
}); 