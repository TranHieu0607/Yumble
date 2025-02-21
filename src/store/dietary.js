import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk để lấy thông tin chế độ ăn của người dùng
export const fetchUserDietaries = createAsyncThunk(
  'dietary/fetchUserDietaries',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}/dietaries`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Accept': '*/*',
          },
        }
      );
      return response.data.data; // Trả về dữ liệu chế độ ăn
    } catch (error) {
      console.error('Error fetching user dietaries:', error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

const dietarySlice = createSlice({
  name: 'dietary',
  initialState: {
    dietary: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDietaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDietaries.fulfilled, (state, action) => {
        state.loading = false;
        state.dietary = action.payload;
        state.error = null;
      })
      .addCase(fetchUserDietaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dietarySlice.reducer;
