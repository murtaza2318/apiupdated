import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Define your form schema (future use when you add input fields)
const selectServiceSchema = yup.object().shape({
  serviceId: yup.string().required('Please select a service'),
});

export interface SelectServiceFormData {
  serviceId: string;
}

export const useSelectServiceForm = () => {
  return useForm<SelectServiceFormData>({
    resolver: yupResolver(selectServiceSchema),
    defaultValues: {
      serviceId: '',
    },
  });
};
