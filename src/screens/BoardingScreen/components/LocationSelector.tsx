import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useBoardingForm } from '../hooks/useBoardingForm';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../utils/theme';

const LocationSelector = () => {
  const { location, setLocation } = useBoardingForm();
  const navigation = useNavigation();

  const handleLocationPress = () => {
    // For now, let's just set a dummy location for testing
    setLocation('New York, NY');
  };

  return (
    <TouchableOpacity style={styles.row} onPress={handleLocationPress}>
      <Text style={styles.label}>Your Location</Text>
      <Text style={[styles.value, location && styles.selectedValue]}>
        {location || 'Select your location'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TextPrimary,
  },
  value: {
    fontSize: 14,
    color: COLORS.NeutralGrey60,
  },
  selectedValue: {
    color: COLORS.TextPrimary,
  },
});

export default LocationSelector;
