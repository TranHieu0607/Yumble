import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: null,
    checkoutUrl: null,
  },
  reducers: {
    paymentStart(state) {
      state.loading = true;
      state.error = null;
    },
    paymentSuccess(state, action) {
      state.loading = false;
      state.checkoutUrl = action.payload;
    },
    paymentFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators
export const { paymentStart, paymentSuccess, paymentFail } = paymentSlice.actions;

// Hàm gọi API
export const createPaymentLink = async (userId, isMonthPremium, token) => {
  if (!token) {
    throw new Error('Không tìm thấy token, vui lòng đăng nhập lại');
  }
  
  if (!token.startsWith('Bearer ')) {
    throw new Error('Token không hợp lệ, vui lòng đăng nhập lại');
  }

  console.log('Token used for payment:', token);
  const response = await fetch('https://yumble.io.vn/payos', {
    method: 'POST',
    headers: {
      'accept': '*/*',
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      isMonthPremium: isMonthPremium,
    }),
  });

  return response.json();
};

// Thunk để xử lý thanh toán
export const processPayment = (userId, isMonthPremium) => async (dispatch) => {
  dispatch(paymentStart());
  try {
    // Kiểm tra userId có tồn tại không
    if (!userId) {
      throw new Error('Không tìm thấy thông tin người dùng');
    }
    
    const token = localStorage.getItem('token');
    
    // Kiểm tra xem tài khoản đã đăng ký premium chưa
    const { isPremium, premiumExpiry } = await checkIfUserIsPremium(userId, token);
    const currentDate = new Date();

    // Chỉ cho phép đăng ký lại nếu tài khoản đã hết hạn
    if (isPremium && new Date(premiumExpiry) > currentDate) {
      throw new Error('Tài khoản đã đăng ký gói premium, không thể đăng ký lại');
    }

    const data = await createPaymentLink(userId, isMonthPremium, token);

    if (data.code === 1000) {
      dispatch(paymentSuccess(data.data.checkoutUrl));
      // Chuyển hướng đến link thanh toán
      window.location.href = data.data.checkoutUrl;
    } else {
      dispatch(paymentFail(data.message));
    }
  } catch (error) {
    dispatch(paymentFail(error.message));
  }
};

// Hàm kiểm tra xem người dùng đã đăng ký premium chưa
const checkIfUserIsPremium = async (userId, token) => {
  const response = await fetch(`https://yumble.io.vn/api/check-premium/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });
  const data = await response.json();
  // Giả sử API trả về trường này
  return {
    isPremium: data.isPremium,
    premiumExpiry: data.premiumExpiry, // Ngày hết hạn
  };
};

export default paymentSlice.reducer;
