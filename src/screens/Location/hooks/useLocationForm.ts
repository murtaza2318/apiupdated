import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Form value types
export type LocationFormValues = {
  location: string;
};

// Validation Schema
const LocationSchema = Yup.object().shape({
  location: Yup.string()
    .required('Location is required')
    .min(2, 'Location must be at least 2 characters'),
});

export const useLocationForm = () => {
  const form = useForm<LocationFormValues>({
    resolver: yupResolver(LocationSchema),
    defaultValues: {
      location: '',
    },
  });

  return form;
};
