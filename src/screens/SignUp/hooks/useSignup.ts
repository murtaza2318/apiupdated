// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { FieldValues, useForm } from 'react-hook-form';
// import { useSignupMutation } from '../../../redux/apis/auth.api';
// import { handlePostRequest } from '../../../utils/helpers';
// import { useState } from 'react';
// import { AuthStackNavigationType } from '../../../utils/types/NavigationTypes';

// export interface SignupFormData {
//   firstName: string;
//   lastName: string;
//   zipCode: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   howDidYouHear: string;
// }

// export const useSignup = () => {
//   const { navigate } = useNavigation<NavigationProp<AuthStackNavigationType>>();
//   const { control, watch, handleSubmit, reset, formState: { errors, isValid } } = useForm<SignupFormData>({
//     mode: 'onChange',
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       zipCode: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       howDidYouHear: '',
//     },
//   });

//   const [isChecked, setIsChecked] = useState(true);
//   const [signup, { isLoading }] = useSignupMutation();

//   const validationRules = {
//     firstName: {
//       required: 'First name is required',
//       minLength: { value: 2, message: 'At least 2 characters' },
//       maxLength: { value: 50, message: 'Max 50 characters' },
//       pattern: { value: /^[a-zA-Z\s]+$/, message: 'Only letters allowed' },
//     },
//     lastName: {
//       required: 'Last name is required',
//       minLength: { value: 2, message: 'At least 2 characters' },
//       maxLength: { value: 50, message: 'Max 50 characters' },
//       pattern: { value: /^[a-zA-Z\s]+$/, message: 'Only letters allowed' },
//     },
//     zipCode: {
//       required: 'Zip code is required',
//       pattern: {
//         value: /^\d{5}(-\d{4})?$/,
//         message: 'Invalid zip (e.g., 12345 or 12345-6789)',
//       },
//     },
//     email: {
//       required: 'Email is required',
//       pattern: {
//         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//         message: 'Invalid email format',
//       },
//     },
//     password: {
//       required: 'Password is required',
//       minLength: { value: 8, message: 'Minimum 8 characters' },
//       pattern: {
//         value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
//         message: 'Must include upper, lower, number & special char',
//       },
//     },
//     confirmPassword: {
//       required: 'Please confirm your password',
//       validate: (value: string) =>
//         value === watch('password') || 'Passwords do not match',
//     },
//     howDidYouHear: {
//       required: 'This field is required',
//       minLength: { value: 3, message: 'Please provide more detail' },
//     },
//   };

//   const handleSignup = async (data: FieldValues) => {
//     try {
//       const signupResponse = await handlePostRequest({
//         requestFunction: signup,
//         requestBody: {
//           firstName: data.firstName.trim(),
//           lastName: data.lastName.trim(),
//           zipCode: data.zipCode.trim(),
//           email: data.email.toLowerCase().trim(),
//           password: data.password,
//           confirmPassword: data.confirmPassword,
//           howDidYouHear: data.howDidYouHear.trim(),
//         },
//       });

//       if (!signupResponse?.success) return;

//       reset();

//       // Navigate after success
//       navigate('Boarding'); // or 'VerifyOtp', as needed

//     } catch (error) {
//       console.log('Signup error:', error);
//     }
//   };

//   const handleFacebookSignup = () => {
//     console.log('Facebook signup pressed');
//   };

//   const handleGoogleSignup = () => {
//     console.log('Google signup pressed');
//   };

//   return {
//     control,
//     watch,
//     handleSubmit,
//     handleSignup,
//     isLoading,
//     isChecked,
//     setIsChecked,
//     errors,
//     isValid,
//     validationRules,
//     handleFacebookSignup,
//     handleGoogleSignup,
//   };
// };
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FieldValues, useForm } from 'react-hook-form';
// import { useSignupMutation } from '../../../redux/apis/auth.api';
// import { handlePostRequest } from '../../../utils/helpers';
import { useState } from 'react';
import { AuthStackNavigationType } from '../../../utils/types/NavigationTypes';

export interface SignupFormData {
  firstName: string;
  lastName: string;
  zipCode: string;
  email: string;
  password: string;
  confirmPassword: string;
  howDidYouHear: string;
}

export const useSignup = () => {
  const { navigate } = useNavigation<NavigationProp<AuthStackNavigationType>>();
  const { control, watch, handleSubmit, reset, formState: { errors, isValid } } = useForm<SignupFormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      zipCode: '',
      email: '',
      password: '',
      confirmPassword: '',
      howDidYouHear: '',
    },
  });

  const [isChecked, setIsChecked] = useState(true);
  // const [signup, { isLoading }] = useSignupMutation();
  const isLoading = false; // Placeholder

  const validationRules = {
    firstName: {
      required: 'First name is required',
      minLength: { value: 2, message: 'At least 2 characters' },
      maxLength: { value: 50, message: 'Max 50 characters' },
      pattern: { value: /^[a-zA-Z\s]+$/, message: 'Only letters allowed' },
    },
    lastName: {
      required: 'Last name is required',
      minLength: { value: 2, message: 'At least 2 characters' },
      maxLength: { value: 50, message: 'Max 50 characters' },
      pattern: { value: /^[a-zA-Z\s]+$/, message: 'Only letters allowed' },
    },
    zipCode: {
      required: 'Zip code is required',
      pattern: {
        value: /^\d{5}(-\d{4})?$/,
        message: 'Invalid zip (e.g., 12345 or 12345-6789)',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email format',
      },
    },
    password: {
      required: 'Password is required',
      minLength: { value: 8, message: 'Minimum 8 characters' },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        message: 'Must include upper, lower, number & special char',
      },
    },
    confirmPassword: {
      required: 'Please confirm your password',
      validate: (value: string) =>
        value === watch('password') || 'Passwords do not match',
    },
    howDidYouHear: {
      required: 'This field is required',
      minLength: { value: 3, message: 'Please provide more detail' },
    },
  };

  const handleSignup = async (data: FieldValues) => {
    try {
      // Simulate successful signup without backend
      reset();
      // Navigate after success
      navigate('Boarding'); // or 'VerifyOtp', as needed
    } catch (error) {
      console.log('Signup error:', error);
    }
  };

  const handleFacebookSignup = () => {
    console.log('Facebook signup pressed');
  };

  const handleGoogleSignup = () => {
    console.log('Google signup pressed');
  };

  return {
    control,
    watch,
    handleSubmit,
    handleSignup,
    isLoading,
    isChecked,
    setIsChecked,
    errors,
    isValid,
    validationRules,
    handleFacebookSignup,
    handleGoogleSignup,
  };
};