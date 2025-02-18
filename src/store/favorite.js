import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk để lấy danh sách món ăn yêu thích
export const fetchFavoriteFoods = createAsyncThunk(
  'favorite/fetchFavoriteFoods',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}/foods`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data.data.map(item => item.food); // Trả về danh sách món ăn
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk để thêm món ăn vào danh sách yêu thích
export const addFoodToFavorites = createAsyncThunk(
  'favorite/addFoodToFavorites',
  async ({ userId, foodId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${userId}/foods`,
        { foodId: foodId }, // Đảm bảo rằng foodId được gửi đúng định dạng
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json', // Đảm bảo rằng Content-Type được chỉ định
          },
        }
      );
      return response.data; // Đảm bảo trả về thông tin món ăn đã thêm
    } catch (error) {
      console.error('Error adding food to favorites:', error.response?.data); // Log lỗi để kiểm tra
      return rejectWithValue(error.response?.data);
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favoriteFoods: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteFoods = action.payload;
      })
      .addCase(fetchFavoriteFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addFoodToFavorites.fulfilled, (state, action) => {
        state.favoriteFoods.push(action.payload.data.food); // Thêm món ăn vào danh sách yêu thích
      });
  },
});

export default favoriteSlice.reducer;
