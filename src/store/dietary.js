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

// Thunk để cập nhật chế độ ăn của người dùng
export const updateUserDietary = createAsyncThunk(
  'dietary/updateUserDietary',
  async ({ userId, dietaryId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${userId}/dietaries`,
        { dietaryId },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.data; // Trả về dữ liệu đã cập nhật
    } catch (error) {
      console.error('Error updating dietary:', error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk để xóa chế độ ăn của người dùng
export const deleteUserDietary = createAsyncThunk(
  'dietary/deleteUserDietary',
  async ({ userId, dietaryId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/${userId}/dietaries/${dietaryId}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Accept': '*/*',
          },
        }
      );
      return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
      console.error('Error deleting dietary:', error.response?.data);
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
      })
      .addCase(updateUserDietary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDietary.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update the dietary state if needed
        state.error = null;
      })
      .addCase(updateUserDietary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dietarySlice.reducer;
