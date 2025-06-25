import { useFormContext } from 'react-hook-form';

export const useBoardingForm = () => {
  const {
    setValue,
    getValues,
    watch,
  } = useFormContext();

  const petType = watch('petType');
  const dates = watch('dates');
  const location = watch('location');

  const setPetType = (type: 'Dog' | 'Cat') => setValue('petType', type);
  const setDates = (range: any) => setValue('dates', range);
  const setLocation = (location: string) => setValue('location', location);

  return {
    petType,
    dates,
    location,
    setPetType,
    setDates,
    setLocation,
  };
};
