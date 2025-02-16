import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import userReducer from './userSlice';
import foodReducer from './food';
import registerReducer from './register';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    food: foodReducer,
    register: registerReducer,
  },
});

export default store;
