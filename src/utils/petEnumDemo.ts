/**
 * Demonstration of enum-based pet creation system
 */

import { 
  PET_TYPES, 
  PET_SIZES, 
  PET_AGES, 
  convertCompatibilityToBoolean 
} from './constants';

// Example payload for a dog
export const dogPayloadExample = {
  name: "Max",
  type: PET_TYPES.DOG,           // 1
  size: PET_SIZES.MEDIUM,        // 2
  age: PET_AGES.ADULT,           // 3
  getAlongWithDogs: true,
  getAlongWithCats: false,
  isUnsureWithDogs: false,
  isUnsureWithCats: false,
  specialInstructions: "Very friendly dog",
  medicalConditions: "",
  userId: "user123"
};

// Example payload for a cat
export const catPayloadExample = {
  name: "Whiskers",
  type: PET_TYPES.CAT,           // 2
  size: PET_SIZES.SMALL,         // 1
  age: PET_AGES.PUPPY_KITTEN,    // 1
  getAlongWithDogs: false,
  getAlongWithCats: true,
  isUnsureWithDogs: true,
  isUnsureWithCats: false,
  specialInstructions: "Very shy kitten",
  medicalConditions: "",
  userId: "user123"
}; 