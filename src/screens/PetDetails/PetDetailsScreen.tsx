import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS, FONT_POPPINS } from '../../utils/theme';
import { CustomText } from '../../components/CustomText';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { AuthStackNavigationType } from '../../utils/types/NavigationTypes';
import {
  PET_SIZES,
  PET_SIZE_LABELS,
  PET_AGES,
  PET_AGE_LABELS,
  PET_TYPES,
  convertCompatibilityToBoolean,
} from '../../utils/constants';
import { useCreatePetMutation } from '../../redux/apis/pets.api';

interface PetDetailsForm {
  size: keyof typeof PET_SIZE_LABELS | '';
  age: keyof typeof PET_AGE_LABELS | '';
  friendlyWithDogs: 'Yes' | 'No' | 'Unsure' | '';
  friendlyWithCats: 'Yes' | 'No' | 'Unsure' | '';
}

type RouteParams = {
  initialData: {
    petType: string;
    dates: string;
    location: string;
  };
};

const PetDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const initialData = route.params?.initialData || {
    petType: 'Dog',
    dates: '',
    location: '',
  };

  const [formData, setFormData] = useState<PetDetailsForm>({
    size: '',
    age: '',
    friendlyWithDogs: '',
    friendlyWithCats: '',
  });

  const [error, setError] = useState('');
  const [createPet, { isLoading: loading }] = useCreatePetMutation();

  const handleSubmit = async () => {
    setError('');
    try {
      const dogsCompatibility = convertCompatibilityToBoolean(formData.friendlyWithDogs);
      const catsCompatibility = convertCompatibilityToBoolean(formData.friendlyWithCats);
      const petTypeValue = initialData.petType.toLowerCase() === 'dog' ? PET_TYPES.DOG : PET_TYPES.CAT;

      const getSizeValue = (key: keyof typeof PET_SIZE_LABELS): number => {
        return PET_SIZES[key] || PET_SIZES.MEDIUM;
      };

      const getAgeValue = (key: keyof typeof PET_AGE_LABELS): number => {
        return PET_AGES[key] || PET_AGES.ADULT;
      };

      const payload = {
        name: `Pet-${Date.now()}`,
        type: petTypeValue,
        size: getSizeValue(formData.size),
        age: getAgeValue(formData.age),
        getAlongWithDogs: dogsCompatibility.getAlong,
        getAlongWithCats: catsCompatibility.getAlong,
        isUnsureWithDogs: dogsCompatibility.isUnsure,
        isUnsureWithCats: catsCompatibility.isUnsure,
        specialInstructions: '',
        medicalConditions: '',
        userId: 'temp-user-id',
      };

      await createPet(payload).unwrap();

      navigation.navigate('SitterResultsScreen', {
        location: initialData.location,
        dates: initialData.dates,
      });
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to save pet details. Please try again.');
    }
  };

  const SelectionButton = ({
    selected,
    onPress,
    label,
    style = {},
  }: {
    selected: boolean;
    onPress: () => void;
    label: string;
    style?: object;
  }) => (
    <TouchableOpacity
      style={[styles.selectionButton, selected && styles.selectedButton, style]}
      onPress={onPress}
    >
      <CustomText textStyle={[styles.buttonText]}>{label}</CustomText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <CustomText textStyle={styles.title}>
            Tell us about your {initialData.petType.toLowerCase()}s
          </CustomText>

          {error ? <CustomText textStyle={styles.errorText}>{error}</CustomText> : null}

          {/* Pet Size */}
          <View style={styles.section}>
            <CustomText textStyle={styles.sectionTitle}>
              {initialData.petType} size (lbs)
            </CustomText>
            <View style={styles.optionsRow}>
              {Object.entries(PET_SIZE_LABELS).map(([key, label]) => (
                <SelectionButton
                  key={key}
                  selected={formData.size === key}
                  onPress={() => setFormData((prev) => ({ ...prev, size: key as PetDetailsForm['size'] }))}
                  label={label}
                  style={styles.sizeButton}
                />
              ))}
            </View>
          </View>

          {/* Pet Age */}
          <View style={styles.section}>
            <CustomText textStyle={styles.sectionTitle}>
              How old are your {initialData.petType.toLowerCase()}s?
            </CustomText>
            <View style={styles.optionsRow}>
              {Object.entries(PET_AGE_LABELS).map(([key, label]) => (
                <SelectionButton
                  key={key}
                  selected={formData.age === key}
                  onPress={() => setFormData((prev) => ({ ...prev, age: key as PetDetailsForm['age'] }))}
                  label={label}
                  style={styles.ageButton}
                />
              ))}
            </View>
          </View>

          {/* Compatibility Dogs */}
          <View style={styles.section}>
            <CustomText textStyle={styles.sectionTitle}>
              Does your {initialData.petType.toLowerCase()} get along with other dogs?
            </CustomText>
            <View style={styles.optionsRow}>
              {['Yes', 'No', 'Unsure'].map((option) => (
                <SelectionButton
                  key={option}
                  selected={formData.friendlyWithDogs === option}
                  onPress={() => setFormData((prev) => ({ ...prev, friendlyWithDogs: option as any }))}
                  label={option}
                />
              ))}
            </View>
          </View>

          {/* Compatibility Cats */}
          <View style={styles.section}>
            <CustomText textStyle={styles.sectionTitle}>
              Does your {initialData.petType.toLowerCase()} get along with cats?
            </CustomText>
            <View style={styles.optionsRow}>
              {['Yes', 'No', 'Unsure'].map((option) => (
                <SelectionButton
                  key={option}
                  selected={formData.friendlyWithCats === option}
                  onPress={() => setFormData((prev) => ({ ...prev, friendlyWithCats: option as any }))}
                  label={option}
                />
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.searchButton, loading && styles.searchButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <CustomText textStyle={styles.searchButtonText}>Search Now</CustomText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { flex: 1 },
  content: { padding: 20 },
  title: {
    fontSize: RFValue(24),
    fontFamily: FONT_POPPINS.semiBoldFont,
    color: COLORS.TextPrimary,
    marginBottom: 30,
  },
  errorText: {
    color: '#FF0000',
    fontSize: RFValue(14),
    fontFamily: FONT_POPPINS.regularFont,
    marginBottom: 15,
  },
  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: RFValue(16),
    fontFamily: FONT_POPPINS.mediumFont,
    color: COLORS.TextPrimary,
    marginBottom: 15,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  selectionButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
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
  sizeButton: { minWidth: 90 },
  ageButton: { minWidth: 140 },
  searchButton: {
    backgroundColor: '#8FA77F',
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  searchButtonDisabled: {
    opacity: 0.6,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: RFValue(16),
    fontFamily: FONT_POPPINS.mediumFont,
  },
});

export default PetDetailsScreen;
