import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { InfoPill } from '../components/trip/InfoPill';
import { FlightInfoCard } from '../components/trip/FlightInfoCard';
import { TripCard } from '../components/trip/TripCard';
import { mockTrips } from '../lib/mock-data';

export default function DesignSystemScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handlePrimaryPress = () => {
    console.log('Primary button pressed');
  };

  const handleSecondaryPress = () => {
    console.log('Secondary button pressed');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Design System</Text>
        <Text style={styles.subtitle}>Component Library & Testing</Text>
      </View>

      {/* Button Components */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Buttons</Text>
        <View style={styles.buttonRow}>
          <Button 
            title="Primary Button" 
            onPress={handlePrimaryPress} 
            variant="primary"
          />
          <View style={{ width: 12 }} />
          <Button 
            title="Secondary Button" 
            onPress={handleSecondaryPress} 
            variant="secondary"
          />
        </View>
        <View style={{ height: 8 }} />
        <Button 
          title="Disabled Button" 
          onPress={() => {}} 
          variant="primary"
          disabled={true}
        />
      </View>

      {/* Input Components */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Form Inputs</Text>
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Input with Error"
          placeholder="This field has an error"
          value=""
          onChangeText={() => {}}
          error="This field is required"
        />
      </View>

      {/* InfoPill Components */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Info Pills</Text>
        <View style={styles.pillRow}>
          <InfoPill
            icon="airplane"
            label="Transport"
            count={2}
            onPress={() => console.log('Transport pressed')}
          />
          <InfoPill
            icon="bed"
            label="Hotel"
            count={1}
            onPress={() => console.log('Hotel pressed')}
          />
          <InfoPill
            icon="car"
            label="Rental"
            count={1}
            onPress={() => console.log('Rental pressed')}
          />
        </View>
      </View>

      {/* FlightInfoCard Component */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flight Info Card</Text>
        <FlightInfoCard flight={mockTrips[0].flights[0]} />
      </View>

      {/* TripCard Component */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Card</Text>
        <TripCard trip={mockTrips[0]} />
      </View>

      {/* Color Palette */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Palette</Text>
        <View style={styles.colorGrid}>
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: 'hsl(24 9.8% 10%)' }]} />
            <Text style={styles.colorLabel}>Primary</Text>
          </View>
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: 'hsl(210 40% 98%)' }]} />
            <Text style={styles.colorLabel}>Secondary</Text>
          </View>
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: 'hsl(0 0% 100%)', borderWidth: 1, borderColor: 'hsl(214.3 31.8% 91.4%)' }]} />
            <Text style={styles.colorLabel}>Background</Text>
          </View>
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: 'hsl(214.3 31.8% 91.4%)' }]} />
            <Text style={styles.colorLabel}>Border</Text>
          </View>
        </View>
      </View>

      {/* Typography */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Typography</Text>
        <Text style={[styles.typographyExample, { fontSize: 24, fontWeight: 'bold' }]}>
          Heading 1 - Bold 24px
        </Text>
        <Text style={[styles.typographyExample, { fontSize: 20, fontWeight: '600' }]}>
          Heading 2 - Semibold 20px
        </Text>
        <Text style={[styles.typographyExample, { fontSize: 16, fontWeight: '500' }]}>
          Body - Medium 16px
        </Text>
        <Text style={[styles.typographyExample, { fontSize: 14, color: 'hsl(240 3.8% 46.1%)' }]}>
          Caption - Regular 14px (Muted)
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(0 0% 100%)',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'hsl(24 9.8% 10%)',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'hsl(240 3.8% 46.1%)',
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'hsl(24 9.8% 10%)',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  pillRow: {
    flexDirection: 'row',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorItem: {
    alignItems: 'center',
    marginBottom: 12,
    width: '22%',
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 4,
  },
  colorLabel: {
    fontSize: 12,
    color: 'hsl(240 3.8% 46.1%)',
    textAlign: 'center',
  },
  typographyExample: {
    color: 'hsl(24 9.8% 10%)',
    marginBottom: 8,
  },
}); 