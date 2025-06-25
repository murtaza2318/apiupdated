export const API_URL = 'http://192.168.100.6:5260/api'

// Pet Type Enum Mapping (matches backend PetType enum)
export const PET_TYPES = {
  DOG: 1,
  CAT: 2,
  BIRD: 3,
  FISH: 4,
  OTHER: 5,
} as const;

export const PET_TYPE_LABELS = {
  [PET_TYPES.DOG]: 'Dog',
  [PET_TYPES.CAT]: 'Cat',
  [PET_TYPES.BIRD]: 'Bird',
  [PET_TYPES.FISH]: 'Fish',
  [PET_TYPES.OTHER]: 'Other',
} as const;

// Pet Size Enum Mapping (matches backend PetSize enum)
export const PET_SIZES = {
  SMALL: 1,      // 0-25 lbs
  MEDIUM: 2,     // 26-60 lbs
  LARGE: 3,      // 61-100 lbs
  EXTRA_LARGE: 4, // 101+ lbs
} as const;

export const PET_SIZE_LABELS = {
  [PET_SIZES.SMALL]: 'Small (0-25 lbs)',
  [PET_SIZES.MEDIUM]: 'Medium (26-60 lbs)',
  [PET_SIZES.LARGE]: 'Large (61-100 lbs)',
  [PET_SIZES.EXTRA_LARGE]: 'Extra Large (101+ lbs)',
} as const;

// Pet Age Enum Mapping (matches backend PetAge enum)
export const PET_AGES = {
  PUPPY_KITTEN: 1, // 0-1 year
  YOUNG: 2,        // 1-3 years
  ADULT: 3,        // 3-7 years
  SENIOR: 4,       // 7+ years
} as const;

export const PET_AGE_LABELS = {
  [PET_AGES.PUPPY_KITTEN]: 'Puppy/Kitten (0-1 year)',
  [PET_AGES.YOUNG]: 'Young (1-3 years)',
  [PET_AGES.ADULT]: 'Adult (3-7 years)',
  [PET_AGES.SENIOR]: 'Senior (7+ years)',
} as const;

// Helper functions to convert between display values and enum values
export const getPetTypeValue = (label: string): number => {
  const entry = Object.entries(PET_TYPE_LABELS).find(([_, value]) => value === label);
  return entry ? parseInt(entry[0]) : PET_TYPES.DOG;
};

export const getPetSizeValue = (label: string): number => {
  const entry = Object.entries(PET_SIZE_LABELS).find(([_, value]) => value === label);
  return entry ? parseInt(entry[0]) : PET_SIZES.MEDIUM;
};

export const getPetAgeValue = (label: string): number => {
  const entry = Object.entries(PET_AGE_LABELS).find(([_, value]) => value === label);
  return entry ? parseInt(entry[0]) : PET_AGES.ADULT;
};

// Convert compatibility strings to boolean values
export const convertCompatibilityToBoolean = (value: string): { getAlong: boolean; isUnsure: boolean } => {
  switch (value.toLowerCase()) {
    case 'yes':
      return { getAlong: true, isUnsure: false };
    case 'no':
      return { getAlong: false, isUnsure: false };
    case 'unsure':
      return { getAlong: false, isUnsure: true };
    default:
      return { getAlong: false, isUnsure: false };
  }
};