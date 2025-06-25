import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const skills = [
  'Oral medication administration',
  'Injected medication administration',
  'Senior dog experience',
  'Special needs dog experience',
  'Puppy care experience',
  'First aid certified',
  'Dog training experience',
];

const SkillsSection = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>Skills</Text>
    {skills.map((skill, index) => (
      <Text key={index} style={styles.item}>✔ {skill}</Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  heading: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  item: { color: '#333', marginBottom: 4 },
});

export default SkillsSection; 