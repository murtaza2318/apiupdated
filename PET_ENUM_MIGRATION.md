# Pet Creation Enum Migration

This document describes the migration from string-based pet creation to enum-based numeric values for the `/api/pets` endpoint.

## Overview

The backend API now expects enum-based numeric values for the fields `type`, `size`, and `age` instead of strings. The compatibility fields (`getAlongWithDogs`, `getAlongWithCats`, `isUnsureWithDogs`, `isUnsureWithCats`) are now boolean values.

## Backend Enum Definitions

### PetType Enum
```csharp
public enum PetType
{
    Dog = 1,
    Cat = 2,
    Bird = 3,
    Fish = 4,
    Other = 5
}
```

### PetSize Enum
```csharp
public enum PetSize
{
    Small = 1,      // 0-25 lbs
    Medium = 2,     // 26-60 lbs
    Large = 3,      // 61-100 lbs
    ExtraLarge = 4  // 101+ lbs
}
```

### PetAge Enum
```csharp
public enum PetAge
{
    PuppyKitten = 1, // 0-1 year
    Young = 2,       // 1-3 years
    Adult = 3,       // 3-7 years
    Senior = 4       // 7+ years
}
```

## Frontend Implementation

### Constants and Mapping

All enum mappings are defined in `src/utils/constants.ts`:

```typescript
// Pet Type Enum Mapping
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

// Pet Size Enum Mapping
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

// Pet Age Enum Mapping
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
```

### Compatibility Conversion

The `convertCompatibilityToBoolean` function converts string values to boolean pairs:

```typescript
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
```

## API Integration

### RTK Query API

A new pets API slice has been created in `src/redux/apis/pets.api.ts` using RTK Query:

```typescript
export interface CreatePetRequest {
  name: string;
  type: number; // 1=Dog, 2=Cat, 3=Bird, 4=Fish, 5=Other
  size: number; // 1=Small, 2=Medium, 3=Large, 4=ExtraLarge
  age: number; // 1=PuppyKitten, 2=Young, 3=Adult, 4=Senior
  getAlongWithDogs: boolean;
  getAlongWithCats: boolean;
  isUnsureWithDogs: boolean;
  isUnsureWithCats: boolean;
  specialInstructions?: string;
  medicalConditions?: string;
  userId: string;
}
```

### Usage in Components

#### PetDetailsScreen
```typescript
import { useCreatePetMutation } from '../../redux/apis/pets.api';
import { 
  PET_TYPES, 
  PET_SIZES, 
  PET_AGES,
  convertCompatibilityToBoolean 
} from '../../utils/constants';

const [createPet, { isLoading: loading }] = useCreatePetMutation();

const handleSubmit = async () => {
  const dogsCompatibility = convertCompatibilityToBoolean(formData.friendlyWithDogs);
  const catsCompatibility = convertCompatibilityToBoolean(formData.friendlyWithCats);
  
  const payload = {
    name: "Max",
    type: PET_TYPES.DOG,           // 1
    size: PET_SIZES.MEDIUM,        // 2
    age: PET_AGES.ADULT,           // 3
    getAlongWithDogs: dogsCompatibility.getAlong,      // true
    getAlongWithCats: catsCompatibility.getAlong,      // false
    isUnsureWithDogs: dogsCompatibility.isUnsure,      // false
    isUnsureWithCats: catsCompatibility.isUnsure,      // false
    specialInstructions: "",
    medicalConditions: "",
    userId: "user123"
  };

  await createPet(payload).unwrap();
};
```

#### PetDetailsFormScreen
```typescript
// Helper functions for weight and age conversion
const getPetSizeFromWeight = (weight: string): number => {
  const weightNum = parseInt(weight) || 0;
  if (weightNum <= 25) return PET_SIZES.SMALL;
  if (weightNum <= 60) return PET_SIZES.MEDIUM;
  if (weightNum <= 100) return PET_SIZES.LARGE;
  return PET_SIZES.EXTRA_LARGE;
};

const getPetAgeFromYearsMonths = (years: string, months: string): number => {
  const totalMonths = (parseInt(years) || 0) * 12 + (parseInt(months) || 0);
  if (totalMonths <= 12) return PET_AGES.PUPPY_KITTEN;
  if (totalMonths <= 36) return PET_AGES.YOUNG;
  if (totalMonths <= 84) return PET_AGES.ADULT;
  return PET_AGES.SENIOR;
};
```

## Example Payloads

### Dog Example
```json
{
  "name": "Max",
  "type": 1,
  "size": 2,
  "age": 3,
  "getAlongWithDogs": true,
  "getAlongWithCats": false,
  "isUnsureWithDogs": false,
  "isUnsureWithCats": false,
  "specialInstructions": "Very friendly dog",
  "medicalConditions": "",
  "userId": "user123"
}
```

### Cat Example
```json
{
  "name": "Whiskers",
  "type": 2,
  "size": 1,
  "age": 1,
  "getAlongWithDogs": false,
  "getAlongWithCats": true,
  "isUnsureWithDogs": true,
  "isUnsureWithCats": false,
  "specialInstructions": "Very shy kitten",
  "medicalConditions": "",
  "userId": "user123"
}
```

## Migration Checklist

- [x] Created enum mapping constants in `src/utils/constants.ts`
- [x] Updated `PetDetailsScreen` to use enum values
- [x] Updated `PetDetailsFormScreen` to use enum values
- [x] Created RTK Query pets API slice
- [x] Added pets API to Redux store
- [x] Updated `PetTypeSelector` to use enum constants
- [x] Added compatibility conversion functions
- [x] Created example documentation

## Benefits

1. **Type Safety**: Enum values provide compile-time type checking
2. **Consistency**: Frontend and backend use the same enum definitions
3. **Maintainability**: Centralized enum definitions make updates easier
4. **Performance**: Numeric values are more efficient than strings
5. **API Compliance**: Matches the new backend API expectations

## Testing

To test the new system:

1. Navigate to the pet creation flow
2. Select different pet types, sizes, and ages
3. Check the console logs to verify the correct enum values are being sent
4. Verify the API receives the expected numeric values
5. Confirm the backend processes the request successfully 