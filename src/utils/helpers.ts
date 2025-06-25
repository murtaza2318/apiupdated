import { Alert } from 'react-native';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Interface for API error response
export interface ApiError {
  success: false;
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
  statusCode?: number;
}

// Interface for API success response
export interface ApiSuccess<T = any> {
  success: true;
  message: string;
  data: T;
  statusCode?: number;
}

// Generic API response type
export type ApiResponse<T = any> = ApiSuccess<T> | ApiError;

// Interface for handlePostRequest function parameters
export interface HandlePostRequestParams {
  requestFunction: any; // RTK Query mutation function
  requestBody: any;
  showSuccessAlert?: boolean;
  showErrorAlert?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

/**
 * Generic helper function to handle API POST requests
 * @param params - Object containing request configuration
 * @returns Promise with API response or null
 */
export const handlePostRequest = async ({
  requestFunction,
  requestBody,
  showSuccessAlert = false,
  showErrorAlert = true,
  successMessage,
  errorMessage,
  onSuccess,
  onError,
}: HandlePostRequestParams): Promise<ApiResponse | null> => {
  try {
    const response = await requestFunction(requestBody).unwrap();
    
    // Handle success response
    if (response?.success) {
      if (showSuccessAlert && (successMessage || response.message)) {
        Alert.alert(
          'Success',
          successMessage || response.message,
          [{ text: 'OK' }]
        );
      }
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      return response;
    } else {
      // Handle API error response
      const errorMsg = errorMessage || response.message || 'Something went wrong';
      
      if (showErrorAlert) {
        Alert.alert('Error', errorMsg, [{ text: 'OK' }]);
      }
      
      if (onError) {
        onError(response);
      }
      
      return null;
    }
  } catch (error: any) {
    // Handle network errors, validation errors, etc.
    const errorResponse = handleApiError(error);
    
    if (showErrorAlert) {
      Alert.alert(
        'Error',
        errorMessage || errorResponse.message,
        [{ text: 'OK' }]
      );
    }
    
    if (onError) {
      onError(errorResponse);
    }
    
    console.error('API Request Error:', error);
    return null;
  }
};

/**
 * Generic helper function to handle API GET requests
 * @param queryHook - RTK Query hook function
 * @param params - Query parameters
 * @returns Query result object
 */
export const handleGetRequest = (queryHook: any, params?: any) => {
  return queryHook(params);
};

/**
 * Helper function to handle RTK Query errors
 * @param error - RTK Query error object
 * @returns Formatted error object
 */
export const handleApiError = (error: FetchBaseQueryError | SerializedError | any): ApiError => {
  if ('status' in error) {
    // RTK Query error with status
    const errorData = error.data as any;
    
    return {
      success: false,
      message: errorData?.message || getErrorMessageByStatus(error.status),
      errors: errorData?.errors || [],
      statusCode: typeof error.status === 'number' ? error.status : undefined,
    };
  } else if ('message' in error) {
    // Serialized error (network error, parsing error, etc.)
    return {
      success: false,
      message: error.message || 'Network error occurred',
      statusCode: 0,
    };
  } else {
    // Unknown error
    return {
      success: false,
      message: 'An unexpected error occurred',
      statusCode: 0,
    };
  }
};

/**
 * Get error message based on HTTP status code
 * @param status - HTTP status code
 * @returns Error message string
 */
export const getErrorMessageByStatus = (status: number | string): string => {
  const numStatus = typeof status === 'string' ? parseInt(status, 10) : status;
  
  switch (numStatus) {
    case 400:
      return 'Bad request. Please check your input.';
    case 401:
      return 'Authentication failed. Please login again.';
    case 403:
      return 'Access denied. You don\'t have permission.';
    case 404:
      return 'Resource not found.';
    case 409:
      return 'Conflict. Resource already exists.';
    case 422:
      return 'Validation failed. Please check your input.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Server error. Please try again later.';
    case 502:
      return 'Bad gateway. Please try again later.';
    case 503:
      return 'Service unavailable. Please try again later.';
    case 504:
      return 'Gateway timeout. Please try again later.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

/**
 * Helper function to show confirmation alert
 * @param title - Alert title
 * @param message - Alert message
 * @param onConfirm - Callback for confirm action
 * @param onCancel - Callback for cancel action
 */
export const showConfirmationAlert = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'Confirm',
        onPress: onConfirm,
      },
    ]
  );
};

/**
 * Helper function to show success alert
 * @param title - Alert title (optional)
 * @param message - Alert message
 * @param onPress - Callback for OK button
 */
export const showSuccessAlert = (
  message: string,
  title: string = 'Success',
  onPress?: () => void
) => {
  Alert.alert(title, message, [{ text: 'OK', onPress }]);
};

/**
 * Helper function to show error alert
 * @param title - Alert title (optional)
 * @param message - Alert message
 * @param onPress - Callback for OK button
 */
export const showErrorAlert = (
  message: string,
  title: string = 'Error',
  onPress?: () => void
) => {
  Alert.alert(title, message, [{ text: 'OK', onPress }]);
};

/**
 * Helper function to format validation errors
 * @param errors - Array of validation errors
 * @returns Formatted error string
 */
export const formatValidationErrors = (errors: { field: string; message: string }[]): string => {
  return errors.map(error => `${error.field}: ${error.message}`).join('\n');
};

/**
 * Helper function to debounce API calls
 * @param func - Function to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Helper function to format phone number for API
 * @param dialCode - Country dial code
 * @param number - Phone number
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (dialCode: string, number: string): string => {
  const cleanDialCode = dialCode.replace(/\D/g, '');
  const cleanNumber = number.replace(/\D/g, '');
  return `+${cleanDialCode}${cleanNumber}`;
};

/**
 * Helper function to validate email format
 * @param email - Email string to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * Helper function to validate password strength
 * @param password - Password string to validate
 * @returns Object with validation results
 */
export const validatePassword = (password: string) => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
    isValid: password.length >= 8 && 
             /[A-Z]/.test(password) && 
             /[a-z]/.test(password) && 
             /\d/.test(password) && 
             /[@$!%*?&]/.test(password)
  };
};