import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackNavigationType, RootStackNavigationType } from '../../utils/types/NavigationTypes';
import { COLORS } from '../../utils/theme';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    image: require('../../../assets/images/skip_screen_01.png'),
    title: 'Compassionate Pet Care in Your Neighborhood',
    subtitle: 'Welcome to the world’s largest network of 5-star pet sitting and dog walkers.',
  },
  {
    image: require('../../../assets/images/skip_screen_02.png'),
    title: 'Book sitters & walkers',
    subtitle: 'Pick the service you need and book your pet’s perfect match. Pay directly through our secured app.',
  },
  {
    image: require('../../../assets/images/skip_screen_03.png'),
    title: 'Keep Connected',
    subtitle: 'Chat with your sitter or walker and receive photo updates for any service you book. You’ll even get GPS maps for walks.',
  },
  {
    image: require('../../../assets/images/skip_screen_04.png'),
    title: 'Enjoy peace of mind',
    subtitle: 'All sitters undergo background checks before profile approval.',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSkip = () => {
    navigation.navigate('SelectService');
  };

  return (
    <Swiper
      loop={false}
      onIndexChanged={(index) => setCurrentIndex(index)}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
      paginationStyle={{ bottom: 60 }}
    >
      {slides.map((slide, index) => (
        <View key={index} style={styles.slide}>
          <Image source={slide.image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>

            {/* Swipe text */}
            {index === 0 && (
              <Text style={styles.swipeHint}>Swipe left to see more</Text>
            )}

            {/* Get Started button */}
            {index === slides.length - 1 ? (
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelectService')}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Skip button */}
          {index < slides.length - 1 && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: height * 0.35,
    resizeMode: 'cover',
    marginTop: 0,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: COLORS.TextPrimary,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.TextPrimary,
  },
  swipeHint: {
    marginTop: 290,
    fontSize: 16,
    color: '#888',
  },
  button: {
    marginTop: 280,
    backgroundColor: COLORS.ButtonPrimary,
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 25,
    borderColor: COLORS.BorderPrimary,
  },
  buttonText: {
    color: COLORS.TextPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: COLORS.Primary,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.BorderPrimary,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  skipButton: {
    position: 'absolute',
    bottom: 55,
    left: 30,
  },
  skipText: {
    fontSize: 16,
    color: '#999',
  },
});

export default OnboardingScreen;
