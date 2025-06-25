import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ContactButton = ({ style }) => (
  <View style={[styles.container, style]}>
    <TouchableOpacity style={styles.button} onPress={() => {}}>
      <Text style={styles.buttonText}>Contact this sitter</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#73865C',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactButton; 