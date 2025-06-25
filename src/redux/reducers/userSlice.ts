import {createSlice} from '@reduxjs/toolkit';

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  token: string;
  profileComplete: boolean;
  country?: string | null;
  provider: 'apple' | 'google' | 'facebook' | 'email' | null;
}

const initialState: IUser = {
  id: '',
  fullName: '',
  email: '',
  token:'',
  avatarUrl: '',
  profileComplete: false,
  country: '',
  provider: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, {payload}) => {
      state.email = payload.email;
    },
    setToken: (state, {payload}) => {
      state.token = payload.token;
    },
    setUserDetails: (state, {payload}) => {
      Object.assign(state, payload);
    },
    },
  },
);

export const {
  setEmail,
  setToken,
  setUserDetails,
} = userSlice.actions;

export default userSlice.reducer;
