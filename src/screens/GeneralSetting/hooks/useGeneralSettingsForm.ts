import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

// Time zones data
const TIME_ZONES = [
  { label: 'Eastern Time (ET)', value: 'America/New_York' },
  { label: 'Central Time (CT)', value: 'America/Chicago' },
  { label: 'Mountain Time (MT)', value: 'America/Denver' },
  { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
  { label: 'Alaska Time (AKT)', value: 'America/Anchorage' },
  { label: 'Hawaii Time (HT)', value: 'Pacific/Honolulu' },
  { label: 'Atlantic Time (AT)', value: 'America/Halifax' },
  { label: 'Arizona Time', value: 'America/Phoenix' },
  { label: 'GMT', value: 'GMT' },
  { label: 'UTC', value: 'UTC' },
];

// Contact preferences data
const CONTACT_PREFERENCES = [
  { label: 'Anytime', value: 'anytime' },
  { label: 'Business Hours Only (9 AM - 5 PM)', value: 'business_hours' },
  { label: 'Evenings Only (5 PM - 9 PM)', value: 'evenings' },
  { label: 'Weekends Only', value: 'weekends' },
  { label: 'Never', value: 'never' },
];

interface GeneralSettingsFormData {
  timeZone: string;
  mobileNumber: string;
  contactPreference: string;
}

export const useGeneralSettingsForm = () => {
  const [isEditingNumber, setIsEditingNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with default values
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm<GeneralSettingsFormData>({
    defaultValues: {
      timeZone: 'America/Chicago',
      mobileNumber: '+1 832-616-0981',
      contactPreference: 'anytime',
    },
    mode: 'onChange',
  });

  // Watch form values for real-time updates
  const watchedValues = watch();

  // Validation rules
  const validationRules = {
    timeZone: {
      required: 'Please select a time zone',
    },
    mobileNumber: {
      required: 'Mobile number is required',
      pattern: {
        value: /^\+?[1-9]\d{1,14}$/,
        message: 'Please enter a valid phone number',
      },
      minLength: {
        value: 10,
        message: 'Phone number must be at least 10 digits',
      },
    },
    contactPreference: {
      required: 'Please select a contact preference',
    },
  };

  // Handle phone number update
  const handleUpdateNumber = () => {
    setIsEditingNumber(true);
  };

  // Handle phone number save
  const handleSaveNumber = (newNumber: string) => {
    // Format the phone number
    const formattedNumber = formatPhoneNumber(newNumber);
    setValue('mobileNumber', formattedNumber, { shouldValidate: true });
    setIsEditingNumber(false);
  };

  // Handle phone number cancel
  const handleCancelNumberEdit = () => {
    setIsEditingNumber(false);
  };

  // Format phone number
  const formatPhoneNumber = (number: string): string => {
    // Remove all non-numeric characters
    const cleaned = number.replace(/\D/g, '');
    
    // Add country code if not present
    if (cleaned.length === 10) {
      return `+1 ${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned.slice(0, 1)} ${cleaned.slice(1, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    
    return `+${cleaned}`;
  };

  // Handle form submission
  const onSubmit = async (data: GeneralSettingsFormData) => {
    try {
      setIsLoading(true);
      
      // API call would go here
      console.log('Saving settings:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success',
        'Your settings have been saved successfully!',
        [{ text: 'OK' }]
      );
      
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert(
        'Error',
        'Failed to save settings. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete or deactivate your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Handle account deletion logic here
            console.log('Account deletion requested');
          },
        },
      ]
    );
  };

  // Get timezone label from value
  const getTimeZoneLabel = (value: string): string => {
    const timezone = TIME_ZONES.find(tz => tz.value === value);
    return timezone ? timezone.label : value;
  };

  // Get contact preference label from value
  const getContactPreferenceLabel = (value: string): string => {
    const preference = CONTACT_PREFERENCES.find(pref => pref.value === value);
    return preference ? preference.label : value;
  };

  return {
    // Form controls
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isDirty,
    isLoading,
    
    // Form values
    watchedValues,
    getValues,
    setValue,
    
    // Phone number editing
    isEditingNumber,
    handleUpdateNumber,
    handleSaveNumber,
    handleCancelNumberEdit,
    
    // Utility functions
    formatPhoneNumber,
    getTimeZoneLabel,
    getContactPreferenceLabel,
    
    // Action handlers
    handleDeleteAccount,
    
    // Validation rules
    validationRules,
    
    // Data
    timeZones: TIME_ZONES,
    contactPreferences: CONTACT_PREFERENCES,
  };
};