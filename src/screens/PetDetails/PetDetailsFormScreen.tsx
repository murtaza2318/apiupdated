import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS, FONT_POPPINS } from '../../utils/theme';
import { CustomText } from '../../components/CustomText';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { AuthStackNavigationType } from '../../utils/types/NavigationTypes';
import { 
  PET_TYPES, 
  PET_SIZES, 
  PET_AGES,
  convertCompatibilityToBoolean 
} from '../../utils/constants';
import { useCreatePetMutation } from '../../redux/apis/pets.api';

interface PetDetailsForm {
  name: string;
  breed: string;
  weight: string;
  ageYears: string;
  ageMonths: string;
  sex: 'male' | 'female' | '';
  additionalDetails: {
    microChipped: 'yes' | 'no' | '';
    spayedNeutered: 'yes' | 'no' | '';
    friendlyWithChildren: 'yes' | 'no' | 'unsure' | '';
    friendlyWithDogs: 'yes' | 'no' | 'unsure' | '';
    friendlyWithCats: 'yes' | 'no' | 'unsure' | '';
  };
}

type RouteParams = {
  initialData: {
    petType: string;
    dates: string;
    location: string;
  };
};

const PetDetailsFormScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const initialData = route.params?.initialData || { petType: '', dates: '', location: '' };
  const [error, setError] = useState('');

  const [createPet, { isLoading: loading }] = useCreatePetMutation();

  const [formData, setFormData] = useState<PetDetailsForm>({
    name: '',
    breed: '',
    weight: '',
    ageYears: '',
    ageMonths: '',
    sex: '',
    additionalDetails: {
      microChipped: '',
      spayedNeutered: '',
      friendlyWithChildren: '',
      friendlyWithDogs: '',
      friendlyWithCats: '',
    },
  });

  // Helper function to determine pet size based on weight
  const getPetSizeFromWeight = (weight: string): number => {
    const weightNum = parseInt(weight) || 0;
    if (weightNum <= 25) return PET_SIZES.SMALL;
    if (weightNum <= 60) return PET_SIZES.MEDIUM;
    if (weightNum <= 100) return PET_SIZES.LARGE;
    return PET_SIZES.EXTRA_LARGE;
  };

  // Helper function to determine pet age based on years and months
  const getPetAgeFromYearsMonths = (years: string, months: string): number => {
    const totalMonths = (parseInt(years) || 0) * 12 + (parseInt(months) || 0);
    if (totalMonths <= 12) return PET_AGES.PUPPY_KITTEN;
    if (totalMonths <= 36) return PET_AGES.YOUNG;
    if (totalMonths <= 84) return PET_AGES.ADULT;
    return PET_AGES.SENIOR;
  };

  const handleSubmit = async () => {
    setError('');
    try {
      // Convert form data to API-compatible format
      const dogsCompatibility = convertCompatibilityToBoolean(formData.additionalDetails.friendlyWithDogs);
      const catsCompatibility = convertCompatibilityToBoolean(formData.additionalDetails.friendlyWithCats);
      
      // Get pet type from initial data
      const petTypeValue = initialData.petType.toLowerCase() === 'dog' ? PET_TYPES.DOG : PET_TYPES.CAT;
      
      const payload = {
        name: formData.name || `Pet-${Date.now()}`,
        type: petTypeValue,
        size: getPetSizeFromWeight(formData.weight),
        age: getPetAgeFromYearsMonths(formData.ageYears, formData.ageMonths),
        getAlongWithDogs: dogsCompatibility.getAlong,
        getAlongWithCats: catsCompatibility.getAlong,
        isUnsureWithDogs: dogsCompatibility.isUnsure,
        isUnsureWithCats: catsCompatibility.isUnsure,
        specialInstructions: `Breed: ${formData.breed}, Sex: ${formData.sex}, Microchipped: ${formData.additionalDetails.microChipped}, Spayed/Neutered: ${formData.additionalDetails.spayedNeutered}`,
        medicalConditions: '',
        userId: 'temp-user-id', // This should come from user context/authentication
      };

      console.log('Submitting payload:', payload);
      await createPet(payload).unwrap();
      navigation.navigate('PetDetails', {
        initialData: {
          petType: formData.petType || 'Dog',
          dates: formData.dates || '',
          location: formData.location || ''
        }
      });
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to save pet details. Please try again.');
      console.error('API Error:', err);
    }
  };

  const SelectionButton = ({ 
    selected, 
    onPress, 
    label,
    style = {}
  }: { 
    selected: boolean; 
    onPress: () => void; 
    label: string;
    style?: object;
  }) => (
    <TouchableOpacity
      style={[
        styles.selectionButton,
        selected && styles.selectedButton,
        style
      ]}
      onPress={onPress}
    >
      <CustomText textStyle={[styles.buttonText, selected && styles.selectedButtonText]}>
        {label}
      </CustomText>
    </TouchableOpacity>
  );

  const InputField = ({
    label,
    value,
    onChangeText,
    placeholder = '',
    keyboardType = 'default',
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: 'default' | 'numeric';
  }) => (
    <View style={styles.inputGroup}>
      <CustomText textStyle={styles.label}>{label}</CustomText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <CustomText textStyle={styles.title}>Tell us about your dogs</CustomText>
          {error ? <CustomText textStyle={styles.errorText}>{error}</CustomText> : null}

          {/* Basic Information */}
          <View style={styles.section}>
            <CustomText textStyle={styles.sectionTitle}>Basic Information</CustomText>
            
            <InputField
              label="Pet Name"
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              placeholder="Enter pet's name"
            />

            <InputField
              label="Breed"
              value={formData.breed}
              onChangeText={(text) => setFormData(prev => ({ ...prev, breed: text }))}
              placeholder="Enter breed"
            />

            <InputField
              label="Weight (lbs)"
              value={formData.weight}
              onChangeText={(text) => setFormData(prev => ({ ...prev, weight: text }))}
              placeholder="Enter weight"
              keyboardType="numeric"
            />

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <CustomText textStyle={styles.label}>Years</CustomText>
                <TextInput
                  style={styles.input}
                  value={formData.ageYears}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, ageYears: text }))}
                  keyboardType="numeric"
                  placeholder="Years"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <CustomText textStyle={styles.label}>Months</CustomText>
                <TextInput
                  style={styles.input}
                  value={formData.ageMonths}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, ageMonths: text }))}
                  keyboardType="numeric"
                  placeholder="Months"
                />
              </View>
            </View>
          </View>

          {/* Sex Selection */}
          <View style={styles.section}>
            <CustomText textStyle={styles.sectionTitle}>Sex</CustomText>
            <View style={styles.optionsRow}>
              <SelectionButton
                selected={formData.sex === 'male'}
                onPress={() => setFormData(prev => ({ ...prev, sex: 'male' }))}
                label="Male"
              />
              <SelectionButton
                selected={formData.sex === 'female'}
                onPress={() => setFormData(prev => ({ ...prev, sex: 'female' }))}
                label="Female"
              />
            </View>
          </View>

          {/* Additional Details */}
          <View style={styles.section}>
            <CustomText textStyle={styles.sectionTitle}>Additional Details</CustomText>
            
            {/* Microchipped */}
            <View style={styles.questionGroup}>
              <CustomText textStyle={styles.questionText}>Is your pet microchipped?</CustomText>
              <View style={styles.optionsRow}>
                <SelectionButton
                  selected={formData.additionalDetails.microChipped === 'yes'}
                  onPress={() => setFormData(prev => ({
                    ...prev,
                    additionalDetails: { ...prev.additionalDetails, microChipped: 'yes' }
                  }))}
                  label="Yes"
                />
                <SelectionButton
                  selected={formData.additionalDetails.microChipped === 'no'}
                  onPress={() => setFormData(prev => ({
                    ...prev,
                    additionalDetails: { ...prev.additionalDetails, microChipped: 'no' }
                  }))}
                  label="No"
                />
              </View>
            </View>

            {/* Spayed/Neutered */}
            <View style={styles.questionGroup}>
              <CustomText textStyle={styles.questionText}>Is your pet spayed/neutered?</CustomText>
              <View style={styles.optionsRow}>
                <SelectionButton
                  selected={formData.additionalDetails.spayedNeutered === 'yes'}
                  onPress={() => setFormData(prev => ({
                    ...prev,
                    additionalDetails: { ...prev.additionalDetails, spayedNeutered: 'yes' }
                  }))}
                  label="Yes"
                />
                <SelectionButton
                  selected={formData.additionalDetails.spayedNeutered === 'no'}
                  onPress={() => setFormData(prev => ({
                    ...prev,
                    additionalDetails: { ...prev.additionalDetails, spayedNeutered: 'no' }
                  }))}
                  label="No"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Search Now Button */}
        <TouchableOpacity
          style={[styles.searchButton, loading && styles.searchButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <CustomText textStyle={styles.searchButtonText}>
            Continue
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: RFValue(24),
    fontFamily: FONT_POPPINS.semiBoldFont,
    color: COLORS.TextPrimary,
    marginBottom: 30,
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 15,
    fontSize: RFValue(14),
    fontFamily: FONT_POPPINS.regularFont,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontFamily: FONT_POPPINS.mediumFont,
    color: COLORS.TextPrimary,
    marginBottom: 15,
  },
  questionText: {
    fontSize: RFValue(14),
    fontFamily: FONT_POPPINS.regularFont,
    color: COLORS.TextPrimary,
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  questionGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: RFValue(14),
    fontFamily: FONT_POPPINS.regularFont,
    color: COLORS.TextPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: RFValue(14),
    fontFamily: FONT_POPPINS.regularFont,
    color: COLORS.TextPrimary,
    backgroundColor: '#FFFFFF',
  },
  selectionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#E6E9E3',
    borderColor: '#E6E9E3',
  },
  buttonText: {
    fontSize: RFValue(14),
    fontFamily: FONT_POPPINS.regularFont,
    color: COLORS.TextPrimary,
    textAlign: 'center',
  },
  selectedButtonText: {
    color: COLORS.TextPrimary,
  },
  searchButton: {
    backgroundColor: '#8FA77F',
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  searchButtonDisabled: {
    opacity: 0.7,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: RFValue(16),
    fontFamily: FONT_POPPINS.mediumFont,
  },
});

export default PetDetailsFormScreen; 