/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {  
    currentUser: null,    
    isLoading: false,
    error: false,  
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {    
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false,
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = false;    
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
});

export default userSlice.reducer;

// useDispatch 사용법.
export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
