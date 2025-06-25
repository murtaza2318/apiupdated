import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import BASE_URL from '../../utils/constants/baseUrl';

export interface SignupRequest {
  firstName: string;
  lastName: string;
  zipCode: string;
  email: string;
  password: string;
  confirmPassword: string;
  howDidYouHear: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      zipCode: string;
      howDidYouHear: string;
      createdAt: string;
      updatedAt: string;
    };
    token?: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      zipCode: string;
    };
    token: string;
    refreshToken: string;
  };
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  type: 'EMAIL_VERIFICATION' | 'PASSWORD_RESET';
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
    };
    token?: string;
  };
}

export interface ResendOtpRequest {
  email: string;
  type: 'EMAIL_VERIFICATION' | 'PASSWORD_RESET';
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SocialLoginRequest {
  provider: 'google' | 'facebook';
  accessToken: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: `${BASE_URL}/auth`,
    prepareHeaders: (headers, { getState }) => {
      // Get token from state if needed
      const token = (getState() as any)?.auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Auth', 'User'],
  endpoints: (builder) => ({
    // Signup mutation
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Login mutation
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Verify OTP mutation
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (data) => ({
        url: '/verify-otp',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    // Resend OTP mutation
    resendOtp: builder.mutation<{ success: boolean; message: string }, ResendOtpRequest>({
      query: (data) => ({
        url: '/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),

    // Forgot password mutation
    forgotPassword: builder.mutation<{ success: boolean; message: string }, ForgotPasswordRequest>({
      query: (data) => ({
        url: '/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Reset password mutation
    resetPassword: builder.mutation<{ success: boolean; message: string }, ResetPasswordRequest>({
      query: (data) => ({
        url: '/reset-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Social login mutation
    socialLogin: builder.mutation<LoginResponse, SocialLoginRequest>({
      query: (data) => ({
        url: '/social-login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Logout mutation
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    // Refresh token mutation
    refreshToken: builder.mutation<{ token: string; refreshToken: string }, { refreshToken: string }>({
      query: (data) => ({
        url: '/refresh-token',
        method: 'POST',
        body: data,
      }),
    }),

    // Get current user query
    getCurrentUser: builder.query<{
      success: boolean;
      data: {
        user: {
          id: string;
          firstName: string;
          lastName: string;
          email: string;
          isEmailVerified: boolean;
          zipCode: string;
          profileImage?: string;
          createdAt: string;
        };
      };
    }, void>({
      query: () => '/me',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSocialLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
} = authApi;