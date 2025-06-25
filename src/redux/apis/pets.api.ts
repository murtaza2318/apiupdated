import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from './baseQuery';

// Pet API interfaces
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

export interface UpdatePetRequest extends CreatePetRequest {
  id: number;
}

export interface Pet {
  id: number;
  name: string;
  type: number;
  size: number;
  age: number;
  getAlongWithDogs: boolean;
  getAlongWithCats: boolean;
  isUnsureWithDogs: boolean;
  isUnsureWithCats: boolean;
  specialInstructions?: string;
  medicalConditions?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface PetResponse {
  success: boolean;
  message: string;
  data: Pet;
}

export interface PetsResponse {
  success: boolean;
  data: Pet[];
}

export interface PetType {
  id: number;
  name: string;
}

export interface PetTypesResponse {
  success: boolean;
  data: PetType[];
}

export const petsApi = createApi({
  reducerPath: 'petsApi',
  baseQuery: customFetchBase,
  refetchOnReconnect: true,
  tagTypes: ['Pet', 'Pets'],
  endpoints: (builder) => ({
    // Create pet
    createPet: builder.mutation<PetResponse, CreatePetRequest>({
      query: (petData) => ({
        url: '/pets',
        method: 'POST',
        body: petData,
      }),
      invalidatesTags: ['Pets'],
    }),

    // Get all pets
    getAllPets: builder.query<PetsResponse, { userId?: string }>({
      query: (params) => ({
        url: '/pets',
        method: 'GET',
        params,
      }),
      providesTags: ['Pets'],
    }),

    // Get pet by ID
    getPetById: builder.query<PetResponse, number>({
      query: (id) => ({
        url: `/pets/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Pet', id }],
    }),

    // Get user pets
    getUserPets: builder.query<PetsResponse, string>({
      query: (userId) => ({
        url: `/pets/user/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Pets'],
    }),

    // Update pet
    updatePet: builder.mutation<PetResponse, UpdatePetRequest>({
      query: ({ id, ...petData }) => ({
        url: `/pets/${id}`,
        method: 'PUT',
        body: petData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Pet', id },
        'Pets',
      ],
    }),

    // Delete pet
    deletePet: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/pets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pets'],
    }),

    // Get pet types
    getPetTypes: builder.query<PetTypesResponse, void>({
      query: () => ({
        url: '/pets/types',
        method: 'GET',
      }),
    }),

    // Get pet sizes
    getPetSizes: builder.query<PetTypesResponse, void>({
      query: () => ({
        url: '/pets/sizes',
        method: 'GET',
      }),
    }),

    // Get pet ages
    getPetAges: builder.query<PetTypesResponse, void>({
      query: () => ({
        url: '/pets/ages',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreatePetMutation,
  useGetAllPetsQuery,
  useGetPetByIdQuery,
  useGetUserPetsQuery,
  useUpdatePetMutation,
  useDeletePetMutation,
  useGetPetTypesQuery,
  useGetPetSizesQuery,
  useGetPetAgesQuery,
} = petsApi; 