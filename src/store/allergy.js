import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk để lấy thông tin dị ứng của người dùng
export const fetchUserAllergies = createAsyncThunk(
  'allergy/fetchUserAllergies',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://yumble.io.vn/users/${userId}/allergies`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Accept': '*/*',
          },
        }
      );
      return response.data.data; // Trả về dữ liệu dị ứng
    } catch (error) {
      console.error('Error fetching user allergies:', error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk để cập nhật dị ứng của người dùng
export const updateUserAllergy = createAsyncThunk(
  'allergy/updateUserAllergy',
  async ({ userId, allergyId, severity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://yumble.io.vn/users/${userId}/allergies`,
        { allergyId, severity },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.data; // Trả về dữ liệu đã cập nhật
    } catch (error) {
      console.error('Error updating allergy:', error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk để xóa dị ứng của người dùng
export const deleteUserAllergy = createAsyncThunk(
  'allergy/deleteUserAllergy',
  async ({ userId, allergyId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://yumble.io.vn/users/${userId}/allergies/${allergyId}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Accept': '*/*',
          },
        }
      );
      return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
      console.error('Error deleting allergy:', error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk để lấy danh sách allergies
export const fetchAllergies = createAsyncThunk(
  'allergy/fetchAllergies',
  async () => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    const response = await axios.get('https://yumble.io.vn/allergies', {
      headers: {
        Accept: '*/*',
        Authorization: localStorage.getItem('token'), // Thêm token vào header
      },
    });
    return response.data.data; // Trả về dữ liệu allergies
  }
);

const allergySlice = createSlice({
  name: 'allergy',
  initialState: {
    allergies: [], // Đảm bảo allergies có giá trị mặc định là một mảng
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAllergies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAllergies.fulfilled, (state, action) => {
        state.loading = false;
        state.allergies = action.payload; // Cập nhật allergies
        state.error = null;
      })
      .addCase(fetchUserAllergies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserAllergy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAllergy.fulfilled, (state, action) => {
        state.loading = false;
        // Add new allergy to the list immediately
        if (action.payload) {
          const newAllergy = {
            allergy: action.payload.allergy,
            severity: action.meta.arg.severity
          };
          state.allergies = [...state.allergies, newAllergy];
        }
        state.error = null;
      })
      .addCase(updateUserAllergy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllergies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllergies.fulfilled, (state, action) => {
        state.loading = false;
        state.allergies = action.payload; // Lưu trữ dữ liệu allergies
      })
      .addCase(fetchAllergies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserAllergy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAllergy.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the allergy from the list immediately
        const allergyId = action.meta.arg.allergyId;
        state.allergies = state.allergies.filter(
          (item) => item.allergy.id !== allergyId
        );
        state.error = null;
      });
  },
});

export default allergySlice.reducer; 