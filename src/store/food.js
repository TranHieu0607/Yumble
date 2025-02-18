import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk để lấy danh sách foods
export const fetchFoods = createAsyncThunk(
  'food/fetchFoods',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk để lấy chi tiết food
export const fetchFoodById = createAsyncThunk(
  'food/fetchFoodById',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk để thêm món ăn vào danh sách yêu thích
export const addFoodToFavorites = createAsyncThunk(
  'food/addFoodToFavorites',
  async ({ userId, foodId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${userId}/foods`,
        { foodId },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data; // Đảm bảo trả về thông tin món ăn đã thêm
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    foods: [],
    currentFood: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý fetchFoods
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý fetchFoodById
      .addCase(fetchFoodById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFood = action.payload;
      })
      .addCase(fetchFoodById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default foodSlice.reducer;
