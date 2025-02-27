import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchUserAllergies } from './allergy';
import { fetchUserDietaries } from './dietary';

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

// Thunk để lấy thông tin chế độ ăn của món
export const fetchFoodDietaryById = createAsyncThunk(
  'food/fetchFoodDietaryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/${id}/dietaries`
      );
      return response.data.data; // Trả về dữ liệu chế độ ăn
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk để lấy thông tin dị ứng của món
export const fetchFoodAllergiesById = createAsyncThunk(
  'food/fetchFoodAllergiesById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/${id}/allergies`
      );
      return response.data.data; // Trả về dữ liệu dị ứng
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk để lấy gợi ý món ăn
export const fetchFoodSuggestions = createAsyncThunk(
  'food/fetchFoodSuggestions',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      // Gọi API lấy allergy và dietary song song để tối ưu thời gian
      const [allergies, dietary] = await Promise.all([
        dispatch(fetchUserAllergies(userId)).unwrap(),
        dispatch(fetchUserDietaries(userId)).unwrap()
      ]);

      // Chuyển đổi danh sách thành chuỗi ID (nếu có)
      const allergyIds = allergies.length ? allergies.map(a => a.id).join(',') : null;
      const dietaryIds = dietary.length ? dietary.map(d => d.id).join(',') : null;

      // Chuẩn bị params
      const params = {};
      if (allergyIds) params.allergies = allergyIds;
      if (dietaryIds) params.dietary = dietaryIds;

      // Gọi API lấy danh sách món ăn phù hợp
      const response = await axios.get(`https://yumble.io.vn/foods/suggestion`, {
        headers: {
          Authorization: localStorage.getItem('token'),
          Accept: '*/*',
        },
        params, // Chỉ gửi params khi có dữ liệu
      });

      return response.data.data; // Trả về dữ liệu món ăn
    } catch (error) {
      console.error('Error fetching food suggestions:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Failed to fetch food suggestions');
    }
  }
);

// Thunk để lấy 6 món ăn đầu tiên
export const fetchFirstSixFoods = createAsyncThunk(
  'food/fetchFirstSixFoods',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods`
      );
      // Lấy 6 món ăn đầu tiên
      return response.data.data.slice(0, 6); // Chỉ lấy 6 món đầu tiên
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
    dietary: [], // Add dietary state
    allergies: [], // Thêm trạng thái allergies
    suggestions: [], // Thêm trạng thái suggestions
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
      })
      // Xử lý fetchFoodDietaryById
      .addCase(fetchFoodDietaryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodDietaryById.fulfilled, (state, action) => {
        state.loading = false;
        state.dietary = action.payload; // Store dietary data
      })
      .addCase(fetchFoodDietaryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý fetchFoodAllergiesById
      .addCase(fetchFoodAllergiesById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodAllergiesById.fulfilled, (state, action) => {
        state.loading = false;
        state.allergies = action.payload; // Lưu trữ dữ liệu dị ứng
      })
      .addCase(fetchFoodAllergiesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý fetchFoodSuggestions
      .addCase(fetchFoodSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload; // Lưu trữ dữ liệu gợi ý món ăn
      })
      .addCase(fetchFoodSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default foodSlice.reducer;
