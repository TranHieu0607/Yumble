import { createSlice } from '@reduxjs/toolkit';

// Tạo slice cho AI
const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    loading: false,
    error: null,
    response: null,
  },
  reducers: {
    aiRequestStart(state) {
      state.loading = true;
      state.error = null;
    },
    aiRequestSuccess(state, action) {
      state.loading = false;
      state.response = action.payload;
    },
    aiRequestFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators
export const { aiRequestStart, aiRequestSuccess, aiRequestFail } = aiSlice.actions;

// Hàm gọi API
export const fetchAIResponse = (inputMessage) => async (dispatch) => {
  dispatch(aiRequestStart());
  try {
    const response = await fetch('https://yumble.io.vn/ai/chatgpt', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Authorization': localStorage.getItem('token'), // Lấy token từ localStorage
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputMessage), // Gửi tin nhắn của người dùng
    });

    const data = await response.json();

    if (data.code === 1000) {
      dispatch(aiRequestSuccess(data.data)); // Gửi phản hồi về
    } else {
      dispatch(aiRequestFail(data.message));
    }
  } catch (error) {
    dispatch(aiRequestFail(error.message));
  }
};

export default aiSlice.reducer;
