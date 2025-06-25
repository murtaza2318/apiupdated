/**
 * Example demonstrating the enum-based pet creation system
 * This file shows how the frontend maps user selections to backend enum values
 */

import { 
  PET_TYPES, 
  PET_SIZES, 
  PET_AGES, 
  PET_TYPE_LABELS, 
  PET_SIZE_LABELS, 
  PET_AGE_LABELS,
  convertCompatibilityToBoolean 
} from './constants';

// Example 1: Creating a Dog pet
export const createDogExample = () => {
  // User selects "Dog" from pet type selector
  const userPetTypeSelection = 'Dog';
  const petTypeValue = PET_TYPES.DOG; // Maps to 1

  // User selects "Medium (26-60 lbs)" from size selector
  const userSizeSelection = 'Medium (26-60 lbs)';
  const petSizeValue = PET_SIZES.MEDIUM; // Maps to 2

  // User selects "Adult (3-7 years)" from age selector
  const userAgeSelection = 'Adult (3-7 years)';
  const petAgeValue = PET_AGES.ADULT; // Maps to 3

  // User selects compatibility options
  const dogsCompatibility = convertCompatibilityToBoolean('Yes'); // { getAlong: true, isUnsure: false }
  const catsCompatibility = convertCompatibilityToBoolean('No');  // { getAlong: false, isUnsure: false }

  const payload = {
    name: "Max",
    type: petTypeValue,           // 1 (Dog)
    size: petSizeValue,           // 2 (Medium)
    age: petAgeValue,             // 3 (Adult)
    getAlongWithDogs: dogsCompatibility.getAlong,      // true
    getAlongWithCats: catsCompatibility.getAlong,      // false
    isUnsureWithDogs: dogsCompatibility.isUnsure,      // false
    isUnsureWithCats: catsCompatibility.isUnsure,      // false
    specialInstructions: "Very friendly dog",
    medicalConditions: "",
    userId: "user123"
  };

  console.log('Dog creation payload:', payload);
  return payload;
};

// Example 2: Creating a Cat pet
export const createCatExample = () => {
  // User selects "Cat" from pet type selector
  const userPetTypeSelection = 'Cat';
  const petTypeValue = PET_TYPES.CAT; // Maps to 2

  // User selects "Small (0-25 lbs)" from size selector
  const userSizeSelection = 'Small (0-25 lbs)';
  const petSizeValue = PET_SIZES.SMALL; // Maps to 1

  // User selects "Puppy/Kitten (0-1 year)" from age selector
  const userAgeSelection = 'Puppy/Kitten (0-1 year)';
  const petAgeValue = PET_AGES.PUPPY_KITTEN; // Maps to 1

  // User selects compatibility options
  const dogsCompatibility = convertCompatibilityToBoolean('Unsure'); // { getAlong: false, isUnsure: true }
  const catsCompatibility = convertCompatibilityToBoolean('Yes');    // { getAlong: true, isUnsure: false }

  const payload = {
    name: "Whiskers",
    type: petTypeValue,           // 2 (Cat)
    size: petSizeValue,           // 1 (Small)
    age: petAgeValue,             // 1 (Puppy/Kitten)
    getAlongWithDogs: dogsCompatibility.getAlong,      // false
    getAlongWithCats: catsCompatibility.getAlong,      // true
    isUnsureWithDogs: dogsCompatibility.isUnsure,      // true
    isUnsureWithCats: catsCompatibility.isUnsure,      // false
    specialInstructions: "Very shy kitten",
    medicalConditions: "",
    userId: "user123"
  };

  console.log('Cat creation payload:', payload);
  return payload;
};

// Example 3: Weight-based size calculation (for PetDetailsFormScreen)
export const calculateSizeFromWeight = (weightInLbs: number) => {
  if (weightInLbs <= 25) return PET_SIZES.SMALL;      // 1
  if (weightInLbs <= 60) return PET_SIZES.MEDIUM;     // 2
  if (weightInLbs <= 100) return PET_SIZES.LARGE;     // 3
  return PET_SIZES.EXTRA_LARGE;                       // 4
};

// Example 4: Age calculation from years and months (for PetDetailsFormScreen)
export const calculateAgeFromYearsMonths = (years: number, months: number) => {
  const totalMonths = years * 12 + months;
  if (totalMonths <= 12) return PET_AGES.PUPPY_KITTEN; // 1
  if (totalMonths <= 36) return PET_AGES.YOUNG;        // 2
  if (totalMonths <= 84) return PET_AGES.ADULT;        // 3
  return PET_AGES.SENIOR;                              // 4
};

// Example 5: Display all available options
export const displayAllOptions = () => {
  console.log('Available Pet Types:');
  Object.entries(PET_TYPE_LABELS).forEach(([key, label]) => {
    console.log(`  ${key}: ${label} (value: ${PET_TYPES[key as keyof typeof PET_TYPES]})`);
  });

  console.log('\nAvailable Pet Sizes:');
  Object.entries(PET_SIZE_LABELS).forEach(([key, label]) => {
    console.log(`  ${key}: ${label} (value: ${PET_SIZES[key as keyof typeof PET_SIZES]})`);
  });

  console.log('\nAvailable Pet Ages:');
  Object.entries(PET_AGE_LABELS).forEach(([key, label]) => {
    console.log(`  ${key}: ${label} (value: ${PET_AGES[key as keyof typeof PET_AGES]})`);
  });
};

// Example 6: Backend enum mapping (for reference)
export const backendEnumMapping = {
  PetType: {
    Dog: 1,
    Cat: 2,
    Bird: 3,
    Fish: 4,
    Other: 5
  },
  PetSize: {
    Small: 1,
    Medium: 2,
    Large: 3,
    ExtraLarge: 4
  },
  PetAge: {
    PuppyKitten: 1,
    Young: 2,
    Adult: 3,
    Senior: 4
  }
}; 