import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackNavigationType } from '../../../utils/types/NavigationTypes';

export const useMoreScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();
  const handleSignIn = () => {
    console.log('Navigate to Sign In');
    // Add navigation logic here
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleBecomeSitter = () => {
    console.log('Navigate to Become a Sitter');
    // Add navigation logic here
  };

  const handleHelpCenter = () => {
    console.log('Navigate to Help Center');
    // Add navigation logic here
  };

  const handleContactSitter = () => {
    setIsLoading(true);
    console.log('Contact this sitter');
    // Add contact sitter logic here
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handlePetDetails = () => {
    navigation.navigate('PetDetails');
  };

  const handleBackPress = () => {
    navigation.goBack()
  };

  const handleNextPress = () => {
    console.log('Next button pressed');
    // Add navigation next logic here
  };

  return {
    isLoading,
    handleSignIn,
    handleSettings,
    handleBecomeSitter,
    handleHelpCenter,
    handleContactSitter,
    handlePetDetails,
    handleBackPress,
    handleNextPress,
  };
};