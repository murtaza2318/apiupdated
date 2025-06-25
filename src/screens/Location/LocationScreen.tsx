import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { COLORS, SHADOW } from '../../utils/theme';
import { AuthStackNavigationType } from '../../utils/types/NavigationTypes';
import CustomTextInput from '../../components/CustomTextInput';
import { useLocationForm, LocationFormValues } from './hooks/useLocationForm';

const { width, height } = Dimensions.get('window');

const LocationScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useLocationForm();
  const locationValue = watch('location');

  const onSubmit = (data: LocationFormValues) => {
    navigation.navigate('PetDetails', {
      initialData: {
        petType: '',
        dates: '',
        location: data.location
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Vector Background */}
      <Image
        source={require('../../../assets/images/Vector.png')}
        style={styles.vectorBackground}
      />

      {/* Cancel Button */}
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Globe Illustration */}
          <Image
            source={require('../../../assets/images/globe_illustration.png')}
            style={styles.globeIllustration}
          />

          {/* Main Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.questionText}>Where are you looking for pet care?</Text>

            <CustomTextInput
              value={locationValue}
              onChangeText={text => setValue('location', text)}
              placeholder="Location"
              inputContainerStyle={styles.customInputContainer}
              textStyle={styles.customInputText}
              error={errors.location?.message}
              title="Location"
              important
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.StaticWhite,
  },
  vectorBackground: {
    position: 'absolute',
    top: height * 0.18,
    left: 0,
    width: width,
    height: height * 0.35,
    resizeMode: 'contain',
    zIndex: 0,
  },
  cancelButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    zIndex: 2,
  },
  cancelButtonText: {
    fontSize: width * 0.045,
    color: COLORS.StaticWhite,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: height * 0.12,
  },
  globeIllustration: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: 'contain',
    marginBottom: height * 0.0,
    zIndex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.03,
    color: COLORS.TextPrimary,
  },
  customInputContainer: {
    width: '100%',
    borderRadius: 30,
    backgroundColor: COLORS.ButtonPrimary,
    borderWidth: 1,
    borderColor: COLORS.BorderPrimary,
    paddingHorizontal: 20,
    paddingVertical: 18,
    ...SHADOW.light,
  },
  
  customInputText: {
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  
  buttonContainer: {
    padding: 20,
    zIndex: 2,
    position: 'absolute',
    bottom: 15,
    width: '100%',
    backgroundColor: COLORS.StaticWhite,
  },
  continueButton: {
    backgroundColor: COLORS.ButtonPrimary,
    paddingVertical: 15,
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: COLORS.TextPrimary,
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});

export default LocationScreen;
