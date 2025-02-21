import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk để lấy danh sách foods
export const fetchFoods = createAsyncThunk(
  'food/fetchFoods',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods`
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
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/${id}`
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

// Thunk để lấy các bước nấu ăn của món
export const fetchFoodStepsById = createAsyncThunk(
  'food/fetchFoodStepsById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/${id}/steps`
      );
      return response.data.data; // Trả về dữ liệu các bước
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk để lấy thông tin dinh dưỡng của món
export const fetchFoodNutritionById = createAsyncThunk(
  'food/fetchFoodNutritionById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/${id}/nutrition`
      );
      return response.data.data; // Trả về dữ liệu dinh dưỡng
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk để lấy thông tin nguyên liệu của món
export const fetchFoodIngredientsById = createAsyncThunk(
  'food/fetchFoodIngredientsById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/${id}/ingredients`
      );
      return response.data.data; // Trả về dữ liệu nguyên liệu
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
