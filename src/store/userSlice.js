import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token || !userId) {
        throw new Error('Token or userId not found');
      }

      console.log('Fetching profile with:', { token, userId });

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}/profile`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      console.log('Profile response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return rejectWithValue(error.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
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
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer; 