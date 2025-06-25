import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const LocationMap = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>Location</Text>
    <Text style={styles.text}>Katy,TX</Text>
    <Image
      source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=Katy,TX&zoom=10&size=600x300&maptype=roadmap&key=YOUR_API_KEY' }}
      style={styles.map}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  heading: { fontWeight: 'bold', fontSize: 18, marginBottom: 2, color: '#222', alignSelf: 'flex-start' },
  text: { marginBottom: 8, color: '#555', fontSize: 15, alignSelf: 'flex-start' },
  map: { width: '100%', height: 120, borderRadius: 16, marginBottom: 16 },
});

export default LocationMap; 