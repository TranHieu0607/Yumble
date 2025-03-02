import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token || !userId) {
        throw new Error('Token or userId not found');
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}/profile`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      return response.data.data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, updatedData }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${userId}/profile`,
        updatedData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Profile update error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'user/updateAvatar',
  async ({ userId, avatarFile }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', avatarFile);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${userId}/avatar`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Avatar update error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk để lấy thông tin premium của người dùng
export const fetchUserPremium = createAsyncThunk(
  'user/fetchPremium',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}/premium`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            Accept: '*/*',
          },
        }
      );
      return response.data.data; // Trả về dữ liệu premium
    } catch (error) {
      console.error('Error fetching premium:', error); // Ghi log lỗi
      return rejectWithValue(error.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    premium: null, 
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
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = {
          ...state.profile,
          avatar: action.payload.avatar,
        };
        state.error = null;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserPremium.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPremium.fulfilled, (state, action) => {
        state.loading = false;
        state.premium = action.payload; // Lưu toàn bộ thông tin premium bao gồm premiumStatus
      })
      .addCase(fetchUserPremium.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer; 