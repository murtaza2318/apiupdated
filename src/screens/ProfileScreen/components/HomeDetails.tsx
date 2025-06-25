import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeDetails = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>Home</Text>
    {[
      'Lives in a house',
      'Has a fenced yard',
      'Non-smoking household',
      'Has no pets',
      'Children 0–5 years old',
      'Dogs over 1 year old',
    ].map((item, index) => (
      <Text key={index} style={styles.item}>{item}</Text>
    ))}
    <Text style={styles.viewAll}>View all</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  heading: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  item: { marginBottom: 4, color: '#555' },
  viewAll: { color: 'green', marginTop: 4 },
});

export default HomeDetails; 