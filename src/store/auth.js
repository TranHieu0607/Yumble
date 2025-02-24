import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );
      
      console.log('Login response:', response.data);
      
      
      const { code, data } = response.data;
      
      if (code !== 1000 || !data.token) {
        throw new Error('Invalid response format');
      }

      // Xóa token cũ nếu có
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      
      // Validate token trước khi lưu
      if (!data.token || typeof data.token !== 'string') {
        throw new Error('Token không hợp lệ');
      }
      
      // Lưu token mới vào localStorage
      localStorage.setItem('token', `Bearer ${data.token}`);
      
      // Lấy userId từ token (parse JWT)
      const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
      const userId = tokenPayload.sub; // sub chứa userId trong JWT
      
      if (!userId) {
        throw new Error('Không thể xác định userId từ token');
      }
      
      localStorage.setItem('userId', userId);

      
      return {
        token: `Bearer ${data.token}`,
        userId: userId
      };
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Define the sendForgotPasswordEmail action
export const sendForgotPasswordEmail = createAsyncThunk(
  'auth/sendForgotPasswordEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/send-forgot-password-email/${email}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Gửi email quên mật khẩu thất bại');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userId = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
