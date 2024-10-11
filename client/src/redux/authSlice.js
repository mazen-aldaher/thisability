// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  userRole: null,
  isOnboardingComplete: false,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for fetching the user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const { data } = await axios.get('http://localhost:5000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    }
    throw new Error('No token found');
  }
);

// Async thunk for logging in the user
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }) => {
  const { data } = await axios.post('http://localhost:5000/api/user/login', {
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  return data;
});

// Async thunk for logging out the user
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    setOnboardingComplete: (state, action) => {
      state.isOnboardingComplete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.userRole = action.payload.role;
        state.isOnboardingComplete = action.payload.isOnboardingComplete || true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.userRole = action.payload.role;
        state.isOnboardingComplete = action.payload.isOnboardingComplete;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.userRole = null;
        state.isOnboardingComplete = false;
      });
  },
});

export const { clearErrors, setOnboardingComplete } = authSlice.actions;

export default authSlice.reducer;
