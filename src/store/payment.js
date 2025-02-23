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
export const createPaymentLink = async (userId, isMonthPremium) => {
  const response = await fetch('https://yumble.io.vn/payos', {
    method: 'POST',
    headers: {
      'accept': '*/*',
      Authorization: localStorage.getItem('token'), 
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
    const data = await createPaymentLink(userId, isMonthPremium);
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

export default paymentSlice.reducer; 