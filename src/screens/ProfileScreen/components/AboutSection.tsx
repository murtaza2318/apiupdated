import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutSection = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>About</Text>
    <Text style={styles.text}>
      With all of Velvet's new changes and updates in mind, they have informed all sitters that they will be raising the service fee...
    </Text>
    <Text style={styles.readMore}>Read all</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  heading: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  text: { color: '#555' },
  readMore: { color: 'green', marginTop: 4 },
});

export default AboutSection; 