import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action để đăng ký tài khoản
export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Đăng ký thất bại');
    }
  }
);

// Action để gửi email xác thực
export const sendVerificationEmail = createAsyncThunk(
  'register/sendVerificationEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/send-verification-email/${email}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Gửi email xác thực thất bại');
    }
  }
);

// Thêm action để gửi email quên mật khẩu
export const sendForgotPasswordEmail = createAsyncThunk(
  'register/sendForgotPasswordEmail',
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

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: null,
    success: false,
    verificationEmailSent: false,
    forgotPasswordEmailSent: false,
    message: '',
  },
  reducers: {
    clearRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.verificationEmailSent = false;
      state.forgotPasswordEmailSent = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý đăng ký
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý gửi email xác thực
      .addCase(sendVerificationEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationEmailSent = true;
        state.message = action.payload.message;
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý gửi email quên mật khẩu
      .addCase(sendForgotPasswordEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendForgotPasswordEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotPasswordEmailSent = true;
        state.message = action.payload.message;
      })
      .addCase(sendForgotPasswordEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
