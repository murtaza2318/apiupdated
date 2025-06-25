import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useBoardingForm } from '../hooks/useBoardingForm';
import { PET_TYPE_LABELS } from '../../../utils/constants';

const PetTypeSelector = () => {
  const { petType, setPetType } = useBoardingForm();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pet type(s)</Text>
      <View style={styles.options}>
        {Object.values(PET_TYPE_LABELS).slice(0, 2).map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.option, petType === type && styles.selected]}
            onPress={() => setPetType(type as 'Dog' | 'Cat')}
          >
            <Text style={[styles.optionText, petType === type && styles.selectedText]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  options: { flexDirection: 'row', gap: 10 },
  option: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
  },
  selected: {
    backgroundColor: '#f0f9f0',
    borderColor: '#4CAF50',
  },
  optionText: { fontSize: 16, color: '#777' },
  selectedText: { color: '#000' },
});

export default PetTypeSelector;
